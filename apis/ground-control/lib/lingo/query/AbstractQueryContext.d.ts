import { IContext } from "@airport/direction-indicator";
import { DbEntity } from "../application/Entity";
export interface IAbstractQueryContext<IocContext> extends IContext {
    checkIfProcessed: boolean;
    dbEntity?: DbEntity;
    ioc: IocContext;
}
//# sourceMappingURL=AbstractQueryContext.d.ts.map