# Pokedex CLI Project

## Node Version

The Node version is specificied in `.nvmrc` as `22.16.0`. To install it, run `nvm install` and `nvm use`.

This version is the latest LTS version.

Alternatively, these shortcuts can be used:

* Install latest stable version:

```bash
nvm install node
nvm use node
```

* Install latest LTS version:

```bash
nvm install --lts
nvm use --lts
```

## Initialize Project

To initialize this project (from scratch), use `npm init -y`.

Then, to install TS as a dev dependncy: `npm install -D typescript @types/node`. `@types/node` provides TS type definitions for Node.js.

Basically, this adds TS support for Node.js built-in modules and APIs.

## TS Config Setup

Configure TS by creating a `tsconfig.json` file in the root of the project.

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "target": "esnext",
    "module": "esnext",
    "rootDir": "./src",
    "outDir": "./dist",
    "strict": true,
    "moduleResolution": "Node",
    "esModuleInterop": true,
    "skipLibCheck": true
  },
  "include": ["./src/**/*.ts"],
  "exclude": ["node_modules"]
}
```

What do these mean?

* `baseUrl`: Sets the base directory for resolving non-relative module names. In this case `.` sets it to the project root directory. This helps with import path resolution.
* `target`: Specifies which JS version to compile to. In this case `esnext` is the latest ECMAScript features available. Alternatives can be `es5`, `es2015`, `es2020`, etc.
* `module`: Determines the module system to use in the output. In this case `esnext` = modern ES modules (import/export). Alternatives are `commonjs`, `amd`, `umd`.
* `rootDir`: Sets the root folder for TS source files. In this case `./src`, meaning all `.ts` files should be in `./src`.
* `outDir`: Where compiled JS files will be output. In this case `./dist`, meaning all TS transpiled files will be in `./dist`.
* `strict`: Enables all strict type checking options (when `true`).
* `moduleResolution`: How TS resolves module imports. In this case `Node` means using Node.js-style resolution.
* `esModuleInterop`: Allows import CommonJS modules with ES6 import syntax. Example: `import express from 'express'` instead of `import * as express from 'express'`.
* `skipLibCheck`: Skips type checking declaration files (`.d.ts`) which speeds up compilation. Useful when using third-party libraries.
* `include`: Which files to include during compilation. In this case `./src/**/*.ts` means all `.ts` files in `src` and subdirectories.
* `exclude`: Which files or folders to exclude. In this case `node_modules` since they are third-party packages and there's no need to compile them.

## Formatter Configuration

For formatting, this project uses `prettier`, installed with `npm install -D prettier`. The configurations are stored in `.prettierrc`:

```json
{
  "semi": true,
  "singleQuote": true,
  "trailingComma": "all",
  "tabWidth": 2
}
```

And a `.prettierignore` file is also setup to skip non-relevant directories.


## Package configuration

```json
{
...
  "type": "module",
  "scripts": {
    "build": "tsc",
    "start": "node dist/main.js",
    "dev": "tsc && node dist/main.js",
    "test": "vitest --run",
    "format": "prettier --write \"src/**/*\""
  },
...
}
```

* `type`: Set to `module`. Required because the `tsconfig.json` specifies `module` as `esnext`. This allows the use of `import`/`export` syntax in the compiled JS.
* `scripts`: Defines scripts.
    1. `build`: This is used to compile the code. Note: if you have installed TS globally, use `npx tsc` to ensure it's using the local one.
    2. `start`: This runs the compiled JS code in `main.js`.
    3. `dev`: Combines both steps above.

## Unit Testing

For unit testing we will use `vitest`. To install it as a dev dependency: `npm install -D vitest`.

Afterwards, add it to the scripts in `package.json`

```json
  "scripts": {
    "test": "vitest --run"
  },
```
