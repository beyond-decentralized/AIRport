import { IEntityUpdateProperties } from '@airport/air-control';
import { InternalFragments, JsonUpdate } from '@airport/ground-control';
import { IFuelHydrantContext } from '../../FuelHydrantContext';
import { SQLNoJoinQuery } from './SQLNoJoinQuery';
import { SQLDialect } from './SQLQuery';
/**
 * Created by Papa on 10/2/2016.
 */
export declare class SQLUpdate extends SQLNoJoinQuery {
    jsonUpdate: JsonUpdate<IEntityUpdateProperties>;
    constructor(jsonUpdate: JsonUpdate<IEntityUpdateProperties>, dialect: SQLDialect, context: IFuelHydrantContext);
    toSQL(internalFragments: InternalFragments, context: IFuelHydrantContext): string;
    protected getSetFragment(setClauseFragment: IEntityUpdateProperties, context: IFuelHydrantContext): string;
    private addSetFragment;
    private isManyToOneRelation;
    private addManyToOneMappings;
}
//# sourceMappingURL=SQLUpdate.d.ts.map