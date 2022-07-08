import { JsonInsertValues } from '@airport/ground-control';
import { IQEntity } from '../../../definition/core/entity/Entity';
import { IRelationManager } from '../../../definition/core/entity/IRelationManager';
import { RawInsertColumnValues } from '../../../definition/query/facade/InsertValues';
import { IFieldUtils } from '../../../definition/utils/IFieldUtils';
import { IQueryUtils } from '../../../definition/utils/IQueryUtils';
import { AbstractInsertValues } from './AbstractInsertValues';
export declare class InsertColumnValues<IQE extends IQEntity> extends AbstractInsertValues<IQE, RawInsertColumnValues<IQE>> {
    toJSON(queryUtils: IQueryUtils, fieldUtils: IFieldUtils, relationManager: IRelationManager): JsonInsertValues;
}
//# sourceMappingURL=InsertColumnValues.d.ts.map