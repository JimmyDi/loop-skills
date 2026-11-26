# Contributing

1. Choose a unique lowercase, hyphenated name. Copy the [template](template/SKILL.md.template) to `skills/<name>/SKILL.md` and set the YAML name to the folder name. Use the description to explain when to select the skill.
2. Describe the inputs, workflow, and expected result. Keep references and assets inside the skill folder. If the skill calls a script or service, document its setup, dependencies, and retry behavior.
3. For original MIT-licensed material, include a copy of the [license](LICENSE) in the skill. Verify redistribution rights and preserve notices for third-party material.
4. Import the folder in Loop and run the workflow with synthetic inputs. Check that relative resource links resolve and record which Loop interfaces you tested.
5. Add an entry to the [catalog](README.md#catalog) with the folder link, purpose, and prerequisites. Record user-visible changes in the [changelog](CHANGELOG.md).

Before publishing, review outgoing files and commits for personal contact details, credentials, private paths, and generated task data. Use a public handle and a GitHub noreply address for the author and committer.
