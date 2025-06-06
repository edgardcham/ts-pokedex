import { State } from './state.js';

export async function commandPokedex(state: State): Promise<void> {
    try {
        console.log('Pokedex:');
        Object.keys(state.pokedex).forEach((pokemonName) => {
            console.log(`- ${pokemonName}`);
        });
    } catch (error) {
        console.log(`Error displaying pokedex: ${error}`);
    }
}
