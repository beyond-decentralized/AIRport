import { ColumnId } from '@airport/ground-control';
import { BaseSchemaRelationColumnDao, IBaseSchemaRelationColumnDao, ISchemaRelationColumn } from '../generated/generated';
export interface ISchemaRelationColumnDao extends IBaseSchemaRelationColumnDao {
    findAllForColumns(columnIds: ColumnId[]): Promise<ISchemaRelationColumn[]>;
}
export declare class SchemaRelationColumnDao extends BaseSchemaRelationColumnDao implements ISchemaRelationColumnDao {
    findAllForColumns(columnIds: ColumnId[]): Promise<ISchemaRelationColumn[]>;
}
//# sourceMappingURL=SchemaRelationColumnDao.d.ts.map