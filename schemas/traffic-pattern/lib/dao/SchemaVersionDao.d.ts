import { DomainName, SchemaIndex, SchemaName } from '@airport/ground-control';
import { BaseSchemaVersionDao, IBaseSchemaVersionDao, ISchemaVersion } from '../generated/generated';
export interface ISchemaVersionDao extends IBaseSchemaVersionDao {
    findAllLatestForSchemaIndexes(schemaIndexes: SchemaIndex[]): Promise<ISchemaVersion[]>;
    findMaxVersionedMapBySchemaAndDomainNames(schemaDomainNames: DomainName[], schemaNames: SchemaName[]): Promise<Map<DomainName, Map<SchemaName, ISchemaVersion>>>;
}
export declare class SchemaVersionDao extends BaseSchemaVersionDao implements ISchemaVersionDao {
    private schemaVersionDmo;
    constructor();
    findAllLatestForSchemaIndexes(schemaIndexes: SchemaIndex[]): Promise<ISchemaVersion[]>;
    findMaxVersionedMapBySchemaAndDomainNames(schemaDomainNames: DomainName[], schemaNames: SchemaName[]): Promise<Map<DomainName, Map<SchemaName, ISchemaVersion>>>;
    private idsForMaxVersionSelect;
}
