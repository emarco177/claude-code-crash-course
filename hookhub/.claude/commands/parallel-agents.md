---
description: Fan out a single task to N sub-agents running in parallel, each tackling the same task from a different angle.
argument-hint: <count> <task description>
---

# Parallel Sub-Agents

Run **$1** sub-agents in parallel on this task:

> $2

## How to execute

1. **Parse the arguments.** `$1` is the count (an integer 1–10). `$2` is the task description (free text — everything after the count). If `$1` is missing or not a positive integer, stop and ask the user for a valid count. If `$2` is empty, stop and ask the user what task to run.

2. **Plan distinct angles.** Before launching anything, decide on `$1` distinct creative or methodological angles for the task. The angles must not overlap — each agent should produce a genuinely different deliverable, not a paraphrase of another. Briefly state the angles back to the user before launching so they can redirect.

3. **Launch all sub-agents in a single message.** In one assistant message, emit `$1` `Agent` tool calls in parallel (multiple tool_use blocks in the same message). For each one:
   - `subagent_type`: `general-purpose` unless a more specialized agent type clearly fits the task.
   - `description`: 3–5 word summary including the agent's index and angle (e.g. "Agent 2 — minimal variant").
   - `prompt`: a self-contained brief that includes:
     - The full task statement (do not assume the agent has seen this conversation).
     - The agent's specific angle and the explicit instruction NOT to overlap with the other angles (list them).
     - All file paths, constraints, output locations, and naming rules the agent needs.
     - Any relevant context the user has already provided in this conversation.
     - A concrete deliverable: what file(s) to write or what report to return, and how short/long it should be.

4. **Do not duplicate work.** Do not perform the task yourself in addition to delegating it — the whole point is to fan out. While agents are running, you can prepare the consolidation plan (where outputs should land, how to compare them) but don't redo what the agents are doing.

5. **Consolidate.** When all agents return, present a concise comparison: a numbered list naming each deliverable, what makes it distinct, and a one-line recommendation if appropriate. If any agent failed or produced something unusable, say so and offer to relaunch that one.

## Coordination rules

- **File-name collisions.** If agents write files, give each agent a unique target path in its prompt — do not let agents pick names themselves.
- **Count cap.** If the user requests more than 10 agents, push back: parallel orchestration overhead grows fast and angles get strained. Suggest splitting into waves or narrowing the task.
- **Read-only vs. writing.** State explicitly in each agent's prompt whether it should write code/files or just return findings — agents do not see the user's intent.
- **Brief like a colleague.** Agents start with no context. Terse command-style prompts produce shallow generic output. Spend the tokens to brief them properly.

## Example invocations

- `/parallel-agents 4 Investigate why the build is slow — each agent looks at a different layer (deps, bundler config, source size, CI cache).`
- `/parallel-agents 3 Draft three distinct README intro paragraphs for this project, each with a different tone (technical, friendly, marketing).`
- `/parallel-agents 5 Review src/components/Hero/HeroSplit.tsx — each agent focuses on one concern (a11y, perf, types, mobile, copy).`
