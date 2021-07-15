import { IOperationDeserializer } from "@airport/check-in";
import { IEntityStateManager } from "@airport/pressurization";
interface IDeserializableOperation {
    lookupTable: any[];
}
export declare class OperationDeserializer implements IOperationDeserializer {
    deserialize<E, T = E | E[]>(entity: T, entityStateManager: IEntityStateManager): T;
    doDeserialize<E>(entity: E, operation: IDeserializableOperation, entityStateManager: IEntityStateManager): E;
}
export {};
//# sourceMappingURL=OperationDeserializer.d.ts.map