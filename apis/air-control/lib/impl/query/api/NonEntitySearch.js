import { QueryResultType } from '@airport/ground-control';
import { Observable } from '@airport/observe';
import { FieldQuery } from '../facade/FieldQuery';
import { SheetQuery } from '../facade/SheetQuery';
import { TreeQuery } from '../facade/TreeQuery';
import { Lookup } from './Lookup';
/**
 * Created by Papa on 11/12/2016.
 */
export class NonEntitySearch extends Lookup {
    tree(rawTreeQuery, ctx) {
        return Observable.from(this.search(rawTreeQuery, QueryResultType.TREE, TreeQuery, ctx));
    }
    sheet(rawSheetQuery, ctx) {
        return Observable.from(this.search(rawSheetQuery, QueryResultType.SHEET, SheetQuery, ctx));
    }
    field(rawFieldQuery, ctx) {
        return Observable.from(this.search(rawFieldQuery, QueryResultType.FIELD, FieldQuery, ctx));
    }
    search(rawNonEntityQuery, queryResultType, QueryClass, ctx) {
        return this.lookup(rawNonEntityQuery, queryResultType, true, false, QueryClass, this.ensureContext(ctx));
    }
}
//# sourceMappingURL=NonEntitySearch.js.map