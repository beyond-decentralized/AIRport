import { JSONClauseObjectType } from '@airport/ground-control';
import { QField } from './Field';
/**
 * Created by Papa on 11/29/2016.
 */
export class QNullFunction extends QField {
    constructor() {
        super(null, null, null, JSONClauseObjectType.FIELD_FUNCTION);
        this.value = null;
    }
    getInstance() {
        return this.copyFunctions(new QNullFunction());
    }
    toJSON(columnAliases, forSelectClause, queryUtils, fieldUtils) {
        return this.operableFunctionToJson(this, columnAliases, forSelectClause, queryUtils, fieldUtils);
    }
}
//# sourceMappingURL=NullFunction.js.map