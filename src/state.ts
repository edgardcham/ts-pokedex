import { createInterface, type Interface } from 'readline';
import { commandExit } from './command_exit.js';
import { commandHelp } from './command_help.js';
import { commandMap } from './command_map.js';
import { commandMapB } from './command_mapb.js';
import { PokeAPI } from './pokeapi.js';
import { commandExplore } from './command_explore.js';

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
    };

    return {
        rl,
        commands,
        pokeAPI: new PokeAPI(),
        nextLocationsURL: null,
        prevLocationsURL: null,
    };
}
