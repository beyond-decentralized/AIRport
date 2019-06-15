import { JsonTreeQuery } from '@airport/ground-control';
import { IEntityAliases } from '../../../lingo/core/entity/Aliases';
import { IQuery } from '../../../lingo/query/facade/Query';
import { ITreeEntity, RawTreeQuery } from '../../../lingo/query/facade/TreeQuery';
import { IFieldUtils } from '../../../lingo/utils/FieldUtils';
import { IQueryUtils } from '../../../lingo/utils/QueryUtils';
import { DistinguishableQuery } from './NonEntityQuery';
/**
 * Created by Papa on 10/24/2016.
 */
export declare const FIELD_IN_SELECT_CLAUSE_ERROR_MESSAGE = "Entity SELECT clauses can only contain fields assigned: null | undefined | boolean | Date | number | string | Relation SELECT";
/**
 * A query whose select facade is a collection of properties.
 */
export declare abstract class MappableQuery extends DistinguishableQuery {
    protected nonDistinctSelectClauseToJSON(rawSelect: any, queryUtils: IQueryUtils, fieldUtils: IFieldUtils): any;
}
export declare class TreeQuery<ITE extends ITreeEntity> extends MappableQuery implements IQuery {
    rawQuery: RawTreeQuery<ITE>;
    constructor(rawQuery: RawTreeQuery<ITE>, entityAliases?: IEntityAliases);
    toJSON(queryUtils: IQueryUtils, fieldUtils: IFieldUtils): JsonTreeQuery;
}
