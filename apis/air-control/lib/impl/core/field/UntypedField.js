import { JSONClauseObjectType, SQLDataType } from '@airport/ground-control';
import { UntypedOperation } from '../operation/UntypedOperation';
import { QOperableField } from './OperableField';
export class QUntypedField extends QOperableField {
    constructor(dbColumn, dbProperty, q, objectType = JSONClauseObjectType.FIELD) {
        super(dbColumn, dbProperty, q, objectType, new UntypedOperation());
    }
    getInstance(qEntity = this.q) {
        return this.copyFunctions(new QUntypedField(this.dbColumn, this.dbProperty, qEntity, this.objectType));
    }
    like(value) {
        if (value instanceof Function) {
            value = value();
        }
        return this.operation.like(this, value);
    }
}
export class QUntypedFunction extends QUntypedField {
    constructor(value, isQueryParameter = false) {
        super({ type: SQLDataType.ANY }, null, null, JSONClauseObjectType.FIELD_FUNCTION);
        this.value = value;
        this.isQueryParameter = isQueryParameter;
    }
    getInstance() {
        return this.copyFunctions(new QUntypedFunction(this.value));
    }
    toJSON(columnAliases, forSelectClause, queryUtils, fieldUtils) {
        let json = this.operableFunctionToJson(this, columnAliases, forSelectClause, queryUtils, fieldUtils);
        if (this.isQueryParameter) {
            this.parameterAlias = json.v;
        }
        return json;
    }
}
//# sourceMappingURL=UntypedField.js.map