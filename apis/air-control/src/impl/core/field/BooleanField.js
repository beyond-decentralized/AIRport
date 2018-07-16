import { JSONClauseObjectType, SQLDataType } from "@airport/ground-control";
import { BooleanOperation } from "../operation/BooleanOperation";
import { QOperableField } from "./OperableField";
export class QBooleanField extends QOperableField {
    constructor(dbColumn, dbProperty, q, utils, objectType = JSONClauseObjectType.FIELD) {
        super(dbColumn, dbProperty, q, objectType, new BooleanOperation(), utils);
    }
    getInstance(qEntity = this.q) {
        return this.copyFunctions(new QBooleanField(this.dbColumn, this.dbProperty, qEntity, this.utils, this.objectType));
    }
}
export class QBooleanFunction extends QBooleanField {
    constructor(value, utils, isQueryParameter = false) {
        super({ type: SQLDataType.BOOLEAN }, null, null, utils, JSONClauseObjectType.FIELD_FUNCTION);
        this.value = value;
        this.isQueryParameter = isQueryParameter;
    }
    getInstance() {
        return this.copyFunctions(new QBooleanFunction(this.value, this.utils));
    }
    toJSON(columnAliases, forSelectClause) {
        let json = this.operableFunctionToJson(this, columnAliases, forSelectClause);
        if (this.isQueryParameter) {
            this.parameterAlias = json.v;
        }
        return json;
    }
}
//# sourceMappingURL=BooleanField.js.map