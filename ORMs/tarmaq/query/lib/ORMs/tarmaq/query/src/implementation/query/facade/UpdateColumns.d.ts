import { IEntityUpdateColumns, IQEntity } from '../../../definition/core/entity/Entity';
import { IRelationManager } from '../../../definition/core/entity/IRelationManager';
import { RawUpdateColumns } from '../../../definition/query/facade/Update';
import { IFieldUtils } from '../../../definition/utils/IFieldUtils';
import { IQueryUtils } from '../../../definition/utils/IQueryUtils';
import { AbstractUpdate } from './AbstractUpdate';
export declare class UpdateColumns<IEUC extends IEntityUpdateColumns, IQE extends IQEntity> extends AbstractUpdate<IQE, RawUpdateColumns<IEUC, IQE>> {
    constructor(rawUpdate: RawUpdateColumns<IEUC, IQE>);
    protected setToJSON(set: any, queryUtils: IQueryUtils, fieldUtils: IFieldUtils, relationManager: IRelationManager): IEUC;
}
//# sourceMappingURL=UpdateColumns.d.ts.map