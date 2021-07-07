import { DbEntity, JsonInsertValues } from '@airport/ground-control';
import { IFuelHydrantContext } from '../../FuelHydrantContext';
import { SQLNoJoinQuery } from './SQLNoJoinQuery';
import { SQLDialect } from './SQLQuery';
/**
 * Created by Papa on 11/17/2016.
 */
export declare class SQLInsertValues extends SQLNoJoinQuery {
    jsonInsertValues: JsonInsertValues;
    constructor(jsonInsertValues: JsonInsertValues, dialect: SQLDialect, context: IFuelHydrantContext);
    toSQL(context: IFuelHydrantContext): string;
    protected getColumnsFragment(dbEntity: DbEntity, columns: number[]): string;
    protected getValuesFragment(valuesClauseFragment: any[][], context: IFuelHydrantContext): string;
}
//# sourceMappingURL=SQLInsertValues.d.ts.map