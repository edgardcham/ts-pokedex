import { Cache } from './pokecache.js';
import { test, expect, describe, it, beforeEach, afterEach } from 'vitest';

describe('Cache', () => {
    let cache: Cache;

    afterEach(() => {
        if (cache) {
            cache.stopReapLoop();
        }
    });

    test.concurrent.each([
        {
            key: 'https://example.com',
            val: 'testdata',
            interval: 500,
        },
        {
            key: 'https://example.com/path',
            val: 'moretestdata',
            interval: 1000,
        },
    ])('Test Caching $interval ms', async ({ key, val, interval }) => {
        const cache = new Cache(interval);

        cache.add(key, val);
        const cached = cache.get(key);
        expect(cached).toBe(val);

        await new Promise((resolve) => setTimeout(resolve, interval + 100));
        const reaped = cache.get(key);
        expect(reaped).toBe(undefined);

        cache.stopReapLoop();
    });

    it('should return undefined for non-existent keys', () => {
        cache = new Cache(1000);
        const result = cache.get('non-existent-key');
        expect(result).toBeUndefined();
    });

    it('should handle different data types', () => {
        cache = new Cache(1000);

        // Test with string
        cache.add('string-key', 'hello world');
        expect(cache.get('string-key')).toBe('hello world');

        // Test with number
        cache.add('number-key', 42);
        expect(cache.get('number-key')).toBe(42);

        // Test with object
        const testObj = { name: 'pikachu', level: 25 };
        cache.add('object-key', testObj);
        expect(cache.get('object-key')).toEqual(testObj);

        // Test with array
        const testArray = ['item1', 'item2', 'item3'];
        cache.add('array-key', testArray);
        expect(cache.get('array-key')).toEqual(testArray);
    });

    it('should overwrite existing keys', () => {
        cache = new Cache(1000);

        cache.add('test-key', 'first-value');
        expect(cache.get('test-key')).toBe('first-value');

        cache.add('test-key', 'second-value');
        expect(cache.get('test-key')).toBe('second-value');
    });

    it('should handle multiple keys independently', () => {
        cache = new Cache(1000);

        cache.add('key1', 'value1');
        cache.add('key2', 'value2');
        cache.add('key3', 'value3');

        expect(cache.get('key1')).toBe('value1');
        expect(cache.get('key2')).toBe('value2');
        expect(cache.get('key3')).toBe('value3');
        expect(cache.get('key4')).toBeUndefined();
    });

    it('should clean up properly when stopped', () => {
        cache = new Cache(100);
        cache.add('test', 'value');

        cache.stopReapLoop();
        // Cache should still work after stopping reap loop
        expect(cache.get('test')).toBe('value');
    });
});
