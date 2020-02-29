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
    tree(rawTreeQuery) {
        return Observable.from(this.search(rawTreeQuery, QueryResultType.TREE, TreeQuery));
    }
    sheet(rawSheetQuery) {
        return Observable.from(this.search(rawSheetQuery, QueryResultType.SHEET, SheetQuery));
    }
    field(rawFieldQuery) {
        return Observable.from(this.search(rawFieldQuery, QueryResultType.FIELD, FieldQuery));
    }
    search(rawNonEntityQuery, queryResultType, QueryClass) {
        return this.lookup(rawNonEntityQuery, queryResultType, true, false, QueryClass);
    }
}
//# sourceMappingURL=NonEntitySearch.js.map