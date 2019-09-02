import { IAirportDatabase, IEntityUpdateProperties, IQMetadataUtils, ISchemaUtils } from '@airport/air-control';
import { InternalFragments, IStoreDriver, JsonUpdate } from '@airport/ground-control';
import { SQLNoJoinQuery } from './SQLNoJoinQuery';
import { SQLDialect } from './SQLQuery';
/**
 * Created by Papa on 10/2/2016.
 */
export declare class SQLUpdate extends SQLNoJoinQuery {
    jsonUpdate: JsonUpdate<IEntityUpdateProperties>;
    constructor(airportDb: IAirportDatabase, jsonUpdate: JsonUpdate<IEntityUpdateProperties>, dialect: SQLDialect, storeDriver: IStoreDriver);
    toSQL(internalFragments: InternalFragments, airDb: IAirportDatabase, schemaUtils: ISchemaUtils, metadataUtils: IQMetadataUtils): string;
    protected getSetFragment(setClauseFragment: IEntityUpdateProperties, airDb: IAirportDatabase, schemaUtils: ISchemaUtils, metadataUtils: IQMetadataUtils): string;
    private addSetFragment;
    private isManyToOneRelation;
    private addManyToOneMappings;
}
