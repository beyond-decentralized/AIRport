import { JSONClauseObjectType, SQLDataType } from "@airport/ground-control";
import { StringOperation } from "../operation/StringOperation";
import { QOperableField } from "./OperableField";
export class QStringField extends QOperableField {
    constructor(dbColumn, dbProperty, q, utils, objectType = JSONClauseObjectType.FIELD) {
        super(dbColumn, dbProperty, q, objectType, new StringOperation(), utils);
    }
    getInstance(qEntity = this.q) {
        return this.copyFunctions(new QStringField(this.dbColumn, this.dbProperty, qEntity, this.utils, this.objectType));
    }
    like(value) {
        if (value instanceof Function) {
            value = value();
        }
        return this.operation.like(this, value);
    }
}
export class QStringFunction extends QStringField {
    constructor(value, utils, isQueryParameter = false) {
        super({ type: SQLDataType.STRING }, null, null, utils, JSONClauseObjectType.FIELD_FUNCTION);
        this.value = value;
        this.isQueryParameter = isQueryParameter;
    }
    getInstance() {
        return this.copyFunctions(new QStringFunction(this.value, this.utils));
    }
    toJSON(columnAliases, forSelectClause) {
        let json = this.operableFunctionToJson(this, columnAliases, forSelectClause);
        if (this.isQueryParameter) {
            this.parameterAlias = json.v;
        }
        return json;
    }
}
//# sourceMappingURL=StringField.js.map