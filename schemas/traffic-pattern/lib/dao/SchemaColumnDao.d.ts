import { EntityId } from '@airport/ground-control';
import { BaseSchemaColumnDao, IBaseSchemaColumnDao, ISchemaColumn } from '../generated/generated';
export interface ISchemaColumnDao extends IBaseSchemaColumnDao {
    findAllForEntities(entityIds: EntityId[]): Promise<ISchemaColumn[]>;
}
export declare class SchemaColumnDao extends BaseSchemaColumnDao implements ISchemaColumnDao {
    findAllForEntities(entityIds: EntityId[]): Promise<ISchemaColumn[]>;
}
