import { ColumnId } from '@airport/ground-control';
import { BaseSchemaPropertyColumnDao, IBaseSchemaPropertyColumnDao, ISchemaPropertyColumn } from '../generated/generated';
export interface ISchemaPropertyColumnDao extends IBaseSchemaPropertyColumnDao {
    findAllForColumns(columnIds: ColumnId[]): Promise<ISchemaPropertyColumn[]>;
    insert(schemaPropertyColumns: ISchemaPropertyColumn[]): Promise<void>;
}
export declare class SchemaPropertyColumnDao extends BaseSchemaPropertyColumnDao implements ISchemaPropertyColumnDao {
    findAllForColumns(columnIds: ColumnId[]): Promise<ISchemaPropertyColumn[]>;
    insert(schemaPropertyColumns: ISchemaPropertyColumn[]): Promise<void>;
}
//# sourceMappingURL=SchemaPropertyColumnDao.d.ts.map