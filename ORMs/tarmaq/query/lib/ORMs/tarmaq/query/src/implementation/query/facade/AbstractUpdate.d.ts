import { JsonEntityUpdateColumns, JsonUpdate } from '@airport/ground-control';
import { IQEntity } from '../../../definition/core/entity/Entity';
import { IRelationManager } from '../../../definition/core/entity/IRelationManager';
import { AbstractRawUpdate } from '../../../definition/query/facade/Update';
import { IFieldUtils } from '../../../definition/utils/IFieldUtils';
import { IQueryUtils } from '../../../definition/utils/IQueryUtils';
import { AbstractQuery } from './AbstractQuery';
export declare abstract class AbstractUpdate<IQE extends IQEntity, ARE extends AbstractRawUpdate<IQE>> extends AbstractQuery {
    rawUpdate: ARE;
    protected constructor(rawUpdate: ARE);
    toJSON(queryUtils: IQueryUtils, fieldUtils: IFieldUtils, relationManager: IRelationManager): JsonUpdate<JsonEntityUpdateColumns>;
    protected abstract setToJSON(set: any, queryUtils: IQueryUtils, fieldUtils: IFieldUtils, relationManager: IRelationManager): JsonEntityUpdateColumns;
}
//# sourceMappingURL=AbstractUpdate.d.ts.map