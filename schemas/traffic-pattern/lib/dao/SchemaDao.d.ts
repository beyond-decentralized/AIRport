import { DomainName, JsonSchema, SchemaIndex, SchemaName, SchemaStatus, SchemaVersionId } from '@airport/ground-control';
import { BaseSchemaDao, IBaseSchemaDao, ISchema } from '../generated/generated';
export interface ISchemaLookupRecord {
    index: number;
    domain: {
        id: number;
        name: string;
    };
    jsonSchema: JsonSchema;
    name: string;
    majorVersion: number;
    minorVersion: number;
    patchVersion: number;
}
export interface ISchemaDao extends IBaseSchemaDao {
    findAllActive(): Promise<ISchema[]>;
    findMapByVersionIds(schemaVersionIds: SchemaVersionId[]): Promise<Map<SchemaIndex, ISchema>>;
    findMaxVersionedMapBySchemaAndDomainNames(schemaDomainNames: DomainName[], schemaNames: SchemaName[]): Promise<Map<DomainName, Map<SchemaName, ISchemaLookupRecord>>>;
    setStatusByIndexes(indexes: SchemaIndex[], status: SchemaStatus): Promise<void>;
    findMapByNames(schemaNames: SchemaName[]): Promise<Map<SchemaName, ISchema>>;
    insert(schemas: ISchema[]): Promise<void>;
}
export declare class SchemaDao extends BaseSchemaDao implements ISchemaDao {
    findAllActive(): Promise<ISchema[]>;
    findMapByVersionIds(schemaVersionIds: SchemaVersionId[]): Promise<Map<SchemaVersionId, ISchema>>;
    findMaxIndex(): Promise<SchemaIndex>;
    findMaxVersionedMapBySchemaAndDomainNames(schemaDomainNames: DomainName[], schemaNames: SchemaName[]): Promise<Map<DomainName, Map<SchemaName, ISchemaLookupRecord>>>;
    setStatusByIndexes(indexes: SchemaIndex[], status: SchemaStatus): Promise<void>;
    findMapByNames(schemaNames: SchemaName[]): Promise<Map<SchemaName, ISchema>>;
    insert(schemas: ISchema[]): Promise<void>;
}
//# sourceMappingURL=SchemaDao.d.ts.map