import { IEntityAliases } from "../../../lingo/core/entity/Aliases";
import { AbstractQuery } from "./AbstractQuery";
/**
 * Created by Papa on 10/24/2016.
 */
export declare const NON_ENTITY_SELECT_ERROR_MESSAGE = "Unsupported entry in Non-Entity SELECT clause, must be a(n): Entity Field | ManyToOne Relation | primitive wrapped by \"bool\",\"date\",\"num\",\"str\" | query wrapped by \"field\"";
export declare abstract class DistinguishableQuery extends AbstractQuery {
    protected isHierarchicalEntityQuery: boolean;
    constructor(entityAliases?: IEntityAliases);
    protected selectClauseToJSON(rawSelect: any): any;
    protected abstract nonDistinctSelectClauseToJSON(rawSelect: any): any;
}
