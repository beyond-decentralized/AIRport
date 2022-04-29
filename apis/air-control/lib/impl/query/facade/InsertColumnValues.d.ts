import { JsonInsertValues } from '@airport/ground-control';
import { IQEntity } from '../../../lingo/core/entity/Entity';
import { RawInsertColumnValues } from '../../../lingo/query/facade/InsertValues';
import { IFieldUtils } from '../../../lingo/utils/FieldUtils';
import { IQueryUtils } from '../../../lingo/utils/QueryUtils';
import { IRelationManager } from '../../core/entity/RelationManager';
import { AbstractInsertValues } from './AbstractInsertValues';
export declare class InsertColumnValues<IQE extends IQEntity> extends AbstractInsertValues<IQE, RawInsertColumnValues<IQE>> {
    toJSON(queryUtils: IQueryUtils, fieldUtils: IFieldUtils, relationManager: IRelationManager): JsonInsertValues;
}
//# sourceMappingURL=InsertColumnValues.d.ts.map