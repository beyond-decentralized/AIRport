import { JsonDelete } from '@airport/ground-control';
import { IOperationContext } from '@airport/tower';
import { SQLNoJoinQuery } from './SQLNoJoinQuery';
import { SQLDialect } from './SQLQuery';
/**
 * Created by Papa on 10/2/2016.
 */
export declare class SQLDelete extends SQLNoJoinQuery {
    jsonDelete: JsonDelete;
    constructor(jsonDelete: JsonDelete, dialect: SQLDialect, context: IOperationContext<any, any>);
    toSQL(context: IOperationContext<any, any>): string;
}
//# sourceMappingURL=SQLDelete.d.ts.map