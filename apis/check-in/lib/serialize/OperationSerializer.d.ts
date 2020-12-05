export interface IOperationSerializer {
    serialize<E, T = E | E[]>(entity: T): T;
}
interface ISerializableOperation {
    lookupTable: any[];
    sequence: number;
}
export declare class OperationSerializer implements IOperationSerializer {
    serialize<E, T = E | E[]>(entity: T): T;
    doSerialize<E>(entity: E, operation: ISerializableOperation): E;
}
export {};
//# sourceMappingURL=OperationSerializer.d.ts.map