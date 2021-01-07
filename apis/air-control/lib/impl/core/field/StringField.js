import { JSONClauseObjectType, SQLDataType } from '@airport/ground-control';
import { StringOperation } from '../operation/StringOperation';
import { QOperableField } from './OperableField';
export class QStringField extends QOperableField {
    constructor(dbColumn, dbProperty, q, objectType = JSONClauseObjectType.FIELD) {
        super(dbColumn, dbProperty, q, objectType, new StringOperation());
    }
    getInstance(qEntity = this.q) {
        return this.copyFunctions(new QStringField(this.dbColumn, this.dbProperty, qEntity, this.objectType));
    }
    like(value) {
        if (value instanceof Function) {
            value = value();
        }
        return this.operation.like(this, value);
    }
}
export class QStringFunction extends QStringField {
    constructor(value, isQueryParameter = false) {
        super({ type: SQLDataType.STRING }, null, null, JSONClauseObjectType.FIELD_FUNCTION);
        this.value = value;
        this.isQueryParameter = isQueryParameter;
    }
    getInstance() {
        return this.copyFunctions(new QStringFunction(this.value, this.isQueryParameter));
    }
    toJSON(columnAliases, forSelectClause, queryUtils, fieldUtils) {
        let json = this.operableFunctionToJson(this, columnAliases, forSelectClause, queryUtils, fieldUtils);
        if (this.isQueryParameter) {
            this.parameterAlias = json.v;
        }
        return json;
    }
}
export class QStringArrayFunction extends QStringFunction {
    constructor(value, isQueryParameter) {
        super(value, isQueryParameter);
        this.value = value;
    }
    getInstance() {
        return this.copyFunctions(new QStringArrayFunction(this.value, this.isQueryParameter));
    }
}
//# sourceMappingURL=StringField.js.map