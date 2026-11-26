# Contributing

1. Choose a unique lowercase, hyphenated name. Copy the [template](template/SKILL.md.template) to `skills/<name>/SKILL.md` and set the YAML name to the folder name. Use the description to explain when to select the skill.
2. Describe the inputs, workflow, and expected result. Keep references and assets inside the skill folder. If the skill calls a script or service, document its setup, dependencies, and retry behavior.
3. For original MIT-licensed material, include a copy of the [license](LICENSE) in the skill. Verify redistribution rights and preserve notices for third-party material.
4. Import the folder in Loop and run the workflow with synthetic inputs. Check that relative resource links resolve and record which Loop interfaces you tested.
5. Add an entry to the [catalog](README.md#catalog) with the folder link, purpose, and prerequisites. Record user-visible changes in the [changelog](CHANGELOG.md).

Before publishing, review outgoing files and commits for personal contact details, credentials, private paths, and generated task data. Use a public handle and a GitHub noreply address for the author and committer.

## Sensitive data check

Pull requests targeting main and pushes to main run a read-only Gitleaks check on the outgoing commits. It scans Git patches, commit messages, author and committer identities, and changed filenames. Earlier commits in the range are included even if the final tree has removed the value. Public CI prints a pass or failure without matching text, paths or report artifacts.

Gitleaks supplies credential and private-key rules. The repository adds email addresses, user home paths and labelled phone numbers. GitHub noreply addresses and the reserved example.com, example.net and example.org email domains are permitted. Review free-form personal information and binary assets separately, including names, addresses, images and document metadata. CI runs after upload; run the same check locally before pushing.

Install [Gitleaks 8.30.1](https://github.com/gitleaks/gitleaks/releases/tag/v8.30.1), then run from the repository root after committing:

~~~bash
git fetch origin main
bash .github/security/scan.sh "$(git rev-parse origin/main)..$(git rev-parse HEAD)"
~~~

If it fails, review locally. Remove private data from every affected outgoing commit and revoke exposed credentials. Review changes to the workflow, rules and scan script as part of PR review. See [Gitleaks configuration](https://github.com/gitleaks/gitleaks#configuration) and [GitHub Actions secure use](https://docs.github.com/en/actions/reference/security/secure-use).
