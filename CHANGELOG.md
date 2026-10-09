# Changelog

## 0.1.0 (2026-10-09)

First release.

- Prefixes the session title with the project folder on `SessionStart` and `UserPromptSubmit`: `Fix login flow` becomes `Bee Buzz · Fix login flow`.
- Works on whatever title the session has: Claude Code's generated one or one set with `/rename`.
- Leaves a session with no title alone, so Claude Code's own naming still runs.
- Applies the prefix once; an already prefixed title is left alone.
- Names a `.claude/worktrees/<name>` session after its repository.
- Options: `depth` (trailing folders shown, default 1) and `separator` (default ` · `).
- A hook error passes the event through; naming never blocks a prompt.
