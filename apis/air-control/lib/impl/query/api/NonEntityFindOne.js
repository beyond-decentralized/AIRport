"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ground_control_1 = require("@airport/ground-control");
const FieldQuery_1 = require("../facade/FieldQuery");
const SheetQuery_1 = require("../facade/SheetQuery");
const TreeQuery_1 = require("../facade/TreeQuery");
/**
 * Created by Papa on 11/12/2016.
 */
class NonEntityFindOne {
    constructor(dbFacade, utils) {
        this.dbFacade = dbFacade;
        this.utils = utils;
    }
    async tree(rawTreeQuery) {
        const treeQuery = new TreeQuery_1.TreeQuery(this.utils.Entity.getQuery(rawTreeQuery), this.utils);
        return await this.dbFacade.entity.findOne(null, treeQuery, ground_control_1.QueryResultType.TREE);
    }
    async sheet(rawSheetQuery) {
        const sheetQuery = new SheetQuery_1.SheetQuery(this.utils.Entity.getQuery(rawSheetQuery), this.utils);
        return await this.dbFacade.entity.findOne(null, sheetQuery, ground_control_1.QueryResultType.SHEET);
    }
    async field(rawFieldQuery) {
        const fieldQuery = new FieldQuery_1.FieldQuery(this.utils.Entity.getQuery(rawFieldQuery), this.utils);
        return await this.dbFacade.entity.findOne(null, fieldQuery, ground_control_1.QueryResultType.FIELD);
    }
}
exports.NonEntityFindOne = NonEntityFindOne;
//# sourceMappingURL=NonEntityFindOne.js.map