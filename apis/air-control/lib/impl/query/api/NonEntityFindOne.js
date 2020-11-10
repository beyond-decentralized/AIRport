import { QueryResultType } from '@airport/ground-control';
import { FieldQuery } from '../facade/FieldQuery';
import { SheetQuery } from '../facade/SheetQuery';
import { TreeQuery } from '../facade/TreeQuery';
import { Lookup } from './Lookup';
/**
 * Created by Papa on 11/12/2016.
 */
export class NonEntityFindOne extends Lookup {
    field(rawFieldQuery, ctx) {
        return this.findOne(rawFieldQuery, QueryResultType.FIELD, FieldQuery, ctx);
    }
    sheet(rawSheetQuery, ctx) {
        return this.findOne(rawSheetQuery, QueryResultType.SHEET, SheetQuery, ctx);
    }
    tree(rawTreeQuery, ctx) {
        return this.findOne(rawTreeQuery, QueryResultType.TREE, TreeQuery, ctx);
    }
    findOne(rawNonEntityQuery, queryResultType, QueryClass, ctx) {
        return this.lookup(rawNonEntityQuery, queryResultType, false, true, QueryClass, this.ensureContext(ctx));
    }
}
//# sourceMappingURL=NonEntityFindOne.js.map