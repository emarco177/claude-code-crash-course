# CLAUDE.md

## Scope

Work only inside this project folder. Do not read, write, or run commands on files outside it (including `~/.claude.json` and the `~/.claude/` memory directory), and do not save memories; put persistent instructions in this file instead.

## LangGraph

When discussing LangGraph, always use the context7 MCP (`resolve-library-id`, then `query-docs`) rather than answering from memory. Context7's version index can lag PyPI, so for "latest version" questions also check PyPI.
