import { createInterface, type Interface } from 'readline';
import { commandExit } from './command_exit.js';
import { commandHelp } from './command_help.js';
import { commandMap } from './command_map.js';
import { commandMapB } from './command_mapb.js';
import { PokeAPI } from './pokeapi.js';
import { commandExplore } from './command_explore.js';
import { commandCatch } from './command_catch.js';
import type { Pokemon } from './pokeapi.js';
import { commandInspect } from './command_inspect.js';
import { commandPokedex } from './command_pokedex.js';

export type CLICommand = {
    name: string;
    description: string;
    callback: (state: State, ...args: string[]) => Promise<void>;
};

export type State = {
    rl: Interface;
    commands: Record<string, CLICommand>;
    pokeAPI: PokeAPI;
    nextLocationsURL: string | null;
    prevLocationsURL: string | null;
    currentLocationPokemon: string[] | null;
    pokedex: Record<string, Pokemon>;
};

export function initState(): State {
    const rl = createInterface({
        input: process.stdin,
        output: process.stdout,
        prompt: 'Pokedex > ',
    });

    const commands: Record<string, CLICommand> = {
        exit: {
            name: 'exit',
            description: 'Exit the Pokedex',
            callback: commandExit,
        },
        help: {
            name: 'help',
            description: 'Displays a help message',
            callback: commandHelp,
        },
        map: {
            name: 'map',
            description: 'Displays the next 20 locations',
            callback: commandMap,
        },
        mapb: {
            name: 'mapb',
            description: 'Displays the previous 20 locations',
            callback: commandMapB,
        },
        explore: {
            name: 'explore',
            description: 'Explore a location',
            callback: commandExplore,
        },
        catch: {
            name: 'catch',
            description: 'Catch a pokemon',
            callback: commandCatch,
        },
        inspect: {
            name: 'inspect',
            description: 'Inspect a pokemon',
            callback: commandInspect,
        },
        pokedex: {
            name: 'pokedex',
            description: 'Display the pokedex',
            callback: commandPokedex,
        },
    };

    return {
        rl,
        commands,
        pokeAPI: new PokeAPI(),
        nextLocationsURL: null,
        prevLocationsURL: null,
        currentLocationPokemon: null,
        pokedex: {},
    };
}
