"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ground_control_1 = require("@airport/ground-control");
const FieldQuery_1 = require("../facade/FieldQuery");
const SheetQuery_1 = require("../facade/SheetQuery");
const TreeQuery_1 = require("../facade/TreeQuery");
const Lookup_1 = require("./Lookup");
/**
 * Created by Papa on 11/12/2016.
 */
class NonEntityFindOne extends Lookup_1.Lookup {
    field(rawFieldQuery) {
        return this.findOne(rawFieldQuery, ground_control_1.QueryResultType.FIELD, FieldQuery_1.FieldQuery);
    }
    sheet(rawSheetQuery) {
        return this.findOne(rawSheetQuery, ground_control_1.QueryResultType.SHEET, SheetQuery_1.SheetQuery);
    }
    tree(rawTreeQuery) {
        return this.findOne(rawTreeQuery, ground_control_1.QueryResultType.TREE, TreeQuery_1.TreeQuery);
    }
    findOne(rawNonEntityQuery, queryResultType, QueryClass) {
        return this.lookup(rawNonEntityQuery, queryResultType, false, true, QueryClass);
    }
}
exports.NonEntityFindOne = NonEntityFindOne;
//# sourceMappingURL=NonEntityFindOne.js.map