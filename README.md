# Point of sale system

## Getting Started

First, run the development server:

```bash
npm install
npm run dev
```

_There's a `prisma/dev.db` and we're generating in postinstall so you shouldn't have to really do anything. But if you need to follow standard prisma procedure otherwise._

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Git workflow

This section outlines the Git workflow for managing production, staging, and feature branches.

### Branch Structure

- **`main`**: Stable branch for production.
- **`dev`**: Staging branch where feature branches are merged and tested.
- **`feature-*`**: Short-lived branches for individual features or tasks.

### Workflow Overview

#### Adding a feature branch

If you want to create a _new awesome feature_ do the following.

```sh
git checkout dev
git pull origin dev
git checkout -b feature-new-awesome-feature
```
