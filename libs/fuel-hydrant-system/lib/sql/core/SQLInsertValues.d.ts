import { IAirportDatabase, IQMetadataUtils, ISchemaUtils } from '@airport/air-control';
import { DbEntity, IStoreDriver, JsonInsertValues } from '@airport/ground-control';
import { SQLNoJoinQuery } from './SQLNoJoinQuery';
import { SQLDialect } from './SQLQuery';
/**
 * Created by Papa on 11/17/2016.
 */
export declare class SQLInsertValues extends SQLNoJoinQuery {
    jsonInsertValues: JsonInsertValues;
    constructor(airportDb: IAirportDatabase, jsonInsertValues: JsonInsertValues, dialect: SQLDialect, storeDriver: IStoreDriver);
    toSQL(airDb: IAirportDatabase, schemaUtils: ISchemaUtils, metadataUtils: IQMetadataUtils): string;
    protected getColumnsFragment(dbEntity: DbEntity, columns: number[]): string;
    protected getValuesFragment(valuesClauseFragment: any[][], airDb: IAirportDatabase, schemaUtils: ISchemaUtils, metadataUtils: IQMetadataUtils): string;
}
