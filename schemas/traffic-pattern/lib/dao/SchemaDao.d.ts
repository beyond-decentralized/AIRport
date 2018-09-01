import { IAirportDatabase } from '@airport/air-control/lib/lingo/AirportDatabase';
import { IUtils } from '@airport/air-control/lib/lingo/utils/Utils';
import { DomainName, SchemaIndex, SchemaName, SchemaStatus, SchemaVersionId } from '@airport/ground-control';
import { BaseSchemaDao, IBaseSchemaDao, ISchema } from '../generated/generated';
export interface ISchemaDao extends IBaseSchemaDao {
    findAllActive(): Promise<ISchema[]>;
    findMapByVersionIds(schemaVersionIds: SchemaVersionId[]): Promise<Map<SchemaIndex, ISchema>>;
    findMaxVersionedMapBySchemaAndDomainNames(schemaDomainNames: DomainName[], schemaNames: SchemaName[]): Promise<Map<DomainName, Map<SchemaName, ISchema>>>;
    setStatusByIndexes(indexes: SchemaIndex[], status: SchemaStatus): Promise<void>;
    findMapByNames(schemaNames: SchemaName[]): Promise<Map<SchemaName, ISchema>>;
}
export declare class SchemaDao extends BaseSchemaDao implements ISchemaDao {
    private airportDatabase;
    constructor(airportDatabase: IAirportDatabase, utils: IUtils);
    findAllActive(): Promise<ISchema[]>;
    findMapByVersionIds(schemaVersionIds: SchemaVersionId[]): Promise<Map<SchemaVersionId, ISchema>>;
    findMaxIndex(): Promise<SchemaIndex>;
    findMaxVersionedMapBySchemaAndDomainNames(schemaDomainNames: DomainName[], schemaNames: SchemaName[]): Promise<Map<DomainName, Map<SchemaName, ISchema>>>;
    setStatusByIndexes(indexes: SchemaIndex[], status: SchemaStatus): Promise<void>;
    findMapByNames(schemaNames: SchemaName[]): Promise<Map<SchemaName, ISchema>>;
}
