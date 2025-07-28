# Claude Code Hooks Tutorial

Learn how to automate your workflow using Claude Code hooks.

## What are Claude Code Hooks?

Claude Code hooks allow you to automatically execute commands at specific points during your coding session. They're configured in a local `.claude/settings.json` file and can trigger custom scripts, validation tools, or notifications when certain events occur.

## Local Project Configuration

This project uses a **local** `.claude/settings.json` file that only affects this repository, not your global Claude Code settings.

## Hook Example: Sound Notifications

This tutorial demonstrates a "Stop" hook that plays a sound whenever Claude Code finishes responding:

```json
{
  "hooks": {
    "Stop": [
      {
        "matcher": "",
        "hooks": [
          {
            "type": "command",
            "command": "uv run /Users/edenmarco/GithubProjects/claude-code-crash-course/play_sound.py"
          }
        ]
      }
    ]
  }
}
```

## Setup

Install the required Python dependency:

```bash
uv sync
```

This installs pygame (defined in `pyproject.toml`) needed for audio playback.

## Available Hook Types

- **PreToolUse**: Runs before Claude uses a tool
- **PostToolUse**: Runs after a tool completes successfully
- **UserPromptSubmit**: Runs when you submit a prompt
- **Stop/SubagentStop**: Runs when Claude finishes responding
- **Notification**: Runs during system notifications
- **PreCompact**: Runs before context compaction

## Hook Structure

```json
{
  "hooks": {
    "HookType": [
      {
        "matcher": "tool_pattern",
        "hooks": [
          {
            "type": "command",
            "command": "your_script.sh"
          }
        ]
      }
    ]
  }
}
```

- **matcher**: Optional regex pattern to match specific tools or conditions
- **command**: The shell command to execute

## Try It Out

1. Run any Claude Code command in this project
2. Listen for the sound notification when Claude finishes
3. Experiment with different hook types and commands

This demonstrates how hooks can enhance your development workflow with custom automation!