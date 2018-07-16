import { QueryResultType } from "@airport/ground-control";
import { FieldQuery } from "../facade/FieldQuery";
import { SheetQuery } from "../facade/SheetQuery";
import { TreeQuery } from "../facade/TreeQuery";
/**
 * Created by Papa on 11/12/2016.
 */
export class NonEntitySearch {
    constructor(dbFacade, utils) {
        this.dbFacade = dbFacade;
        this.utils = utils;
    }
    tree(rawTreeQuery) {
        const treeQuery = new TreeQuery(this.utils.Entity.getQuery(rawTreeQuery), this.utils);
        return this.dbFacade.entity.search(null, treeQuery, QueryResultType.TREE);
    }
    sheet(rawSheetQuery) {
        const sheetQuery = new SheetQuery(this.utils.Entity.getQuery(rawSheetQuery), this.utils);
        return this.dbFacade.entity.search(null, sheetQuery, QueryResultType.SHEET);
    }
    field(rawFieldQuery) {
        const fieldQuery = new FieldQuery(this.utils.Entity.getQuery(rawFieldQuery), this.utils);
        return this.dbFacade.entity.search(null, fieldQuery, QueryResultType.FIELD);
    }
}
//# sourceMappingURL=NonEntitySearch.js.map