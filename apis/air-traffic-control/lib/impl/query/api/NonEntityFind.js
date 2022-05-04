import { QueryResultType } from '@airport/ground-control';
import { FieldQuery } from '../facade/FieldQuery';
import { SheetQuery } from '../facade/SheetQuery';
import { TreeQuery } from '../facade/TreeQuery';
import { Lookup } from './Lookup';
/**
 * Created by Papa on 11/12/2016.
 */
export class NonEntityFind extends Lookup {
    field(rawFieldQuery, context) {
        return this.find(rawFieldQuery, QueryResultType.FIELD, FieldQuery, context);
    }
    sheet(rawSheetQuery, cursorSize, callback, context) {
        if (cursorSize || callback) {
            throw new Error(`Implement!`);
        }
        return this.find(rawSheetQuery, QueryResultType.SHEET, SheetQuery, context);
    }
    tree(rawTreeQuery, context) {
        return this.find(rawTreeQuery, QueryResultType.TREE, TreeQuery, context);
    }
    find(rawNonEntityQuery, queryResultType, QueryClass, context) {
        return this.lookup(rawNonEntityQuery, queryResultType, false, false, QueryClass, this.ensureContext(context));
    }
}
//# sourceMappingURL=NonEntityFind.js.map