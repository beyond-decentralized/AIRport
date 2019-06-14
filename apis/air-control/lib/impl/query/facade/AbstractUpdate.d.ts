import { JsonEntityUpdateColumns, JsonUpdate } from '@airport/ground-control';
import { IFieldUtils } from '../../../lingo/utils/FieldUtils';
import { IQueryUtils } from '../../../lingo/utils/QueryUtils';
import { IQEntity } from '../../../lingo/core/entity/Entity';
import { AbstractRawUpdate } from '../../../lingo/query/facade/Update';
import { AbstractQuery } from './AbstractQuery';
export declare abstract class AbstractUpdate<IQE extends IQEntity, ARE extends AbstractRawUpdate<IQE>> extends AbstractQuery {
    rawUpdate: ARE;
    constructor(rawUpdate: ARE);
    toJSON(queryUtils: IQueryUtils, fieldUtils: IFieldUtils): JsonUpdate<JsonEntityUpdateColumns>;
    protected abstract setToJSON(set: any): JsonEntityUpdateColumns;
}
