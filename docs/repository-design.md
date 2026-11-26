# Repository design

[Anthropic](https://github.com/anthropics/skills) separates its authoring template from published skill folders. [OpenAI](https://github.com/openai/skills) groups its collection into curated and system skills. [Vercel](https://github.com/vercel-labs/agent-skills) separates repository tooling from the skills it distributes.

Loop imports each selected folder as a bundle. A flat skills directory gives each entry a stable URL. Group entries by topic in the README as the catalog grows. Place runtime dependencies and licenses inside the individual bundle because a folder installation copies only its descendants. Keep repository validation tools at the root.

Loop's GitHub importer recursively enumerates files named SKILL.md, including outside the published skills directory. The authoring template uses the suffix .template to keep it out of the installation menu. Direct links to individual skill folders also work when the collection grows beyond Loop's 30-candidate preview limit.
