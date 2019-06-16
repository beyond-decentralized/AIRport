"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const di_1 = require("@airport/di");
const ground_control_1 = require("@airport/ground-control");
const observe_1 = require("@airport/observe");
const diTokens_1 = require("../../../diTokens");
const FieldQuery_1 = require("../facade/FieldQuery");
const SheetQuery_1 = require("../facade/SheetQuery");
const TreeQuery_1 = require("../facade/TreeQuery");
/**
 * Created by Papa on 11/12/2016.
 */
class NonEntitySearch {
    tree(rawTreeQuery) {
        return observe_1.Observable.from(this.doSearch(rawTreeQuery, TreeQuery_1.TreeQuery, ground_control_1.QueryResultType.TREE));
    }
    sheet(rawSheetQuery) {
        return observe_1.Observable.from(this.doSearch(rawSheetQuery, SheetQuery_1.SheetQuery, ground_control_1.QueryResultType.SHEET));
    }
    field(rawFieldQuery) {
        return observe_1.Observable.from(this.doSearch(rawFieldQuery, FieldQuery_1.FieldQuery, ground_control_1.QueryResultType.FIELD));
    }
    async doSearch(rawNonEntityQuery, QueryClass, queryResultType) {
        const [entityUtils, dbFacade] = await di_1.DI.get(diTokens_1.ENTITY_UTILS, diTokens_1.ENTITY_MANAGER);
        const rawQuery = entityUtils.getQuery(rawNonEntityQuery);
        const query = new QueryClass(rawQuery);
        return dbFacade.entity.search(null, query, queryResultType);
    }
}
exports.NonEntitySearch = NonEntitySearch;
//# sourceMappingURL=NonEntitySearch.js.map