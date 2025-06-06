# Pokedex CLI Project

A command-line interface for exploring the Pokemon world using the [PokeAPI](https://pokeapi.co/). This REPL (Read-Eval-Print Loop) application allows users to navigate through Pokemon location areas and manage data with built-in caching.

## Features

- 🗺️ **Location Navigation**: Browse through Pokemon world locations with `map` and `mapb` commands
- 🔍 **Location Exploration**: Explore specific locations to discover Pokemon encounters
- 🎣 **Pokemon Catching**: Catch Pokemon with randomized success mechanics
- 📖 **Personal Pokedex**: View and inspect your caught Pokemon collection
- 🔄 **API Integration**: Real-time data from PokeAPI with automatic pagination
- 💾 **Smart Caching**: Built-in cache system to reduce API calls and improve performance
- 🏗️ **Modular Architecture**: Clean separation of concerns with state management
- ✅ **Comprehensive Testing**: Unit tests for all major components
- 🔧 **TypeScript**: Full type safety and modern ES modules

## Available Commands

- `help` - Display available commands and usage information
- `exit` - Exit the Pokedex application
- `map` - Display the next 20 location areas
- `mapb` - Display the previous 20 location areas (map back)
- `explore <location>` - Explore a specific location to see Pokemon encounters
- `catch <pokemon>` - Attempt to catch a Pokemon (adds to your Pokedex)
- `inspect <pokemon>` - Inspect a Pokemon in your Pokedex
- `pokedex` - Display all Pokemon you've caught

## Quick Start

```bash
# Install dependencies
npm install

# Start the development environment
npm run dev

# Or build and run separately
npm run build
npm start
```

## Usage Example

```bash
Pokedex > help
Welcome to the Pokedex!
Usage:

help: Displays a help message
exit: Exit the Pokedex
map: Displays the next 20 locations
mapb: Displays the previous 20 locations
explore: Explore a location
catch: Catch a pokemon
inspect: Inspect a pokemon
pokedex: Display the pokedex

Pokedex > map
canalave-city-area
eterna-city-area
pastoria-city-area
sunyshore-city-area
sinnoh-pokemon-league-area
...

Pokedex > explore canalave-city-area
Exploring canalave-city-area...
Found Pokemon:
- tentacool
- tentacruel
- staryu
- magikarp
- gyarados

Pokedex > catch tentacool
Throwing a Pokeball at tentacool...
tentacool was caught!
You may now inspect it with `inspect tentacool`

Pokedex > catch pikachu
You haven't explored any areas with pikachu! Try exploring first.

Pokedex > pokedex
Your Pokedex:
- tentacool

Pokedex > inspect tentacool
Name: tentacool
Height: 9
Weight: 455
Stats:
- hp: 40
- attack: 40
- defense: 35
- special-attack: 50
- special-defense: 100
- speed: 70

Pokedex > exit
Closing the Pokedex... Goodbye!
```

## Architecture

### Core Components

- **`main.ts`** - Application entry point
- **`repl.ts`** - REPL loop and input processing
- **`state.ts`** - Centralized state management and command registry
- **`pokeapi.ts`** - PokeAPI client with type definitions
- **`pokecache.ts`** - In-memory caching system with automatic cleanup

### Command System

- **`command_help.ts`** - Help command implementation
- **`command_exit.ts`** - Exit command with proper cleanup
- **`command_map.ts`** - Forward navigation through locations
- **`command_mapb.ts`** - Backward navigation through locations
- **`command_explore.ts`** - Location exploration and Pokemon discovery
- **`command_catch.ts`** - Pokemon catching mechanics with randomization
- **`command_inspect.ts`** - Pokemon inspection from personal Pokedex
- **`command_pokedex.ts`** - Display caught Pokemon collection

## Node Version

The Node version is specificied in `.nvmrc` as `22.16.0`. To install it, run `nvm install` and `nvm use`.

This version is the latest LTS version.

Alternatively, these shortcuts can be used:

- Install latest stable version:

```bash
nvm install node
nvm use node
```

- Install latest LTS version:

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

- `baseUrl`: Sets the base directory for resolving non-relative module names. In this case `.` sets it to the project root directory. This helps with import path resolution.
- `target`: Specifies which JS version to compile to. In this case `esnext` is the latest ECMAScript features available. Alternatives can be `es5`, `es2015`, `es2020`, etc.
- `module`: Determines the module system to use in the output. In this case `esnext` = modern ES modules (import/export). Alternatives are `commonjs`, `amd`, `umd`.
- `rootDir`: Sets the root folder for TS source files. In this case `./src`, meaning all `.ts` files should be in `./src`.
- `outDir`: Where compiled JS files will be output. In this case `./dist`, meaning all TS transpiled files will be in `./dist`.
- `strict`: Enables all strict type checking options (when `true`).
- `moduleResolution`: How TS resolves module imports. In this case `Node` means using Node.js-style resolution.
- `esModuleInterop`: Allows import CommonJS modules with ES6 import syntax. Example: `import express from 'express'` instead of `import * as express from 'express'`.
- `skipLibCheck`: Skips type checking declaration files (`.d.ts`) which speeds up compilation. Useful when using third-party libraries.
- `include`: Which files to include during compilation. In this case `./src/**/*.ts` means all `.ts` files in `src` and subdirectories.
- `exclude`: Which files or folders to exclude. In this case `node_modules` since they are third-party packages and there's no need to compile them.

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

- `type`: Set to `module`. Required because the `tsconfig.json` specifies `module` as `esnext`. This allows the use of `import`/`export` syntax in the compiled JS.
- `scripts`: Defines scripts.
    1. `build`: This is used to compile the code. Note: if you have installed TS globally, use `npx tsc` to ensure it's using the local one.
    2. `start`: This runs the compiled JS code in `main.js`.
    3. `dev`: Combines both steps above.

## Unit Testing

For unit testing we will use `vitest`. To install it as a dev dependency: `npm install -D vitest`.

```bash
# Run all tests once
npm run test

# Run tests in watch mode (during development)
npm run dev:test
```

### Test Coverage

The project includes comprehensive tests for:

- **Input Processing**: `cleanInput()` function with edge cases
- **Cache System**: Data storage, retrieval, expiration, and cleanup
- **Command Functions**: Help and exit command behavior
- **API Client**: URL construction and error handling (with mocks)

Test files follow the naming convention `*.test.ts` and use Vitest's testing framework with mocking capabilities.

## Technical Details

### State Management

The application uses a centralized state object that contains:

```typescript
type State = {
  rl: Interface;                           // Readline interface
  commands: Record<string, CLICommand>;    // Command registry
  pokeAPI: PokeAPI;                        // API client instance
  nextLocationsURL: string | null;        // Pagination: next page URL
  prevLocationsURL: string | null;        // Pagination: previous page URL
  pokedex: Record<string, Pokemon>;       // Player's caught Pokemon collection
};
```

### API Integration

The PokeAPI client (`pokeapi.ts`) provides:

- **`fetchLocations(pageURL?)`** - Retrieve location areas with pagination
- **`fetchLocation(locationName)`** - Get detailed location information
- **Type definitions** for API responses (`ShallowLocations`, `Location`)

Example API response structure:

```json
{
  "count": 1089,
  "next": "https://pokeapi.co/api/v2/location-area/?offset=20&limit=20",
  "previous": null,
  "results": [
    {
      "name": "canalave-city-area",
      "url": "https://pokeapi.co/api/v2/location-area/1/"
    }
  ]
}
```

### Caching System

The cache (`pokecache.ts`) implements:

- **Time-based expiration** - Configurable TTL per cache instance
- **Automatic cleanup** - Background reaping of expired entries
- **Generic type support** - Can cache any data type
- **Memory management** - Proper cleanup when cache is stopped

```typescript
const cache = new Cache(300000); // 5 minute TTL
cache.add('locations-page-1', apiResponse);
const cached = cache.get('locations-page-1'); // Returns data or undefined
```

### Command System Implementation

Commands follow a consistent interface:

```typescript
type CLICommand = {
  name: string;
  description: string;
  callback: (state: State, ...args: string[]) => Promise<void>;
};
```

This allows for:

- **Extensibility** - Easy to add new commands
- **Consistency** - All commands have the same signature
- **Async support** - Commands can perform network operations
- **State access** - Commands can modify application state

### Pokemon Game Mechanics

The application includes engaging Pokemon gameplay features:

#### **Location Exploration**

- Use `explore <location-name>` to discover Pokemon in specific areas
- Shows all Pokemon that can be encountered in that location
- Data retrieved from PokeAPI's encounter system

#### **Pokemon Catching**

- Use `catch <pokemon-name>` to attempt catching a Pokemon
- **Prerequisites**: Pokemon must be in your current explored area
- You can only catch Pokemon that you've discovered through `explore` command
- Successful catches add Pokemon to your personal Pokedex

#### **Pokedex Management**

- `pokedex` command shows all your caught Pokemon
- `inspect <pokemon-name>` provides detailed stats for caught Pokemon
- Pokemon data includes: height, weight, base stats (HP, Attack, Defense, etc.)
- Persistent storage during session (data resets when restarting)

## Development

### Project Structure

```bash
src/
├── main.ts              # Entry point
├── repl.ts              # REPL implementation
├── state.ts             # State management
├── pokeapi.ts           # API client
├── pokecache.ts         # Caching system
├── command_*.ts         # Individual command implementations
└── *.test.ts            # Test files
```

### Code Style

The project uses Prettier for consistent formatting:

```bash
# Format all code
npm run format

# Check formatting
npm run format:check
```

### ES Modules

The project uses modern ES modules (`import`/`export`) throughout:

- **`"type": "module"`** in `package.json`
- **`.js` extensions** in import statements (required for ES modules)
- **Modern Node.js features** like `fetch()` API
