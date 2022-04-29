import { IRelationManagerContext } from "@airport/air-control";
import { IContext } from "@airport/direction-indicator";
import { ITransaction } from "@airport/terminal-map";

export interface IFuelHydrantContext
    extends IContext, IRelationManagerContext {
    transaction?: ITransaction
}