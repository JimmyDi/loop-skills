# Contributing

## Add a skill

1. Choose a unique lowercase, hyphenated name.
2. Create `skills/<name>/` and copy `templates/SKILL.md.template` to its `SKILL.md`.
3. Replace every template placeholder and describe a complete, usable workflow.
4. Copy the root `LICENSE` into the skill for original MIT-licensed material. Preserve applicable third-party licenses and notices for contributed material.
5. Add references, scripts, assets, and local dependency manifests as needed.
6. Add a catalog entry to the root README with the folder link, purpose, dependencies, and verified Loop surfaces.
7. Run the checks and review outgoing files and commit metadata before publication.

Every file needed after installation must live within the skill directory or be supplied by an explicitly documented external dependency. Use relative links for bundled resources. Keep input data, generated output, credentials, caches, and installed packages outside the published bundle.

## Instruction contract

`SKILL.md` requires YAML `name` and `description`, followed by nonempty Markdown instructions. Match the directory name to `name`. Explain when to use the skill, required inputs, setup, workflow, deliverables, failure recovery, and verification. Keep detailed material in linked references.

Document external services, required tool capabilities, environment variable names, supported runtimes, and expected outputs. Use placeholders for credentials. Record the Loop version and surfaces actually verified, plus a reproducible smoke check. Clearly mark remaining verification work.

Use Loop's available tool contracts and discover MCP tools through the host's supported mechanism. Ask for user decisions using the host's supported interaction contract. Keep authorization with Loop's permission system. Preserve successful intermediate outputs when retrying a failed step.

Scripts must describe invocation, inputs, outputs, dependencies, failure behavior, and cleanup. Colocate focused tests with implementations. Node scripts use Node.js 24 or newer and pnpm-managed dependencies. Other languages may be used when their runtime and setup are documented inside the bundle.

A skill-local dependency manifest and lockfile travel with that skill. Root development dependencies serve repository tooling. Optional `agents/` metadata must have its host-specific purpose documented.

## Validate

```bash
pnpm check
pnpm test
```

The validator checks metadata, directory placement, file types, bundle size, and inline local Markdown links and reference definitions. It allows an empty published catalog during initialization. Skill behavior requires the documented smoke check in addition to structural validation.

Loop currently previews at most 30 candidates per GitHub source. Above that count, use individual skill folder URLs. Keep the recursive repository tree small enough for GitHub's tree API and Loop's bounded response handling.

## Public contribution privacy

Use a public handle for Git author names and a GitHub-provided noreply address for both author and committer email. Configure these values locally for this repository. Before pushing, inspect all outgoing commits as well as file contents, filenames, generated assets, and proposed public text.

Publish synthetic examples and public service documentation URLs. Review for credentials, personal contact details, private infrastructure, machine-specific paths, conversation history, and embedded metadata. Inspect binary assets separately. Local pattern searches supplement manual review and any available secret scanner.

## Changes and licensing

Describe user-visible changes under `Unreleased` in `CHANGELOG.md`. Confirm redistribution rights before including third-party code or assets and retain the required notices inside each affected bundle.
