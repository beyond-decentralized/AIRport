import { IAirportDatabase } from '@airport/air-control';
import { IQMetadataUtils, ISchemaUtils } from '@airport/air-control';
import { JsonDelete } from '@airport/ground-control';
import { SQLNoJoinQuery } from './SQLNoJoinQuery';
import { SQLDialect } from './SQLQuery';
/**
 * Created by Papa on 10/2/2016.
 */
export declare class SQLDelete extends SQLNoJoinQuery {
    jsonDelete: JsonDelete;
    constructor(airportDb: IAirportDatabase, jsonDelete: JsonDelete, dialect: SQLDialect);
    toSQL(airDb: IAirportDatabase, schemaUtils: ISchemaUtils, metadataUtils: IQMetadataUtils): string;
}
