import { EntityId } from '@airport/ground-control';
import { BaseSchemaColumnDao, IBaseSchemaColumnDao, ISchemaColumn } from '../generated/generated';
export interface ISchemaColumnDao extends IBaseSchemaColumnDao {
    findAllForEntities(entityIds: EntityId[]): Promise<ISchemaColumn[]>;
    insert(schemaColumns: ISchemaColumn[]): Promise<void>;
}
export declare class SchemaColumnDao extends BaseSchemaColumnDao implements ISchemaColumnDao {
    findAllForEntities(entityIds: EntityId[]): Promise<ISchemaColumn[]>;
    insert(schemaColumns: ISchemaColumn[]): Promise<void>;
}
//# sourceMappingURL=SchemaColumnDao.d.ts.map