import { IEntityUpdateColumns, IQEntity } from '../../../lingo/core/entity/Entity';
import { RawUpdateColumns } from '../../../lingo/query/facade/Update';
import { IFieldUtils } from '../../../lingo/utils/FieldUtils';
import { IQueryUtils } from '../../../lingo/utils/QueryUtils';
import { IRelationManager } from '../../core/entity/RelationManager';
import { AbstractUpdate } from './AbstractUpdate';
export declare class UpdateColumns<IEUC extends IEntityUpdateColumns, IQE extends IQEntity> extends AbstractUpdate<IQE, RawUpdateColumns<IEUC, IQE>> {
    constructor(rawUpdate: RawUpdateColumns<IEUC, IQE>);
    protected setToJSON(set: any, queryUtils: IQueryUtils, fieldUtils: IFieldUtils, relationManager: IRelationManager): IEUC;
}
//# sourceMappingURL=UpdateColumns.d.ts.map