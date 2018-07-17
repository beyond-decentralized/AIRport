import { JSONClauseObjectType, SQLDataType } from "@airport/ground-control";
import { NumberOperation } from "../operation/NumberOperation";
import { QOperableField } from "./OperableField";
export class QNumberField extends QOperableField {
    constructor(dbColumn, dbProperty, q, utils, objectType = JSONClauseObjectType.FIELD) {
        super(dbColumn, dbProperty, q, objectType, new NumberOperation(), utils);
    }
    getInstance(qEntity = this.q) {
        return this.copyFunctions(new QNumberField(this.dbColumn, this.dbProperty, qEntity, this.utils, this.objectType));
    }
}
export class QNumberFunction extends QNumberField {
    constructor(value, utils, isQueryParameter = false) {
        super({ type: SQLDataType.NUMBER }, null, null, utils, JSONClauseObjectType.FIELD_FUNCTION);
        this.value = value;
        this.isQueryParameter = isQueryParameter;
    }
    getInstance() {
        return this.copyFunctions(new QNumberFunction(this.value, this.utils));
    }
    toJSON(columnAliases, forSelectClause) {
        let json = this.operableFunctionToJson(this, columnAliases, forSelectClause);
        if (this.isQueryParameter) {
            this.parameterAlias = json.v;
        }
        return json;
    }
}
//# sourceMappingURL=NumberField.js.map