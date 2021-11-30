import { SchemaVersionId } from '@airport/ground-control';
import { BaseSchemaEntityDao, IBaseSchemaEntityDao, ISchemaEntity } from '../generated/generated';
export interface ISchemaEntityDao extends IBaseSchemaEntityDao {
    findAllForSchemaVersions(schemaVersionIds: SchemaVersionId[]): Promise<ISchemaEntity[]>;
    insert(schemaEntities: ISchemaEntity[]): Promise<void>;
}
export declare class SchemaEntityDao extends BaseSchemaEntityDao implements ISchemaEntityDao {
    findAllForSchemaVersions(schemaVersionIds: SchemaVersionId[]): Promise<ISchemaEntity[]>;
    insert(schemaEntities: ISchemaEntity[]): Promise<void>;
}
//# sourceMappingURL=SchemaEntityDao.d.ts.map