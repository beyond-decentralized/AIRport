import { JSONClauseObjectType, SQLDataType } from "@airport/ground-control";
import { UntypedOperation } from "../operation/UntypedOperation";
import { QOperableField } from "./OperableField";
export class QUntypedField extends QOperableField {
    constructor(dbColumn, dbProperty, q, utils, objectType = JSONClauseObjectType.FIELD) {
        super(dbColumn, dbProperty, q, objectType, new UntypedOperation(), utils);
    }
    getInstance(qEntity = this.q) {
        return this.copyFunctions(new QUntypedField(this.dbColumn, this.dbProperty, qEntity, this.utils, this.objectType));
    }
    like(value) {
        if (value instanceof Function) {
            value = value();
        }
        return this.operation.like(this, value);
    }
}
export class QUntypedFunction extends QUntypedField {
    constructor(value, utils, isQueryParameter = false) {
        super({ type: SQLDataType.ANY }, null, null, utils, JSONClauseObjectType.FIELD_FUNCTION);
        this.value = value;
        this.isQueryParameter = isQueryParameter;
    }
    getInstance() {
        return this.copyFunctions(new QUntypedFunction(this.value, this.utils));
    }
    toJSON(columnAliases, forSelectClause) {
        let json = this.operableFunctionToJson(this, columnAliases, forSelectClause);
        if (this.isQueryParameter) {
            this.parameterAlias = json.v;
        }
        return json;
    }
}
//# sourceMappingURL=UntypedField.js.map