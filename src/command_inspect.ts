import { State } from './state.js';

// inspect pokemon details in pokedex, including name, height, weigh, stats, and types

export async function commandInspect(
    state: State,
    ...args: string[]
): Promise<void> {
    try {
        if (!args[0]) {
            console.log('Please provide a pokemon name');
            return;
        }

        const pokemonName = args[0].toLowerCase();
        const pokemon = state.pokedex[pokemonName];

        if (!pokemon) {
            console.log(`You don't have ${pokemonName} in your pokedex`);
            return;
        }

        console.log(`Name: ${pokemon.name}`);
        console.log(`Height: ${pokemon.height}`);
        console.log(`Weight: ${pokemon.weight}`);
        console.log(`Stats:`);
        pokemon.stats.forEach((stat) => {
            console.log(`- ${stat.stat.name}: ${stat.base_stat}`);
        });
        console.log(`Types:`);
        pokemon.types.forEach((type) => {
            console.log(`- ${type.type.name}`);
        });
    } catch (error) {
        console.log(`Error inspecting pokemon: ${error}`);
    }
}
