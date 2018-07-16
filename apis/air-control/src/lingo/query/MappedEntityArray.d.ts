/**
 * Array enriched by a map-like interface.
 *
 * Used by Entity Graph Queries.
 */
export interface MappedEntityArray<E> extends Array<E> {
    /**
     * The underlying data map.
     */
    dataMap: {
        [id: string]: E;
    };
    /**
     * The name of the field of the object in the map used as the key
     * for the map.
     */
    keyField: string | number;
    /**
     * Clears the datastructure
     */
    clear(): void;
    /**
     * Puts all of the values in the input array into the datastructure
     */
    putAll(values: E[]): void;
    /**
     * Puts the input object into the datastructure
     */
    put(value: E): E;
    /**
     * Retrieves an object from the datastructure by the inputted key
     */
    get(key: string | number): E;
    /**
     * Deletes an object form the datastructure by the inputted key
     */
    delete(key: string | number): E;
    /**
     * Returns a plain array containing all objects in the datastructure
     */
    toArray(): E[];
}
