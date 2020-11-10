import { QueryResultType } from '@airport/ground-control';
import { FieldQuery } from '../facade/FieldQuery';
import { SheetQuery } from '../facade/SheetQuery';
import { TreeQuery } from '../facade/TreeQuery';
import { Lookup } from './Lookup';
/**
 * Created by Papa on 11/12/2016.
 */
export class NonEntityFind extends Lookup {
    field(rawFieldQuery, ctx) {
        return this.find(rawFieldQuery, QueryResultType.FIELD, FieldQuery, ctx);
    }
    sheet(rawSheetQuery, cursorSize, callback, ctx) {
        if (cursorSize || callback) {
            throw new Error(`Implement!`);
        }
        return this.find(rawSheetQuery, QueryResultType.SHEET, SheetQuery, ctx);
    }
    tree(rawTreeQuery, ctx) {
        return this.find(rawTreeQuery, QueryResultType.TREE, TreeQuery, ctx);
    }
    find(rawNonEntityQuery, queryResultType, QueryClass, ctx) {
        return this.lookup(rawNonEntityQuery, queryResultType, false, false, QueryClass, this.ensureContext(ctx));
    }
}
//# sourceMappingURL=NonEntityFind.js.map