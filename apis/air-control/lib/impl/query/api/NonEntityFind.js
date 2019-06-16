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
class NonEntityFind {
    async tree(rawTreeQuery) {
        const [entityUtils, dbFacade] = await di_1.DI.get(diTokens_1.ENTITY_UTILS, diTokens_1.ENTITY_MANAGER);
        const rawQuery = entityUtils.getQuery(rawTreeQuery);
        const treeQuery = new TreeQuery_1.TreeQuery(rawQuery);
        return await dbFacade.entity.find(null, treeQuery, ground_control_1.QueryResultType.TREE);
    }
    async sheet(rawSheetQuery, cursorSize, callback) {
        if (cursorSize || callback) {
            throw `Implement!`;
        }
        const [entityUtils, dbFacade] = await di_1.DI.get(diTokens_1.ENTITY_UTILS, diTokens_1.ENTITY_MANAGER);
        const rawQuery = entityUtils.getQuery(rawSheetQuery);
        const sheetQuery = new SheetQuery_1.SheetQuery(rawQuery);
        return await dbFacade.entity.find(null, sheetQuery, ground_control_1.QueryResultType.SHEET);
    }
    async field(rawFieldQuery) {
        const [entityUtils, dbFacade] = await di_1.DI.get(diTokens_1.ENTITY_UTILS, diTokens_1.ENTITY_MANAGER);
        const rawQuery = entityUtils.getQuery(rawFieldQuery);
        const fieldQuery = new FieldQuery_1.FieldQuery(rawQuery);
        return await dbFacade.entity.find(null, fieldQuery, ground_control_1.QueryResultType.FIELD);
    }
}
exports.NonEntityFind = NonEntityFind;
//# sourceMappingURL=NonEntityFind.js.map