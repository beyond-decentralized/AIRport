"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const di_1 = require("@airport/di");
const ground_control_1 = require("@airport/ground-control");
const diTokens_1 = require("../../../diTokens");
const FieldQuery_1 = require("../facade/FieldQuery");
const SheetQuery_1 = require("../facade/SheetQuery");
const TreeQuery_1 = require("../facade/TreeQuery");
/**
 * Created by Papa on 11/12/2016.
 */
class NonEntityFindOne {
    constructor(dbFacade) {
        this.dbFacade = dbFacade;
    }
    async tree(rawTreeQuery) {
        const rawQuery = (await di_1.DI.get(diTokens_1.ENTITY_UTILS)).getQuery(rawTreeQuery);
        const treeQuery = new TreeQuery_1.TreeQuery(rawQuery);
        return await this.dbFacade.entity.findOne(null, treeQuery, ground_control_1.QueryResultType.TREE);
    }
    async sheet(rawSheetQuery) {
        const rawQuery = (await di_1.DI.get(diTokens_1.ENTITY_UTILS)).getQuery(rawSheetQuery);
        const sheetQuery = new SheetQuery_1.SheetQuery(rawQuery);
        return await this.dbFacade.entity.findOne(null, sheetQuery, ground_control_1.QueryResultType.SHEET);
    }
    async field(rawFieldQuery) {
        const rawQuery = (await di_1.DI.get(diTokens_1.ENTITY_UTILS)).getQuery(rawFieldQuery);
        const fieldQuery = new FieldQuery_1.FieldQuery(rawQuery);
        return await this.dbFacade.entity.findOne(null, fieldQuery, ground_control_1.QueryResultType.FIELD);
    }
}
exports.NonEntityFindOne = NonEntityFindOne;
//# sourceMappingURL=NonEntityFindOne.js.map