import { IUtils } from '@airport/air-control';
import { IAirportDatabase } from '@airport/air-control/lib/lingo/AirportDatabase';
import { DomainName, SchemaIndex, SchemaName } from '@airport/ground-control';
import { ISchemaVersionDmo } from '../dmo/SchemaVersionDmo';
import { BaseSchemaVersionDao, IBaseSchemaVersionDao, ISchemaVersion } from '../generated/generated';
export interface ISchemaVersionDao extends IBaseSchemaVersionDao {
    findAllLatestForSchemaIndexes(schemaIndexes: SchemaIndex[]): Promise<ISchemaVersion[]>;
    findMaxVersionedMapBySchemaAndDomainNames(schemaDomainNames: DomainName[], schemaNames: SchemaName[]): Promise<Map<DomainName, Map<SchemaName, ISchemaVersion>>>;
}
export declare class SchemaVersionDao extends BaseSchemaVersionDao implements ISchemaVersionDao {
    private airportDatabase;
    private schemaVersionDmo;
    constructor(airportDatabase: IAirportDatabase, schemaVersionDmo: ISchemaVersionDmo, utils: IUtils);
    findAllLatestForSchemaIndexes(schemaIndexes: SchemaIndex[]): Promise<ISchemaVersion[]>;
    findMaxVersionedMapBySchemaAndDomainNames(schemaDomainNames: DomainName[], schemaNames: SchemaName[]): Promise<Map<DomainName, Map<SchemaName, ISchemaVersion>>>;
    private idsForMaxVersionSelect;
}
