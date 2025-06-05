import type { State } from './state.js';

export async function commandMap(state: State): Promise<void> {
    try {
        const response = await state.pokeAPI.fetchLocations(
            state.nextLocationsURL,
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
