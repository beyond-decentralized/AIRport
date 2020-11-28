import { IEntityUpdateProperties } from '@airport/air-control';
import { InternalFragments, JsonUpdate } from '@airport/ground-control';
import { IOperationContext } from '@airport/tower';
import { SQLNoJoinQuery } from './SQLNoJoinQuery';
import { SQLDialect } from './SQLQuery';
/**
 * Created by Papa on 10/2/2016.
 */
export declare class SQLUpdate extends SQLNoJoinQuery {
    jsonUpdate: JsonUpdate<IEntityUpdateProperties>;
    constructor(jsonUpdate: JsonUpdate<IEntityUpdateProperties>, dialect: SQLDialect, context: IOperationContext<any, any>);
    toSQL(internalFragments: InternalFragments, context: IOperationContext<any, any>): string;
    protected getSetFragment(setClauseFragment: IEntityUpdateProperties, context: IOperationContext<any, any>): string;
    private addSetFragment;
    private isManyToOneRelation;
    private addManyToOneMappings;
}
//# sourceMappingURL=SQLUpdate.d.ts.map