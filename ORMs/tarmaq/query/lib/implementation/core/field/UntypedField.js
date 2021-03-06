import { JSONClauseObjectType, } from '@airport/ground-control';
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
        return this.operation.LIKE(this, value);
    }
}
export class QUntypedFunction extends QUntypedField {
    constructor(value, isQueryParameter = false) {
        // super(<any>{type: SQLDataType.ANY}, null, null, JSONClauseObjectType.FIELD_FUNCTION)
        super({ type: null }, null, null, JSONClauseObjectType.FIELD_FUNCTION);
        this.value = value;
        this.isQueryParameter = isQueryParameter;
        throw new Error(`Untyped data type is not supported`);
    }
    getInstance() {
        return this.copyFunctions(new QUntypedFunction(this.value));
    }
    toJSON(columnAliases, forSelectClause, queryUtils, fieldUtils, relationManager) {
        let json = this.operableFunctionToJson(this, columnAliases, forSelectClause, queryUtils, fieldUtils, relationManager);
        if (this.isQueryParameter) {
            this.parameterAlias = json.v;
        }
        return json;
    }
}
//# sourceMappingURL=UntypedField.js.map