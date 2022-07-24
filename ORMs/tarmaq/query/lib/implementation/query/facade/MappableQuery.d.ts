import { IRelationManager } from '../../../definition/core/entity/IRelationManager';
import { IFieldUtils } from '../../../definition/utils/IFieldUtils';
import { IQueryUtils } from '../../../definition/utils/IQueryUtils';
import { DistinguishableQuery } from './NonEntityQuery';
/**
 * Created by Papa on 10/24/2016.
 */
export declare const FIELD_IN_SELECT_CLAUSE_ERROR_MESSAGE = "Entity SELECT clauses can only contain fields assigned: null | undefined | boolean | Date | number | string | Relation SELECT";
/**
 * A query whose SELECT facade is a collection of properties.
 */
export declare abstract class MappableQuery extends DistinguishableQuery {
    protected nonDistinctSelectClauseToJSON(rawSelect: any, queryUtils: IQueryUtils, fieldUtils: IFieldUtils, relationManager: IRelationManager): any;
}
//# sourceMappingURL=MappableQuery.d.ts.map