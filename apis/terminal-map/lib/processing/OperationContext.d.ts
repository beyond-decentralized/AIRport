import { IContext } from "@airport/direction-indicator";
import { DbEntity } from "@airport/ground-control";
import { IActor } from "@airport/holding-pattern";
export interface IOperationContext extends IContext {
    actor: IActor;
    checkIfProcessed: boolean;
    dbEntity: DbEntity;
    entityCascadeGraph: any;
    internal: boolean;
    isSaveOperation?: boolean;
}
export interface IQueryOperationContext extends IOperationContext {
}
//# sourceMappingURL=OperationContext.d.ts.map