import { JsonInsertValues } from '@airport/ground-control';
import { IQEntity } from '../../../definition/core/entity/Entity';
import { IRelationManager } from '../../../definition/core/entity/IRelationManager';
import { RawInsertValues } from '../../../definition/query/facade/InsertValues';
import { IFieldUtils } from '../../../definition/utils/IFieldUtils';
import { IQueryUtils } from '../../../definition/utils/IQueryUtils';
import { AbstractInsertValues } from './AbstractInsertValues';
/**
 * Created by Papa on 11/17/2016.
 */
export declare class InsertValues<IQE extends IQEntity> extends AbstractInsertValues<IQE, RawInsertValues<IQE>> {
    toJSON(queryUtils: IQueryUtils, fieldUtils: IFieldUtils, relationManager: IRelationManager): JsonInsertValues;
}
//# sourceMappingURL=InsertValues.d.ts.map