# Loop compatibility

## Bundles

Loop reads YAML frontmatter from SKILL.md and resolves supporting files relative to its directory. Use a lowercase, hyphen-separated name up to 64 characters and a nonempty description up to 1,024 characters. The main file must contain a workflow and fit within 128 KiB. An optional boolean disable-model-invocation flag disables automatic selection.

Local and GitHub import copy the complete skill directory. Keep bundles within 500 regular files, 20 MiB, and 12 levels of directory nesting. GitHub enforces the download-size limit across the whole preview. Use a direct skill folder URL for selective imports. Installation preserves executable permission bits. Users configure required services or install script dependencies separately. [Loop Skills](https://github.com/JimmyDi/loop/blob/main/packages/coding-agent/src/docs/skills.md)

## Tools, interaction and recovery

Loop's agent runs the model and sequential tool loop. The coding-agent layer manages permission enforcement, sessions, and external tools. Web, CLI, and SDK hosts provide interaction. Loading skill instructions grants no additional permissions.

For a clarification in Web or interactive CLI, request_user_input takes question titles and optional lists of string choices. Users can respond with custom text or skip. To review rich content, show the draft before requesting a decision. SDK hosts register a handler. CLI print mode has no interactive handler. [Loop user input](https://github.com/JimmyDi/loop/blob/main/packages/coding-agent/src/docs/user-input.md)

Document which built-in tools or configured MCP services are required. Web and SDK sessions with an MCP manager expose ready server tools through Codemode. CLI does not automatically load saved MCP configuration. For long jobs, account for Loop's 60-second MCP call deadline, for example by submitting a job and querying its status. Document which intermediate results can be reused after interruption. [Loop tools](https://github.com/JimmyDi/loop/blob/main/packages/coding-agent/src/docs/tools.md) · [Loop MCP](https://github.com/JimmyDi/loop/blob/main/packages/coding-agent/src/docs/mcp.md)
