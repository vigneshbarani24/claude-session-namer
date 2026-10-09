import type { Register } from 'claude-code'

// A worktree session runs in <repo>/.claude/worktrees/<name>; the repo folder is the useful name.
const WORKTREE = /[\\/]\.claude[\\/]worktrees[\\/][^\\/]+[\\/]?$/

export function projectLabel(cwd: string, depth: number): string {
  const segments = cwd.replace(WORKTREE, '').split(/[\\/]+/).filter(s => s !== '' && !/^[A-Za-z]:$/.test(s))
  return segments.slice(-Math.max(1, Math.floor(depth))).join('/')
}

export function prefixedTitle(title: string | undefined, label: string, separator: string): string | undefined {
  const name = title?.trim()
  if (!name || label === '') return undefined
  if (name === label || name.startsWith(label + separator)) return undefined
  return label + separator + name
}

export const register: Register = (on, options) => {
  const depth = typeof options.depth === 'number' ? options.depth : 1
  const separator = typeof options.separator === 'string' && options.separator !== '' ? options.separator : ' · '

  // Only prefix a title that exists: setting one where there is none would pre-empt Claude Code's own naming.
  on('classic.SessionStart', async ($, e, next) => {
    const result = await next(e)
    const sessionTitle = prefixedTitle(result.sessionTitle ?? e.session_title, projectLabel(e.cwd, depth), separator)
    return sessionTitle === undefined ? result : { ...result, sessionTitle }
  }).catch(($, e, next) => next(e)) // a naming failure must never hold up a session or a prompt

  on('classic.UserPromptSubmit', async ($, e, next) => {
    const result = await next(e)
    const sessionTitle = prefixedTitle(result.sessionTitle ?? e.session_title, projectLabel(e.cwd, depth), separator)
    return sessionTitle === undefined ? result : { ...result, sessionTitle }
  }).catch(($, e, next) => next(e))
}
