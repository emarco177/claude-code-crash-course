#!/bin/bash

echo "🚀 Starting automated Git workflow agent..."

# 1. Create a new descriptive feature branch safely
git checkout -b feature/fix-calculator-edge-case

# 2. Call Claude Code to inspect our branch changes and generate a PR description
echo "🤖 Calling Claude to draft our PR description..."
claude -p "Look at the git diff between this branch and main. Generate a clear, markdown-formatted Pull Request summary explaining what bug was fixed and why." > PR_DESCRIPTION.md

echo "✅ Workflow complete! PR template generated in PR_DESCRIPTION.md"
