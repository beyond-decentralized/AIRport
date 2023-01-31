import { IContext } from "@airport/direction-indicator";
import { IQueryRelationManagerContext } from "@airport/tarmaq-query";
import { ITransaction } from "@airport/terminal-map";

export interface IFuelHydrantContext
    extends IContext, IQueryRelationManagerContext {
    transaction?: ITransaction
}