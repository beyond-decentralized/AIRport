import { DbColumn, DbEntity } from '@airport/ground-control';
import { IQEntity } from '../../../definition/core/entity/Entity';
import { IRelationManager } from '../../../definition/core/entity/IRelationManager';
import { AbstractRawInsertValues } from '../../../definition/query/facade/InsertValues';
import { IFieldUtils } from '../../../definition/utils/IFieldUtils';
import { IQueryUtils } from '../../../definition/utils/IQueryUtils';
import { AbstractQuery } from './AbstractQuery';
/**
 * Created by Papa on 11/17/2016.
 */
export declare abstract class AbstractInsertValues<IQE extends IQEntity, ARIV extends AbstractRawInsertValues<IQE>> extends AbstractQuery {
    rawInsertValues: ARIV;
    columnIndexes?: number[];
    constructor(rawInsertValues: ARIV, columnIndexes?: number[]);
    protected validateColumn(dbColumn: DbColumn, dbEntity: DbEntity, columnName?: string): void;
    protected valuesToJSON(valueSets: any[][], dbColumns: DbColumn[], queryUtils: IQueryUtils, fieldUtils: IFieldUtils, relationManager: IRelationManager): any[][];
}
//# sourceMappingURL=AbstractInsertValues.d.ts.map