import { QueryResultType } from "@airport/ground-control";
import { FieldQuery } from "../facade/FieldQuery";
import { SheetQuery } from "../facade/SheetQuery";
import { TreeQuery } from "../facade/TreeQuery";
/**
 * Created by Papa on 11/12/2016.
 */
export class NonEntityFind {
    constructor(dbFacade, utils) {
        this.dbFacade = dbFacade;
        this.utils = utils;
    }
    async tree(rawTreeQuery) {
        const treeQuery = new TreeQuery(this.utils.Entity.getQuery(rawTreeQuery), this.utils);
        return await this.dbFacade.entity.find(null, treeQuery, QueryResultType.TREE);
    }
    async sheet(rawSheetQuery, cursorSize, callback) {
        if (cursorSize || callback) {
            throw `Implement!`;
        }
        const sheetQuery = new SheetQuery(this.utils.Entity.getQuery(rawSheetQuery), this.utils);
        return await this.dbFacade.entity.find(null, sheetQuery, QueryResultType.SHEET);
    }
    async field(rawFieldQuery) {
        const fieldQuery = new FieldQuery(this.utils.Entity.getQuery(rawFieldQuery), this.utils);
        return await this.dbFacade.entity.find(null, fieldQuery, QueryResultType.FIELD);
    }
}
//# sourceMappingURL=NonEntityFind.js.map