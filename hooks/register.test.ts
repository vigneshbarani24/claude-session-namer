import { test, expect } from 'claude-code/testing'

const CWD = 'C:\\KaarTech UK\\Hackathons\\Amazon Build 2026\\Bee Buzz'

test('prefixes an auto-generated title with the project folder', async ($, on) => {
  on('classic.UserPromptSubmit', () => ({}))
  const result = await $.classic.UserPromptSubmit({ cwd: CWD, prompt: 'hi', session_title: 'Fix login flow' })
  expect(result.sessionTitle).toBe('Bee Buzz · Fix login flow')
})

test('leaves an already prefixed title alone', async ($, on) => {
  on('classic.UserPromptSubmit', () => ({}))
  const result = await $.classic.UserPromptSubmit({ cwd: CWD, prompt: 'hi', session_title: 'Bee Buzz · Fix login flow' })
  expect(result.sessionTitle).toBeUndefined()
})

test('sets no title when the session has none yet', async ($, on) => {
  on('classic.UserPromptSubmit', () => ({}))
  const result = await $.classic.UserPromptSubmit({ cwd: CWD, prompt: 'hi' })
  expect(result.sessionTitle).toBeUndefined()
})

test('names a worktree session after its repository', async ($, on) => {
  on('classic.SessionStart', () => ({}))
  const result = await $.classic.SessionStart({
    cwd: `${CWD}\\.claude\\worktrees\\login-fix`,
    source: 'resume',
    session_title: 'Fix login flow',
  })
  expect(result.sessionTitle).toBe('Bee Buzz · Fix login flow')
})

test('honours depth and separator options', { options: { depth: 2, separator: ' / ' } }, async ($, on) => {
  on('classic.SessionStart', () => ({}))
  const result = await $.classic.SessionStart({ cwd: '/home/vb/work/buzz', source: 'resume', session_title: 'triage' })
  expect(result.sessionTitle).toBe('work/buzz / triage')
})

test('prefixes a title a lower hook set', async ($, on) => {
  on('classic.UserPromptSubmit', () => ({ sessionTitle: 'Renamed' }))
  const result = await $.classic.UserPromptSubmit({ cwd: '/srv/api', prompt: 'hi' })
  expect(result.sessionTitle).toBe('api · Renamed')
})
