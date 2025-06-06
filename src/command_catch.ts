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

        if (!state.currentLocationPokemon) {
            console.log(
                "You haven't explored any areas yet. Try exploring first.",
            );
            return;
        }

        if (!state.currentLocationPokemon?.includes(args[0])) {
            console.log(
                `${args[0]} is not at this location. Make sure ${pokemonName} is in the list of Pokemon at this location.`,
            );
            return;
        }

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
