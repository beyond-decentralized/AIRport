import { ColumnId } from '@airport/ground-control';
import { BaseSchemaPropertyColumnDao, IBaseSchemaPropertyColumnDao, ISchemaPropertyColumn } from '../generated/generated';
export interface ISchemaPropertyColumnDao extends IBaseSchemaPropertyColumnDao {
    findAllForColumns(columnIds: ColumnId[]): Promise<ISchemaPropertyColumn[]>;
}
export declare class SchemaPropertyColumnDao extends BaseSchemaPropertyColumnDao implements ISchemaPropertyColumnDao {
    findAllForColumns(columnIds: ColumnId[]): Promise<ISchemaPropertyColumn[]>;
}
//# sourceMappingURL=SchemaPropertyColumnDao.d.ts.map