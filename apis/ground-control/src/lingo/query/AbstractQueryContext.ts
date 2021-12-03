import { IContext } from "@airport/di";
import { DbEntity } from "../application/Entity";

export interface IAbstractQueryContext<IocContext>
    extends IContext {
    checkIfProcessed: boolean
    dbEntity?: DbEntity
    ioc: IocContext
}
