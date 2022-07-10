import { IContext } from "@airport/direction-indicator";
import { IRelationManagerContext } from "@airport/tarmaq-query";
import { ITransaction } from "@airport/terminal-map";

export interface IFuelHydrantContext
    extends IContext, IRelationManagerContext {
    transaction?: ITransaction
}