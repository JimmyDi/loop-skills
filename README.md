# Loop Skills

Reusable Agent Skills for [Loop](https://github.com/JimmyDi/loop).

Each published skill lives in `skills/<name>/` and carries its instructions and supporting files together. Skills can document workflows, include executable scripts, or use explicitly configured external tools.

## Catalog

The collection is being initialized. Published skills will be listed here with their purpose, dependencies, and verified Loop surfaces. This initial repository contains the authoring structure and validation tools.

## Install a published skill

In Loop Web, open **Settings → Integrations → Skills**, add a GitHub source, and paste the published skill's folder URL. Review the included files and select personal or project scope.

Replace `<name>` with a catalog entry in `https://github.com/JimmyDi/loop-skills/tree/main/skills/<name>`. Individual folder URLs keep installation focused as the collection grows. Loop resolves the source to an immutable commit during installation.

For a local source, select the individual `skills/<name>` directory. After installation, select it in chat or type `$<name>` in CLI or SDK text. Refresh the Skills catalog if needed.

Installation copies the skill files. Follow the skill's documented setup for any runtime, package, credentials, or MCP server it requires.

## Repository layout

```text
skills/                    Published, independently installable skills
  <name>/
    SKILL.md               Required metadata and workflow
    LICENSE                License carried with the installed bundle
    references/            Optional detailed instructions
    scripts/               Optional implementation and focused tests
    assets/                Optional redistributable source assets
    agents/                Optional host-specific metadata
    README.md              Optional setup and verification details
    package.json           Optional skill-local Node dependencies
    pnpm-lock.yaml         Optional skill-local dependency lock
    requirements.txt       Optional skill-local Python dependencies
templates/                 Authoring starters
docs/                      Design and Loop compatibility
scripts/                   Repository validation tooling
.github/workflows/         Continuous validation
```

Optional directories are added when a skill uses them. Root tooling dependencies serve repository validation. Skill runtime dependencies belong inside the skill's installable directory.

## Develop

Use Node.js 24 or newer and pnpm 11.

```bash
pnpm install --frozen-lockfile
pnpm check
pnpm test
```

Follow the [contribution guide](CONTRIBUTING.md) to add a skill. Read the [Loop compatibility guide](docs/loop-compatibility.md) for tool, interaction, and installation contracts. The [repository design](docs/repository-design.md) records the layout decisions and research sources.

## License

Original repository material is available under the [MIT License](LICENSE). Each published skill includes its applicable license and any required third-party notices so a folder-only installation preserves them.
