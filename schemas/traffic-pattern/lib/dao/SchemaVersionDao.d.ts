import { SchemaIndex, SchemaVersionMajor, SchemaVersionMinor, SchemaVersionPatch } from "@airport/ground-control";
import { IUtils } from "@airport/air-control";
import { IAirportDatabase } from "@airport/air-control/lib/lingo/AirportDatabase";
import { SchemaDomainName, SchemaName } from "../ddl/schema/Schema";
import { BaseSchemaVersionDao, IBaseSchemaVersionDao } from "../generated/generated";
export interface MaxSchemaVersionView {
    index: SchemaIndex;
    domainName: SchemaDomainName;
    name: SchemaName;
    majorVersion: SchemaVersionMajor;
    minorVersion: SchemaVersionMinor;
    patchVersion: SchemaVersionPatch;
}
export interface ISchemaVersionDao extends IBaseSchemaVersionDao {
    findMaxVersionedMapBySchemaAndDomainNames(schemaDomainNames: SchemaDomainName[], schemaNames: SchemaName[]): Promise<Map<SchemaDomainName, Map<SchemaName, MaxSchemaVersionView>>>;
}
export declare class SchemaVersionDao extends BaseSchemaVersionDao implements ISchemaVersionDao {
    private airportDatabase;
    constructor(airportDatabase: IAirportDatabase, utils: IUtils);
    findMaxVersionedMapBySchemaAndDomainNames(schemaDomainNames: SchemaDomainName[], schemaNames: SchemaName[]): Promise<Map<SchemaDomainName, Map<SchemaName, MaxSchemaVersionView>>>;
}
