import { IFieldUtils } from '../../../lingo/utils/FieldUtils';
import { IQueryUtils } from '../../../lingo/utils/QueryUtils';
import { IRelationManager } from '../../core/entity/RelationManager';
import { DistinguishableQuery } from './NonEntityQuery';
/**
 * Created by Papa on 10/24/2016.
 */
export declare const FIELD_IN_SELECT_CLAUSE_ERROR_MESSAGE = "Entity SELECT clauses can only contain fields assigned: null | undefined | boolean | Date | number | string | Relation SELECT";
/**
 * A query whose select facade is a collection of properties.
 */
export declare abstract class MappableQuery extends DistinguishableQuery {
    protected nonDistinctSelectClauseToJSON(rawSelect: any, queryUtils: IQueryUtils, fieldUtils: IFieldUtils, relationManager: IRelationManager): any;
}
//# sourceMappingURL=MappableQuery.d.ts.map