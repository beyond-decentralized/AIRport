import { JSONClauseObjectType, SQLDataType } from "@airport/ground-control";
import { DateOperation } from "../operation/DateOperation";
import { QOperableField } from "./OperableField";
export class QDateField extends QOperableField {
    constructor(dbColumn, dbProperty, q, utils, objectType = JSONClauseObjectType.FIELD) {
        super(dbColumn, dbProperty, q, objectType, new DateOperation(), utils);
    }
    getInstance(qEntity = this.q) {
        return this.copyFunctions(new QDateField(this.dbColumn, this.dbProperty, qEntity, this.utils, this.objectType));
    }
}
export class QDateFunction extends QDateField {
    constructor(value, utils, isQueryParameter = false) {
        super({ type: SQLDataType.DATE }, null, null, utils, JSONClauseObjectType.FIELD_FUNCTION);
        this.value = value;
        this.isQueryParameter = isQueryParameter;
    }
    getInstance() {
        return this.copyFunctions(new QDateFunction(this.value, this.utils));
    }
    toJSON(columnAliases, forSelectClause) {
        let json = this.operableFunctionToJson(this, columnAliases, forSelectClause);
        if (this.isQueryParameter) {
            this.parameterAlias = json.v;
        }
        return json;
    }
}
//# sourceMappingURL=DateField.js.map