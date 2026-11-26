# Loop Skills Agent Instructions

- Work within this repository and preserve existing user changes.
- Keep published skills under `skills/<name>/` with one primary workflow per skill.
- Keep each skill independently installable, including its resources, dependencies, and license.
- Store authoring templates with a `.template` suffix so recursive GitHub discovery does not list them as installable skills.
- Read `docs/loop-compatibility.md` before using Loop-specific tools or interaction patterns.
- Use Node.js 24 or newer and pnpm for repository tooling. Follow `biome.json`.
- Run `pnpm check` and `pnpm test` when changing validation tooling. Validate skill changes structurally and run their documented focused smoke checks.
- Keep real credentials, personal email addresses, private endpoints, machine-specific paths, task data, generated media, caches, and logs out of public content.
- Use a public handle and GitHub noreply email for both Git author and committer. Inspect outgoing content and commit metadata before publication.
- Create commits, push, or modify external services only within the user's authorization.
- Update the catalog and changelog for newly published skills or user-visible changes.
