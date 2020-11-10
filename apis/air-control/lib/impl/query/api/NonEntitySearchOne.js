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
    tree(rawTreeQuery, ctx) {
        return Observable.from(this.searchOne(rawTreeQuery, QueryResultType.TREE, TreeQuery, ctx));
    }
    sheet(rawSheetQuery, ctx) {
        return Observable.from(this.searchOne(rawSheetQuery, QueryResultType.SHEET, SheetQuery, ctx));
    }
    field(rawFieldQuery, ctx) {
        return Observable.from(this.searchOne(rawFieldQuery, QueryResultType.FIELD, FieldQuery, ctx));
    }
    searchOne(rawNonEntityQuery, queryResultType, QueryClass, ctx) {
        return this.lookup(rawNonEntityQuery, queryResultType, true, true, QueryClass, this.ensureContext(ctx));
    }
}
//# sourceMappingURL=NonEntitySearchOne.js.map