import { QueryResultType } from '@airport/ground-control';
import { from } from '@airport/observe';
import { FieldQuery } from '../facade/FieldQuery';
import { SheetQuery } from '../facade/SheetQuery';
import { TreeQuery } from '../facade/TreeQuery';
import { Lookup } from './Lookup';
/**
 * Created by Papa on 11/12/2016.
 */
export class NonEntitySearch extends Lookup {
    field(rawFieldQuery, context) {
        return from(this.search(rawFieldQuery, QueryResultType.FIELD, FieldQuery, context));
    }
    sheet(rawSheetQuery, context) {
        return from(this.search(rawSheetQuery, QueryResultType.SHEET, SheetQuery, context));
    }
    tree(rawTreeQuery, context) {
        return from(this.search(rawTreeQuery, QueryResultType.TREE, TreeQuery, context));
    }
    search(rawNonEntityQuery, queryResultType, QueryClass, context) {
        return this.lookup(rawNonEntityQuery, queryResultType, true, false, QueryClass, this.ensureContext(context));
    }
}
//# sourceMappingURL=NonEntitySearch.js.map