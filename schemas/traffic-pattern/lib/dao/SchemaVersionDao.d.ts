import { IUtils } from "@airport/air-control";
import { IAirportDatabase } from "@airport/air-control/lib/lingo/AirportDatabase";
import { DomainName } from "@airport/ground-control";
import { SchemaName } from "../ddl/schema/Schema";
import { BaseSchemaVersionDao, IBaseSchemaVersionDao, ISchemaVersion } from "../generated/generated";
export interface ISchemaVersionDao extends IBaseSchemaVersionDao {
    findMaxVersionedMapBySchemaAndDomainNames(schemaDomainNames: DomainName[], schemaNames: SchemaName[]): Promise<Map<DomainName, Map<SchemaName, ISchemaVersion>>>;
}
export declare class SchemaVersionDao extends BaseSchemaVersionDao implements ISchemaVersionDao {
    private airportDatabase;
    constructor(airportDatabase: IAirportDatabase, utils: IUtils);
    findMaxVersionedMapBySchemaAndDomainNames(schemaDomainNames: DomainName[], schemaNames: SchemaName[]): Promise<Map<DomainName, Map<SchemaName, ISchemaVersion>>>;
}
