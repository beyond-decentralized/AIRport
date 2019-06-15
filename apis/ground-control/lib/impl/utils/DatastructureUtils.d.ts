export declare function ensureChildArray<E>(parentContainer: E[][] | {} | Map<number | string, E[]>, index: number | string): E[];
export declare function ensureChildMap(parentContainer: any[] | {} | Map<number | string, any>, index: number | string): {};
export declare function ensureChildJsMap<E, I extends number | string, CI extends number | string>(parentContainer: Map<number | string, Map<CI, E>>, index: I): Map<CI, E>;
export declare function ensureChildJsSet<E>(parentContainer: Map<number | string, Set<E>>, index: number | string): Set<E>;
