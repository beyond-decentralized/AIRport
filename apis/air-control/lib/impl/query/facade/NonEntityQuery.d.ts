import { IEntityAliases } from '../../../lingo/core/entity/Aliases';
import { IFieldUtils } from '../../../lingo/utils/FieldUtils';
import { IQueryUtils } from '../../../lingo/utils/QueryUtils';
import { IRelationManager } from '../../core/entity/RelationManager';
import { AbstractQuery } from './AbstractQuery';
/**
 * Created by Papa on 10/24/2016.
 */
export declare const NON_ENTITY_SELECT_ERROR_MESSAGE = "Unsupported entry in Non-Entity SELECT clause, must be a(n): Entity Field | ManyToOne Relation | primitive wrapped by \"bool\",\"date\",\"num\",\"str\" | query wrapped by \"field\"";
export declare abstract class DistinguishableQuery extends AbstractQuery {
    protected isHierarchicalEntityQuery: boolean;
    constructor(entityAliases?: IEntityAliases);
    protected selectClauseToJSON(rawSelect: any, queryUtils: IQueryUtils, fieldUtils: IFieldUtils, relationManager: IRelationManager): any;
    protected abstract nonDistinctSelectClauseToJSON(rawSelect: any, queryUtils: IQueryUtils, fieldUtils: IFieldUtils, relationManager: IRelationManager): any;
}
//# sourceMappingURL=NonEntityQuery.d.ts.map