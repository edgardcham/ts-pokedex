import { State } from './state.js';

export async function commandCatch(
    state: State,
    ...args: string[]
): Promise<void> {
    try {
        if (!args[0]) {
            console.log('Please provide a pokemon name');
            return;
        }

        const pokemonName = args[0].toLowerCase();

        if (state.pokedex[pokemonName]) {
            console.log(`You already have ${pokemonName} in your pokedex`);
            return;
        }

        const pokemon = await state.pokeAPI.catchPokemon(pokemonName);
        console.log(`Throwing a Pokeball at ${pokemonName}...`);
        const randomNumber = Math.random();
        if (randomNumber < 0.5) {
            console.log(`${pokemonName} escaped!`);
            return;
        }
        console.log(`Caught ${pokemonName}!`);
        state.pokedex[pokemonName] = pokemon;
    } catch (error) {
        console.log(`Error catching pokemon: ${error}`);
    }
}
