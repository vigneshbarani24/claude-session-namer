# session-namer

[![ci](https://github.com/vigneshbarani24/claude-session-namer/actions/workflows/ci.yml/badge.svg)](https://github.com/vigneshbarani24/claude-session-namer/actions/workflows/ci.yml)

Claude Code session titles that start with the project folder.

```
Fix login flow          →  Bee Buzz · Fix login flow
Triage flaky eval       →  guardian · Triage flaky eval
```

When you run five sessions across three repos, `/resume` and the session list stop being a wall of near-identical titles.

## Install

At the prompt of a Claude Code terminal session:

```
/plugin install session-namer --marketplace vigneshbarani24/claude-session-namer
```

Answer `y` to add the marketplace, then pick a scope (user scope covers every project). It's active immediately.

Uninstall with `/plugin uninstall session-namer`.

## How it works

The mod hooks `SessionStart` and `UserPromptSubmit` and returns `sessionTitle` with the project folder put in front of the title the session already has, whether Claude Code generated it or you set it with `/rename`.

- **No title yet:** it does nothing, so Claude Code's own naming still runs.
- **Already prefixed:** it does nothing, so the prefix is applied once.
- **Worktrees:** a session in `<repo>/.claude/worktrees/<name>` is named after `<repo>`.
- **Failure:** a hook error passes the event through, so naming never blocks a prompt.

## Options

Set them in `/config` or under `pluginConfigs.session-namer.options` in settings.

| Option | Default | Effect |
| --- | --- | --- |
| `depth` | `1` | Trailing folders to show. `2` gives `Amazon Build 2026/Bee Buzz`. |
| `separator` | ` · ` | Text between the folder and the name. |

## Requirements

A Claude Code build with function hooks (mods). Built and tested on Claude Code 2.1.295.

## Limitations

- In a fresh session the prefix appears from the second prompt: the first prompt is what Claude Code names the session from.
- The mod API is early access in Claude Code and may change between releases.

## Develop

```
claude plugin validate .
claude plugin test .
claude --plugin-dir .
```

Once Claude Code has loaded the mod it lays its types in `.claude-plugin/types/`, and `npx tsc -p .` type-checks it.

## License

MIT
