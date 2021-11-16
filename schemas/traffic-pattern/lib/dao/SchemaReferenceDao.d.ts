import { SchemaVersionId } from '@airport/ground-control';
import { BaseSchemaReferenceDao, IBaseSchemaReferenceDao, ISchemaReference } from '../generated/generated';
export interface ISchemaReferenceDao extends IBaseSchemaReferenceDao {
    findAllForSchemaVersions(schemaVersionIds: SchemaVersionId[]): Promise<ISchemaReference[]>;
    insert(schemaReferences: ISchemaReference[]): Promise<void>;
}
export declare class SchemaReferenceDao extends BaseSchemaReferenceDao implements ISchemaReferenceDao {
    findAllForSchemaVersions(schemaVersionIds: SchemaVersionId[]): Promise<ISchemaReference[]>;
    insert(schemaReferences: ISchemaReference[]): Promise<void>;
}
//# sourceMappingURL=SchemaReferenceDao.d.ts.map