import { QueryResultType } from '@airport/ground-control';
import { FieldQuery } from '../facade/FieldQuery';
import { SheetQuery } from '../facade/SheetQuery';
import { TreeQuery } from '../facade/TreeQuery';
import { Lookup } from './Lookup';
/**
 * Created by Papa on 11/12/2016.
 */
export class NonEntityFind extends Lookup {
    field(rawFieldQuery) {
        return this.find(rawFieldQuery, QueryResultType.FIELD, FieldQuery);
    }
    sheet(rawSheetQuery, cursorSize, callback) {
        if (cursorSize || callback) {
            throw new Error(`Implement!`);
        }
        return this.find(rawSheetQuery, QueryResultType.SHEET, SheetQuery);
    }
    tree(rawTreeQuery) {
        return this.find(rawTreeQuery, QueryResultType.TREE, TreeQuery);
    }
    find(rawNonEntityQuery, queryResultType, QueryClass) {
        return this.lookup(rawNonEntityQuery, queryResultType, false, false, QueryClass);
    }
}
//# sourceMappingURL=NonEntityFind.js.map