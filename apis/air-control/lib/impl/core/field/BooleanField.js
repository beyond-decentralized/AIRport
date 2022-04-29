import { JSONClauseObjectType, SQLDataType } from '@airport/ground-control';
import { BooleanOperation } from '../operation/BooleanOperation';
import { QOperableField } from './OperableField';
export class QBooleanField extends QOperableField {
    constructor(dbColumn, dbProperty, q, objectType = JSONClauseObjectType.FIELD) {
        super(dbColumn, dbProperty, q, objectType, new BooleanOperation());
    }
    getInstance(qEntity = this.q) {
        return this.copyFunctions(new QBooleanField(this.dbColumn, this.dbProperty, qEntity, this.objectType));
    }
}
export class QBooleanFunction extends QBooleanField {
    constructor(value, isQueryParameter = false) {
        super({ type: SQLDataType.BOOLEAN }, null, null, JSONClauseObjectType.FIELD_FUNCTION);
        this.value = value;
        this.isQueryParameter = isQueryParameter;
    }
    getInstance() {
        return this.copyFunctions(new QBooleanFunction(this.value));
    }
    toJSON(columnAliases, forSelectClause, queryUtils, fieldUtils, relationManager) {
        let json = this.operableFunctionToJson(this, columnAliases, forSelectClause, queryUtils, fieldUtils, relationManager);
        if (this.isQueryParameter) {
            this.parameterAlias = json.v;
        }
        return json;
    }
}
//# sourceMappingURL=BooleanField.js.map