import { Cache } from './pokecache.js';

export class PokeAPI {
    private static readonly baseURL = 'https://pokeapi.co/api/v2';
    #cache: Cache;

    constructor() {
        this.#cache = new Cache(1000 * 60 * 5);
    }

    async fetchLocations(pageURL: string | null): Promise<ShallowLocations> {
        const url = pageURL || `${PokeAPI.baseURL}/location-area?limit=20`;

        const cached = this.#cache.get<ShallowLocations>(url);
        if (cached) {
            return cached;
        }

        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Failed to fetch locations from ${url}`);
        }

        const data = await response.json();
        this.#cache.add<ShallowLocations>(url, data);
        return data;
    }

    async fetchLocation(locationName: string): Promise<Location> {
        const url = `${PokeAPI.baseURL}/location-area/${locationName}`;

        const cached = this.#cache.get<Location>(url);
        if (cached) {
            return cached;
        }

        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Failed to fetch location ${locationName}`);
        }

        const data = await response.json();
        this.#cache.add<Location>(url, data);
        return data;
    }

    async catchPokemon(pokemonName: string): Promise<Pokemon> {
        const url = `${PokeAPI.baseURL}/pokemon/${pokemonName}`;

        const cached = this.#cache.get<Pokemon>(url);
        if (cached) {
            return cached;
        }

        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Failed to fetch pokemon ${pokemonName}`);
        }

        const data = await response.json();
        this.#cache.add<Pokemon>(url, data);
        return data;
    }
}

export type ShallowLocations = {
    count: number;
    next: string | null;
    previous: string | null;
    results: Array<{
        name: string;
        url: string;
    }>;
};

export type Location = {
    id: number;
    name: string;
    game_index: number;
    encounter_method_rates: any[];
    location: {
        name: string;
        url: string;
    };
    names: Array<{
        name: string;
        language: {
            name: string;
            url: string;
        };
    }>;
    pokemon_encounters: any[];
};

export type Pokemon = {
    id: number;
    name: string;
    base_experience: number;
    height: number;
    is_default: boolean;
    order: number;
    weight: number;
    abilities: any[];
    forms: any[];
};
