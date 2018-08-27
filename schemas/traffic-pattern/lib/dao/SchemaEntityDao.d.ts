import { SchemaVersionId } from '@airport/ground-control';
import { BaseSchemaEntityDao, IBaseSchemaEntityDao, ISchemaEntity, ISchemaReference } from '../generated/generated';
export interface ISchemaEntityDao extends IBaseSchemaEntityDao {
    findAllForSchemaVersions(schemaVersionIds: SchemaVersionId[]): Promise<ISchemaReference[]>;
}
export declare class SchemaEntityDao extends BaseSchemaEntityDao implements ISchemaEntityDao {
    findAllForSchemaVersions(schemaVersionIds: SchemaVersionId[]): Promise<ISchemaEntity[]>;
}
