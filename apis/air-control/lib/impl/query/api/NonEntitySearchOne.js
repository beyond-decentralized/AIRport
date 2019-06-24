"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ground_control_1 = require("@airport/ground-control");
const observe_1 = require("@airport/observe");
const FieldQuery_1 = require("../facade/FieldQuery");
const SheetQuery_1 = require("../facade/SheetQuery");
const TreeQuery_1 = require("../facade/TreeQuery");
const Lookup_1 = require("./Lookup");
/**
 * Created by Papa on 11/12/2016.
 */
class NonEntitySearchOne extends Lookup_1.Lookup {
    tree(rawTreeQuery) {
        return observe_1.Observable.from(this.searchOne(rawTreeQuery, ground_control_1.QueryResultType.TREE, TreeQuery_1.TreeQuery));
    }
    sheet(rawSheetQuery) {
        return observe_1.Observable.from(this.searchOne(rawSheetQuery, ground_control_1.QueryResultType.SHEET, SheetQuery_1.SheetQuery));
    }
    field(rawFieldQuery) {
        return observe_1.Observable.from(this.searchOne(rawFieldQuery, ground_control_1.QueryResultType.FIELD, FieldQuery_1.FieldQuery));
    }
    searchOne(rawNonEntityQuery, queryResultType, QueryClass) {
        return this.lookup(rawNonEntityQuery, queryResultType, true, true, QueryClass);
    }
}
exports.NonEntitySearchOne = NonEntitySearchOne;
//# sourceMappingURL=NonEntitySearchOne.js.map