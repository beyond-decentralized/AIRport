export interface IDatastructureUtils {
    ensureChildArray<E>(parentContainer: E[][] | {} | Map<number | string, E[]>, index: number | string): E[];
    ensureChildMap(parentContainer: any[] | {} | Map<number | string, any>, index: number | string): {};
    ensureChildJsMap<E, I extends number | string, CI extends number | string>(parentContainer: Map<number | string, Map<CI, E>>, index: I): Map<CI, E>;
    ensureChildJsSet<E>(parentContainer: Map<number | string, Set<E>>, index: number | string): Set<E>;
}
