import { IOperationDeserializer } from '@airport/arrivals-n-departures';
import { DbEntity, IEntityStateManager } from "@airport/ground-control";
import { IApplicationUtils } from '@airport/tarmaq-query';
interface IDeserializableOperation {
    lookupTable: any[];
}
export declare class OperationDeserializer implements IOperationDeserializer {
    deserialize<E, T = E | E[]>(entity: T, dbEntity: DbEntity, entityStateManager: IEntityStateManager, applicationUtils: IApplicationUtils): T;
    doDeserialize<E>(entity: E, dbEntity: DbEntity, operation: IDeserializableOperation, entityStateManager: IEntityStateManager, applicationUtils: IApplicationUtils): E;
    private cleanJsonObject;
}
export {};
//# sourceMappingURL=OperationDeserializer.d.ts.map