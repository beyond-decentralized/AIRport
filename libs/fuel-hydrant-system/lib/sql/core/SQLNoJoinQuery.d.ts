import { DbEntity, IStoreDriver, JSONEntityRelation } from '@airport/ground-control';
import { IOperationContext } from '@airport/tower';
import { SQLDialect } from './SQLQuery';
import { SQLWhereBase } from './SQLWhereBase';
/**
 * Created by Papa on 10/2/2016.
 */
export declare abstract class SQLNoJoinQuery extends SQLWhereBase {
    constructor(dbEntity: DbEntity, dialect: SQLDialect, storeDriver: IStoreDriver);
    protected getTableFragment(fromRelation: JSONEntityRelation, context: IOperationContext<any, any>, addAs?: boolean): string;
}
//# sourceMappingURL=SQLNoJoinQuery.d.ts.map