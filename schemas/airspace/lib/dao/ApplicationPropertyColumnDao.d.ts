import { ColumnId } from '@airport/ground-control';
import { BaseApplicationPropertyColumnDao, IBaseApplicationPropertyColumnDao, IApplicationPropertyColumn } from '../generated/generated';
export interface IApplicationPropertyColumnDao extends IBaseApplicationPropertyColumnDao {
    findAllForColumns(columnIds: ColumnId[]): Promise<IApplicationPropertyColumn[]>;
    insert(applicationPropertyColumns: IApplicationPropertyColumn[]): Promise<void>;
}
export declare class ApplicationPropertyColumnDao extends BaseApplicationPropertyColumnDao implements IApplicationPropertyColumnDao {
    findAllForColumns(columnIds: ColumnId[]): Promise<IApplicationPropertyColumn[]>;
    insert(applicationPropertyColumns: IApplicationPropertyColumn[]): Promise<void>;
}
//# sourceMappingURL=ApplicationPropertyColumnDao.d.ts.map