import { IContext } from '@airport/direction-indicator';
import { ApplicationColumn_LocalId } from '@airport/ground-control';
import { BaseApplicationRelationColumnDao, IBaseApplicationRelationColumnDao, IApplicationRelationColumn } from '../generated/generated';
export interface IApplicationRelationColumnDao extends IBaseApplicationRelationColumnDao {
    findAllForColumns(columnIds: ApplicationColumn_LocalId[]): Promise<IApplicationRelationColumn[]>;
    insert(applicationRelationColumns: IApplicationRelationColumn[], context: IContext): Promise<void>;
}
export declare class ApplicationRelationColumnDao extends BaseApplicationRelationColumnDao implements IApplicationRelationColumnDao {
    findAllForColumns(columnIds: ApplicationColumn_LocalId[]): Promise<IApplicationRelationColumn[]>;
    insert(applicationRelationColumns: IApplicationRelationColumn[], context: IContext): Promise<void>;
}
//# sourceMappingURL=ApplicationRelationColumnDao.d.ts.map