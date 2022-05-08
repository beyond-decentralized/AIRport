import { IContext } from '@airport/direction-indicator';
import { ColumnId } from '@airport/ground-control';
import { BaseApplicationRelationColumnDao, IBaseApplicationRelationColumnDao, IApplicationRelationColumn } from '../generated/generated';
export interface IApplicationRelationColumnDao extends IBaseApplicationRelationColumnDao {
    findAllForColumns(columnIds: ColumnId[]): Promise<IApplicationRelationColumn[]>;
    insert(applicationRelationColumns: IApplicationRelationColumn[], context: IContext): Promise<void>;
}
export declare class ApplicationRelationColumnDao extends BaseApplicationRelationColumnDao implements IApplicationRelationColumnDao {
    findAllForColumns(columnIds: ColumnId[]): Promise<IApplicationRelationColumn[]>;
    insert(applicationRelationColumns: IApplicationRelationColumn[], context: IContext): Promise<void>;
}
//# sourceMappingURL=ApplicationRelationColumnDao.d.ts.map