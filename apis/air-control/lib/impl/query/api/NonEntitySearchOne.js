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
    tree(rawTreeQuery) {
        return Observable.from(this.searchOne(rawTreeQuery, QueryResultType.TREE, TreeQuery));
    }
    sheet(rawSheetQuery) {
        return Observable.from(this.searchOne(rawSheetQuery, QueryResultType.SHEET, SheetQuery));
    }
    field(rawFieldQuery) {
        return Observable.from(this.searchOne(rawFieldQuery, QueryResultType.FIELD, FieldQuery));
    }
    searchOne(rawNonEntityQuery, queryResultType, QueryClass) {
        return this.lookup(rawNonEntityQuery, queryResultType, true, true, QueryClass);
    }
}
//# sourceMappingURL=NonEntitySearchOne.js.map