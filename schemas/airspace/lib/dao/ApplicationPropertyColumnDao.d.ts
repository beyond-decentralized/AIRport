import { IContext } from '@airport/direction-indicator';
import { ColumnId } from '@airport/ground-control';
import { BaseApplicationPropertyColumnDao, IBaseApplicationPropertyColumnDao, IApplicationPropertyColumn } from '../generated/generated';
export interface IApplicationPropertyColumnDao extends IBaseApplicationPropertyColumnDao {
    findAllForColumns(columnIds: ColumnId[]): Promise<IApplicationPropertyColumn[]>;
    insert(applicationPropertyColumns: IApplicationPropertyColumn[], context: IContext): Promise<void>;
}
export declare class ApplicationPropertyColumnDao extends BaseApplicationPropertyColumnDao implements IApplicationPropertyColumnDao {
    findAllForColumns(columnIds: ColumnId[]): Promise<IApplicationPropertyColumn[]>;
    insert(applicationPropertyColumns: IApplicationPropertyColumn[], context: IContext): Promise<void>;
}
//# sourceMappingURL=ApplicationPropertyColumnDao.d.ts.map