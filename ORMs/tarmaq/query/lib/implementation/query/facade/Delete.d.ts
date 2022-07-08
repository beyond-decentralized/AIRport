import { JsonDelete } from '@airport/ground-control';
import { IQEntity } from '../../../definition/core/entity/Entity';
import { IRelationManager } from '../../../definition/core/entity/IRelationManager';
import { RawDelete } from '../../../definition/query/facade/Delete';
import { IFieldUtils } from '../../../definition/utils/IFieldUtils';
import { IQueryUtils } from '../../../definition/utils/IQueryUtils';
import { AbstractQuery } from './AbstractQuery';
/**
 * Created by Papa on 10/2/2016.
 */
export declare class Delete<IQE extends IQEntity> extends AbstractQuery {
    rawDelete: RawDelete<IQE>;
    constructor(rawDelete: RawDelete<IQE>);
    toJSON(queryUtils: IQueryUtils, fieldUtils: IFieldUtils, relationManager: IRelationManager): JsonDelete;
}
//# sourceMappingURL=Delete.d.ts.map