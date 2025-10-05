# Claude Code Crash Course 🚀
![Claude Code Banner](/static/banner.png)

[![Twitter Follow](https://img.shields.io/twitter/follow/EdenMarco177?style=social)](https://twitter.com/EdenMarco177)
[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](LICENSE)
[![Udemy Course](https://img.shields.io/badge/Claude%20Code%20Udemy%20Course-Coupon%20%2412.99-brightgreen)](https://www.udemy.com/course/claudecode/?referralCode=OCT-2025)

Welcome to the Claude Code Crash Course! This repository is designed to teach you the fundamentals and advanced concepts of Claude Code, Anthropic's official CLI for AI-powered software development, in a hands-on way.

## What is Claude Code? 💡

Claude Code is an interactive command-line interface that brings Claude's AI capabilities directly to your development workflow. It helps with code analysis, bug fixing, feature development, refactoring, and workflow automation - all from your terminal.

## How it Works 🤔

This repository uses a unique branch-based structure for learning:

1.  **Each `project/*` branch covers a specific Claude Code feature or concept.**
2.  **Within each branch, commits are ordered chronologically.** Follow the commits one by one to learn the topic step-by-step.

Simply check out the branch for the topic you want to learn and walk through the commits!

## Available Topics (Branches) 📚

Here are the topics currently available:

| Branch | Topic | Description |
|--------|-------|-------------|
| `project/custom-commands` | 🔧 Custom Commands | Learn to extend Claude Code with custom functionality like dad joke generators and automated commits |
| `project/mcp` | 🔗 MCP Integration | Master Model Context Protocol integration with Context7 MCP server |
| `project/subagents` | 🤖 Subagents | Build specialized AI agents within Claude Code like Code Comedy Carl |
| `project/hooks-notifications` | 🎣 Hooks & Notifications | Automate your workflow with sound notifications and event triggers |
| `project/hookhub` | 🏢 Hook Hub | Advanced hook management and organization systems |

*More topics might be added, so keep an eye out!*

## Prerequisites 🛠️

Before you start, make sure you have the following installed:

*   🤖 Claude Code CLI
*   📦 Git
*   🐍 Python (version 3.8 or higher)
*   📝 Your favorite text editor/IDE

## Getting Started ▶️

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/emarco177/claude-code-crash-course.git
    cd claude-code-crash-course
    ```
2.  **Choose a topic and check out the branch:**
    ```bash
    # Example for the custom commands topic
    git checkout project/custom-commands
    ```
3.  **Follow the commits:** Use `git log --oneline --reverse` to see the chronological list of commits for the branch. Then, use `git checkout <commit_hash>` or your Git client to step through the history and learn.

## Contributing 🤝

Contributions are welcome! If you'd like to add a new topic or improve an existing one:

1.  Fork the repository.
2.  Create a new branch for your feature following the naming convention: `project/your-claude-code-feature-name`.
3.  Make your changes, ensuring each commit represents a logical step in the learning process.
4.  Open a Pull Request against the `main` branch.

## License 📄

This project is licensed under the Apache License 2.0 - see the [LICENSE](LICENSE) file for details.

Happy learning! 🎉
