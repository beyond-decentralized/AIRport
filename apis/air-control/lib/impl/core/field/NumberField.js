import { JSONClauseObjectType, SQLDataType } from '@airport/ground-control';
import { NumberOperation } from '../operation/NumberOperation';
import { QOperableField } from './OperableField';
export class QNumberField extends QOperableField {
    constructor(dbColumn, dbProperty, q, objectType = JSONClauseObjectType.FIELD) {
        super(dbColumn, dbProperty, q, objectType, new NumberOperation());
    }
    getInstance(qEntity = this.q) {
        return this.copyFunctions(new QNumberField(this.dbColumn, this.dbProperty, qEntity, this.objectType));
    }
}
export class QNumberFunction extends QNumberField {
    constructor(value, isQueryParameter = false) {
        super({ type: SQLDataType.NUMBER }, null, null, JSONClauseObjectType.FIELD_FUNCTION);
        this.value = value;
        this.isQueryParameter = isQueryParameter;
    }
    getInstance() {
        return this.copyFunctions(new QNumberFunction(this.value));
    }
    toJSON(columnAliases, forSelectClause, queryUtils, fieldUtils) {
        let json = this.operableFunctionToJson(this, columnAliases, forSelectClause, queryUtils, fieldUtils);
        if (this.isQueryParameter) {
            this.parameterAlias = json.v;
        }
        return json;
    }
}
//# sourceMappingURL=NumberField.js.map