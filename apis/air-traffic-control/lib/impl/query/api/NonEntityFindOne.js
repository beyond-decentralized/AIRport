import { QueryResultType } from '@airport/ground-control';
import { FieldQuery } from '../facade/FieldQuery';
import { SheetQuery } from '../facade/SheetQuery';
import { TreeQuery } from '../facade/TreeQuery';
import { Lookup } from './Lookup';
/**
 * Created by Papa on 11/12/2016.
 */
export class NonEntityFindOne extends Lookup {
    field(rawFieldQuery, context) {
        return this.findOne(rawFieldQuery, QueryResultType.FIELD, FieldQuery, context);
    }
    sheet(rawSheetQuery, context) {
        return this.findOne(rawSheetQuery, QueryResultType.SHEET, SheetQuery, context);
    }
    tree(rawTreeQuery, context) {
        return this.findOne(rawTreeQuery, QueryResultType.TREE, TreeQuery, context);
    }
    findOne(rawNonEntityQuery, queryResultType, QueryClass, context) {
        return this.lookup(rawNonEntityQuery, queryResultType, false, true, QueryClass, this.ensureContext(context));
    }
}
//# sourceMappingURL=NonEntityFindOne.js.map