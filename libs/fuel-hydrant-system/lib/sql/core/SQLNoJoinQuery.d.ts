import { IAirportDatabase, ISchemaUtils } from '@airport/air-control';
import { DbEntity, IStoreDriver, JSONEntityRelation } from '@airport/ground-control';
import { SQLDialect } from './SQLQuery';
import { SQLWhereBase } from './SQLWhereBase';
/**
 * Created by Papa on 10/2/2016.
 */
export declare abstract class SQLNoJoinQuery extends SQLWhereBase {
    constructor(dbEntity: DbEntity, dialect: SQLDialect, storeDriver: IStoreDriver);
    protected getTableFragment(fromRelation: JSONEntityRelation, airDb: IAirportDatabase, schemaUtils: ISchemaUtils): string;
}
