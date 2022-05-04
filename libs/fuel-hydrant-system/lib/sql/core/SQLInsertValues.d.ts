import { IAirportDatabase, IApplicationUtils, IQMetadataUtils, IRelationManager } from '@airport/air-traffic-control';
import { DbEntity, IEntityStateManager, JsonInsertValues } from '@airport/ground-control';
import { IStoreDriver } from '@airport/terminal-map';
import { ISQLQueryAdaptor } from '../../adaptor/SQLQueryAdaptor';
import { IFuelHydrantContext } from '../../FuelHydrantContext';
import { IValidator } from '../../validation/Validator';
import { SQLNoJoinQuery } from './SQLNoJoinQuery';
import { SQLDialect } from './SQLQuery';
/**
 * Created by Papa on 11/17/2016.
 */
export declare class SQLInsertValues extends SQLNoJoinQuery {
    jsonInsertValues: JsonInsertValues;
    protected qValidator: IValidator;
    constructor(jsonInsertValues: JsonInsertValues, dialect: SQLDialect, airportDatabase: IAirportDatabase, applicationUtils: IApplicationUtils, entityStateManager: IEntityStateManager, qMetadataUtils: IQMetadataUtils, qValidator: IValidator, relationManager: IRelationManager, sqlQueryAdapter: ISQLQueryAdaptor, storeDriver: IStoreDriver, context: IFuelHydrantContext);
    toSQL(context: IFuelHydrantContext): string;
    protected getColumnsFragment(dbEntity: DbEntity, columns: number[]): string;
    protected getValuesFragment(valuesClauseFragment: any[][], context: IFuelHydrantContext): string;
}
//# sourceMappingURL=SQLInsertValues.d.ts.map