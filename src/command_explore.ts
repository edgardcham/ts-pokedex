import { State } from './state.js';

export async function commandExplore(
    state: State,
    ...args: string[]
): Promise<void> {
    try {
        if (!args[0]) {
            console.log('Please provide a location name');
            return;
        }
        const response = await state.pokeAPI.fetchLocation(args[0]);
        console.log(`Exploring ${args[0]}...`);
        console.log('Found Pokemon:');
        response.pokemon_encounters.forEach((encounter) => {
            console.log(`- ${encounter.pokemon.name}`);
        });
    } catch (error) {
        console.log(`Error fetching location: ${error}`);
    }
}
