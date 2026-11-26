import assert from "node:assert/strict";
import { mkdtemp, rm, symlink, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import test from "node:test";
import { validateSkill } from "./validate-skills.mjs";

const fixture = async (t, body) => {
  const root = await mkdtemp(join(tmpdir(), "skill-bundle-"));
  t.after(() => rm(root, { recursive: true, force: true }));
  await writeFile(
    join(root, "SKILL.md"),
    `---\nname: sample\ndescription: Check a sample.\n---\n${body}`,
  );
  await writeFile(join(root, "LICENSE"), "Sample license");
  return root;
};

test("loads the metadata and bundled references", async (t) => {
  const root = await fixture(t, "See [Guide](guide.md).");
  await writeFile(join(root, "guide.md"), "Instructions");
  await validateSkill(root, "sample");
  await assert.rejects(validateSkill(root, "other"), /name/);
});

test("rejects links outside the installable folder", async (t) => {
  const root = await fixture(t, "See [Guide](../guide.md).");
  await assert.rejects(validateSkill(root, "sample"), /leaves the bundle/);
});

test("rejects symlinks", async (t) => {
  const root = await fixture(t, "Follow the workflow.");
  await symlink("LICENSE", join(root, "alias"));
  await assert.rejects(validateSkill(root, "sample"), /regular file/);
});
