import { IContext } from "@airport/direction-indicator";
import { DbEntity } from "../application/Entity";
export interface IAbstractQueryContext extends IContext {
    checkIfProcessed: boolean;
    dbEntity?: DbEntity;
}
//# sourceMappingURL=AbstractQueryContext.d.ts.map