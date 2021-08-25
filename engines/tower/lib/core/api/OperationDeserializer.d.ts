import { ISchemaUtils } from "@airport/air-control";
import { IOperationDeserializer } from "@airport/check-in";
import { DbEntity, IEntityStateManager } from "@airport/ground-control";
interface IDeserializableOperation {
    lookupTable: any[];
}
export declare class OperationDeserializer implements IOperationDeserializer {
    deserialize<E, T = E | E[]>(entity: T, dbEntity: DbEntity, entityStateManager: IEntityStateManager, schemaUtils: ISchemaUtils): T;
    doDeserialize<E>(entity: E, dbEntity: DbEntity, operation: IDeserializableOperation, entityStateManager: IEntityStateManager, schemaUtils: ISchemaUtils): E;
    private cleanJsonObject;
}
export {};
//# sourceMappingURL=OperationDeserializer.d.ts.map