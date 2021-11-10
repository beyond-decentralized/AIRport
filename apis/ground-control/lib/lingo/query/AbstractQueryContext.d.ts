import { IContext } from "@airport/di";
import { DbEntity } from "../schema/Entity";
export interface IAbstractQueryContext<IocContext> extends IContext {
    checkIfProcessed: boolean;
    dbEntity: DbEntity;
    ioc: IocContext;
    repositorySource?: string;
    repositoryUuid?: string;
}
//# sourceMappingURL=AbstractQueryContext.d.ts.map