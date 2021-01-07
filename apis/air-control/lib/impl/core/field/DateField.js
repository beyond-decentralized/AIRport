import { JSONClauseObjectType, SQLDataType } from '@airport/ground-control';
import { DateOperation } from '../operation/DateOperation';
import { QOperableField } from './OperableField';
export class QDateField extends QOperableField {
    constructor(dbColumn, dbProperty, q, objectType = JSONClauseObjectType.FIELD) {
        super(dbColumn, dbProperty, q, objectType, new DateOperation());
    }
    getInstance(qEntity = this.q) {
        return this.copyFunctions(new QDateField(this.dbColumn, this.dbProperty, qEntity, this.objectType));
    }
}
export class QDateFunction extends QDateField {
    constructor(value, isQueryParameter = false) {
        super({ type: SQLDataType.DATE }, null, null, JSONClauseObjectType.FIELD_FUNCTION);
        this.value = value;
        this.isQueryParameter = isQueryParameter;
    }
    getInstance() {
        return this.copyFunctions(new QDateFunction(this.value, this.isQueryParameter));
    }
    toJSON(columnAliases, forSelectClause, queryUtils, fieldUtils) {
        let json = this.operableFunctionToJson(this, columnAliases, forSelectClause, queryUtils, fieldUtils);
        if (this.isQueryParameter) {
            this.parameterAlias = json.v;
        }
        return json;
    }
}
export class QDateArrayFunction extends QDateFunction {
    constructor(value, isQueryParameter) {
        super(value, isQueryParameter);
        this.value = value;
    }
    getInstance() {
        return this.copyFunctions(new QDateArrayFunction(this.value, this.isQueryParameter));
    }
}
//# sourceMappingURL=DateField.js.map