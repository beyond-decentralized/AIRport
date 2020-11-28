import { DbEntity, JsonInsertValues } from '@airport/ground-control';
import { IOperationContext } from '@airport/tower';
import { SQLNoJoinQuery } from './SQLNoJoinQuery';
import { SQLDialect } from './SQLQuery';
/**
 * Created by Papa on 11/17/2016.
 */
export declare class SQLInsertValues extends SQLNoJoinQuery {
    jsonInsertValues: JsonInsertValues;
    constructor(jsonInsertValues: JsonInsertValues, dialect: SQLDialect, context: IOperationContext<any, any>);
    toSQL(context: IOperationContext<any, any>): string;
    protected getColumnsFragment(dbEntity: DbEntity, columns: number[]): string;
    protected getValuesFragment(valuesClauseFragment: any[][], context: IOperationContext<any, any>): string;
}
//# sourceMappingURL=SQLInsertValues.d.ts.map