import { JsonDelete } from '@airport/ground-control';
import { IFieldUtils } from '../../../lingo/utils/FieldUtils';
import { IQueryUtils } from '../../../lingo/utils/QueryUtils';
import { IQEntity } from '../../../lingo/core/entity/Entity';
import { RawDelete } from '../../../lingo/query/facade/Delete';
import { AbstractQuery } from './AbstractQuery';
/**
 * Created by Papa on 10/2/2016.
 */
export declare class Delete<IQE extends IQEntity> extends AbstractQuery {
    rawDelete: RawDelete<IQE>;
    constructor(rawDelete: RawDelete<IQE>);
    toJSON(queryUtils: IQueryUtils, fieldUtils: IFieldUtils): JsonDelete;
}
