import type { State } from './state.js';

export async function commandMapB(state: State): Promise<void> {
    if (!state.prevLocationsURL) {
        console.log('No previous locations');
        return;
    }

    try {
        const response = await state.pokeAPI.fetchLocations(
            state.prevLocationsURL,
        );

        state.nextLocationsURL = response.next;
        state.prevLocationsURL = response.previous;

        response.results.forEach((location) => {
            console.log(location.name);
        });
    } catch (error) {
        console.log(`Error fetching locations: ${error}`);
    }
}
