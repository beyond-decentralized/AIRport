import { JSONClauseObjectType } from "@airport/ground-control";
import { QField } from "./Field";
/**
 * Created by Papa on 11/29/2016.
 */
export class QNullFunction extends QField {
    constructor(utils) {
        super(null, null, null, JSONClauseObjectType.FIELD_FUNCTION, utils);
        this.value = null;
    }
    getInstance() {
        return this.copyFunctions(new QNullFunction(this.utils));
    }
    toJSON(columnAliases, forSelectClause) {
        return this.operableFunctionToJson(this, columnAliases, forSelectClause);
    }
}
//# sourceMappingURL=NullFunction.js.map