# Node Version Requirements

This project requires Node.js 16-18 due to Gatsby 5 compatibility.

## Setup

1. Install Node 18: `nvm install 18`
2. The `.nvmrc` file will automatically use Node 18 for this project
3. Run `npm install` to install dependencies
4. Use `npm run develop` (not `gatsby develop` directly)

## Why?

- Node 24+ has breaking changes that cause buffer overflow errors in Gatsby's LMDB datastore
- All npm scripts automatically switch to the correct Node version
- Your global Node version stays unchanged for other projects

## Team Usage

Everyone should use the npm scripts:
- `npm run develop` - Start dev server
- `npm run build` - Build for production
- `npm run typecheck` - Type checking