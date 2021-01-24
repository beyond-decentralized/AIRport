import { DI } from '@airport/di';
import { QueryResultType, RXJS } from '@airport/ground-control';
import { FieldQuery } from '../facade/FieldQuery';
import { SheetQuery } from '../facade/SheetQuery';
import { TreeQuery } from '../facade/TreeQuery';
import { Lookup } from './Lookup';
/**
 * Created by Papa on 11/12/2016.
 */
export class NonEntitySearchOne extends Lookup {
    field(rawFieldQuery, context) {
        return DI.db().getSync(RXJS).from(this.searchOne(rawFieldQuery, QueryResultType.FIELD, FieldQuery, context));
    }
    sheet(rawSheetQuery, context) {
        return DI.db().getSync(RXJS).from(this.searchOne(rawSheetQuery, QueryResultType.SHEET, SheetQuery, context));
    }
    tree(rawTreeQuery, context) {
        return DI.db().getSync(RXJS).from(this.searchOne(rawTreeQuery, QueryResultType.TREE, TreeQuery, context));
    }
    searchOne(rawNonEntityQuery, queryResultType, QueryClass, context) {
        return this.lookup(rawNonEntityQuery, queryResultType, true, true, QueryClass, this.ensureContext(context));
    }
}
//# sourceMappingURL=NonEntitySearchOne.js.map