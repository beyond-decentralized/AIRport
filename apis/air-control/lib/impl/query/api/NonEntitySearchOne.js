import { QueryResultType } from '@airport/ground-control';
import { Observable } from '@airport/observe';
import { FieldQuery } from '../facade/FieldQuery';
import { SheetQuery } from '../facade/SheetQuery';
import { TreeQuery } from '../facade/TreeQuery';
import { Lookup } from './Lookup';
/**
 * Created by Papa on 11/12/2016.
 */
export class NonEntitySearchOne extends Lookup {
    field(rawFieldQuery, context) {
        return Observable.from(this.searchOne(rawFieldQuery, QueryResultType.FIELD, FieldQuery, context));
    }
    sheet(rawSheetQuery, context) {
        return Observable.from(this.searchOne(rawSheetQuery, QueryResultType.SHEET, SheetQuery, context));
    }
    tree(rawTreeQuery, context) {
        return Observable.from(this.searchOne(rawTreeQuery, QueryResultType.TREE, TreeQuery, context));
    }
    searchOne(rawNonEntityQuery, queryResultType, QueryClass, context) {
        return this.lookup(rawNonEntityQuery, queryResultType, true, true, QueryClass, this.ensureContext(context));
    }
}
//# sourceMappingURL=NonEntitySearchOne.js.map