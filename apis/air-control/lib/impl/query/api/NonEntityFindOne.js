import { QueryResultType } from '@airport/ground-control';
import { FieldQuery } from '../facade/FieldQuery';
import { SheetQuery } from '../facade/SheetQuery';
import { TreeQuery } from '../facade/TreeQuery';
import { Lookup } from './Lookup';
/**
 * Created by Papa on 11/12/2016.
 */
export class NonEntityFindOne extends Lookup {
    field(rawFieldQuery) {
        return this.findOne(rawFieldQuery, QueryResultType.FIELD, FieldQuery);
    }
    sheet(rawSheetQuery) {
        return this.findOne(rawSheetQuery, QueryResultType.SHEET, SheetQuery);
    }
    tree(rawTreeQuery) {
        return this.findOne(rawTreeQuery, QueryResultType.TREE, TreeQuery);
    }
    findOne(rawNonEntityQuery, queryResultType, QueryClass) {
        return this.lookup(rawNonEntityQuery, queryResultType, false, true, QueryClass);
    }
}
//# sourceMappingURL=NonEntityFindOne.js.map