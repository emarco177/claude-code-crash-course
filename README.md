# Claude Code Crash Course

A monorepo containing two full-stack Next.js applications showcasing modern web development practices and interactive learning experiences.

## Projects

### 1. LevelUp AI - Interactive Learning Platform

A gamified learning platform focused on machine learning education, featuring interactive coding challenges, real-time battles, and comprehensive learning paths.

**Location:** `levelup-ai/`

#### Features

- **Learning Paths**: Structured ML fundamentals curriculum with modules covering:
  - Introduction to Machine Learning
  - Supervised Learning
  - Unsupervised Learning
  - Model Evaluation
  - Real-world Applications

- **Code Battles**: Real-time competitive coding challenges with:
  - Matchmaking system
  - Live code execution
  - Automated test evaluation
  - Timer-based competitions

- **Gamification System**:
  - XP and leveling system
  - Leaderboards
  - Achievement tracking
  - Progress visualization

- **Interactive Learning**:
  - Code labs with instant feedback
  - Quizzes and assessments
  - Markdown-based lessons
  - Syntax highlighting

#### Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui, Framer Motion
- **Authentication**: Clerk
- **Database**: Prisma ORM with PostgreSQL
- **Real-time**: Socket.io
- **Code Editor**: Monaco Editor
- **Content**: React Markdown with syntax highlighting

#### Setup

```bash
cd levelup-ai

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your configuration

# Generate Prisma client
npm run db:generate

# Push database schema
npm run db:push

# Seed the database
npm run db:seed

# Start development server
npm run dev
```

Visit `http://localhost:3000` to view the application.

#### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run db:generate` - Generate Prisma client
- `npm run db:push` - Push schema to database
- `npm run db:studio` - Open Prisma Studio
- `npm run db:seed` - Seed database with initial data

---

### 2. My Budget App - Personal Finance Tracker

A comprehensive budget management application implementing zero-based budgeting principles with transaction tracking and visual analytics.

**Location:** `my-app/`

#### Features

- **Zero-Based Budgeting**:
  - Category-based budget allocation
  - Available money tracking
  - Money movement between categories
  - Monthly budget planning

- **Transaction Management**:
  - Add income and expenses
  - Categorize transactions
  - Track spending patterns
  - Transaction history

- **Reports & Analytics**:
  - Spending breakdown by category
  - Visual charts and graphs
  - Monthly spending trends
  - Budget vs. actual analysis

- **Modern UI**:
  - Responsive design
  - Dark mode support
  - Intuitive navigation
  - Real-time updates

#### Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS
- **Charts**: Recharts
- **State Management**: React Context API
- **Storage**: Local Storage (client-side)

#### Setup

```bash
cd my-app

# Install dependencies
npm install

# Start development server
npm run dev
```

Visit `http://localhost:3000` to view the application.

#### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Project Structure

```
claude-code-crash-course/
├── levelup-ai/                  # Learning platform
│   ├── content/                 # Learning content (markdown, JSON)
│   ├── prisma/                  # Database schema and seeds
│   ├── src/
│   │   ├── app/                # Next.js app router pages
│   │   ├── components/         # React components
│   │   └── lib/                # Utilities and business logic
│   └── package.json
│
├── my-app/                      # Budget tracker
│   ├── app/                    # Next.js app router pages
│   ├── components/             # React components
│   ├── context/                # React context providers
│   ├── hooks/                  # Custom React hooks
│   ├── lib/                    # Types and utilities
│   └── package.json
│
└── content/                     # Shared learning content
```

## Development Guidelines

### Prerequisites

- Node.js 18+
- npm or yarn
- PostgreSQL (for levelup-ai)

### Code Style

Both projects use:
- TypeScript for type safety
- ESLint for code quality
- Tailwind CSS for styling
- Next.js App Router

### Git Workflow

- Main branch: `main`
- Feature branches: Use descriptive names
- Commit messages: Follow conventional commits format
# Claude Code Crash Course 🚀
![Claude Code Banner](/static/banner.png)

[![Twitter Follow](https://img.shields.io/twitter/follow/EdenMarco177?style=social)](https://twitter.com/EdenMarco177)
[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](LICENSE)
[![Udemy Course](https://img.shields.io/badge/Claude%20Code%20Udemy%20Course-Coupon%20%2412.99-brightgreen)](https://www.udemy.com/course/claudecode/?referralCode=JAN-2026)

Welcome to the Claude Code Crash Course! This repository is designed to teach you the fundamentals and advanced concepts of Claude Code, Anthropic's official CLI for AI-powered software development, in a hands-on way.

## What is Claude Code? 💡


