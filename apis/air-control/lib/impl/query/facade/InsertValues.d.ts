import { JsonInsertValues } from '@airport/ground-control';
import { IQEntity } from '../../../lingo/core/entity/Entity';
import { RawInsertValues } from '../../../lingo/query/facade/InsertValues';
import { IFieldUtils } from '../../../lingo/utils/FieldUtils';
import { IQueryUtils } from '../../../lingo/utils/QueryUtils';
import { AbstractInsertValues } from './AbstractInsertValues';
/**
 * Created by Papa on 11/17/2016.
 */
export declare class InsertValues<IQE extends IQEntity<any>> extends AbstractInsertValues<IQE, RawInsertValues<IQE>> {
    toJSON(queryUtils: IQueryUtils, fieldUtils: IFieldUtils): JsonInsertValues;
}
//# sourceMappingURL=InsertValues.d.ts.map