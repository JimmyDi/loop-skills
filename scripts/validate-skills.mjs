import { lstat, readdir, readFile, stat } from "node:fs/promises";
import { dirname, join, relative, resolve, sep } from "node:path";
import { pathToFileURL } from "node:url";
import { parseDocument } from "yaml";

const fail = (message) => {
  throw new Error(message);
};

const checkMetadata = (source, name) => {
  if (source.includes("\0") || Buffer.byteLength(source) > 128 * 1024)
    fail("Invalid main file size or encoding");
  const parts = /^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)([\s\S]*)$/.exec(source);
  if (!parts?.[2].trim()) fail("Missing frontmatter or workflow");
  const document = parseDocument(parts[1]);
  if (document.errors.length) fail("Invalid YAML");
  const data = document.toJS({ maxAliasCount: 20 });
  if (data?.name !== name || name.length > 64 || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(name))
    fail("Invalid skill name");
  if (
    typeof data.description !== "string" ||
    !data.description.trim() ||
    data.description.length > 1024
  )
    fail("Invalid description");
  if ("disable-model-invocation" in data && typeof data["disable-model-invocation"] !== "boolean")
    fail("Invalid invocation flag");
};

const checkLinks = async (root, file, source) => {
  const prose = source.replace(/^\s*(\x60{3,}|~{3,})[^\n]*\n[\s\S]*?^\s*\1\s*$/gm, "");
  for (const match of prose.matchAll(/(?:\]\(|^\s*\[[^\]]+\]:\s*)(?:<([^>\n]+)>|([^\s)]+))/gm)) {
    const href = match[1] ?? match[2];
    if (/^(https?:|mailto:|#)/i.test(href)) continue;
    const target = resolve(dirname(file), decodeURIComponent(href.split("#")[0]));
    const path = relative(root, target);
    if (path === ".." || path.startsWith(`..${sep}`)) fail(`Link leaves the bundle: ${href}`);
    await stat(target);
  }
};

export const validateSkill = async (root, name) => {
  let count = 0;
  let bytes = 0;
  const markdown = [];
  const walk = async (directory, depth) => {
    if (depth > 12) fail("Directory nesting exceeds 12");
    for (const entry of await readdir(directory, { withFileTypes: true })) {
      const file = join(directory, entry.name);
      if (/[:\\]/.test(entry.name)) fail("Unsafe bundle path");
      if (entry.isDirectory()) {
        await walk(file, depth + 1);
        continue;
      }
      if (!entry.isFile()) fail(`Expected regular file: ${entry.name}`);
      if (entry.name === "SKILL.md" && directory !== root) fail("Nested skill");
      count++;
      bytes += (await stat(file)).size;
      if (count > 500 || bytes > 20 * 1024 * 1024) fail("Bundle exceeds Loop import limits");
      if (entry.name.endsWith(".md")) markdown.push(file);
    }
  };
  if (!(await lstat(root)).isDirectory()) fail("Expected skill directory");
  await walk(root, 0);
  const decode = async (file) =>
    new TextDecoder("utf-8", { fatal: true }).decode(await readFile(file));
  checkMetadata(await decode(join(root, "SKILL.md")), name);
  if (!(await stat(join(root, "LICENSE"))).isFile()) fail("Missing bundle license");
  for (const file of markdown) await checkLinks(root, file, await decode(file));
};

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  const root = resolve("skills");
  const entries = await readdir(root, { withFileTypes: true });
  for (const entry of entries) {
    if (entry.name === "README.md" && entry.isFile()) continue;
    await validateSkill(join(root, entry.name), entry.name);
  }
  console.log("Skill catalog validated.");
}
