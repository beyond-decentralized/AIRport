import { JSONClauseObjectType, SQLDataType } from '@airport/ground-control';
import { EntityAliases } from '../../core/entity/Aliases';
import { QBooleanField } from '../../core/field/BooleanField';
import { QDateField } from '../../core/field/DateField';
import { QField } from '../../core/field/Field';
import { QDistinctFunction } from '../../core/field/Functions';
import { QNumberField } from '../../core/field/NumberField';
import { QStringField } from '../../core/field/StringField';
import { QUntypedField } from '../../core/field/UntypedField';
import { DistinguishableQuery, NON_ENTITY_SELECT_ERROR_MESSAGE, } from './NonEntityQuery';
/**
 * Created by Papa on 10/24/2016.
 */
export class FieldQuery extends DistinguishableQuery {
    // private qEntityMap: {[entityName: string]: QEntity<any>},
    //	private entitiesRelationPropertyMap: {[entityName: string]: {[propertyName: string]:
    // EntityRelationRecord}},
    //		private entitiesPropertyTypeMap: {[entityName: string]: {[propertyName: string]:
    // boolean}}
    constructor(rawQuery, entityAliases = new EntityAliases()) {
        super(entityAliases);
        this.rawQuery = rawQuery;
    }
    nonDistinctSelectClauseToJSON(rawSelect, queryUtils, fieldUtils, relationManager) {
        if (!(this.rawQuery.select instanceof QField)) {
            throw new Error(NON_ENTITY_SELECT_ERROR_MESSAGE);
        }
        this.columnAliases.entityAliases.getNextAlias(this.rawQuery.select.q.__driver__.getRootJoinEntity());
        return this.rawQuery.select.toJSON(this.columnAliases, true, queryUtils, fieldUtils, relationManager);
    }
    toJSON(queryUtils, fieldUtils, relationManager) {
        let select = this.selectClauseToJSON(this.rawQuery.select, queryUtils, fieldUtils, relationManager);
        let jsonFieldQuery = {
            S: select,
            forUpdate: this.rawQuery.forUpdate,
            ot: JSONClauseObjectType.FIELD_QUERY,
            dt: this.getClauseDataType()
        };
        return this.getNonEntityQuery(this.rawQuery, jsonFieldQuery, null, queryUtils, fieldUtils, relationManager);
    }
    getClauseDataType() {
        let selectField = this.rawQuery.select;
        if (selectField instanceof QDistinctFunction) {
            selectField = selectField.getSelectClause();
        }
        if (selectField instanceof QBooleanField) {
            return SQLDataType.BOOLEAN;
        }
        else if (selectField instanceof QDateField) {
            return SQLDataType.DATE;
        }
        else if (selectField instanceof QNumberField) {
            return SQLDataType.NUMBER;
        }
        else if (selectField instanceof QStringField) {
            return SQLDataType.STRING;
        }
        else if (selectField instanceof QUntypedField) {
            return SQLDataType.ANY;
        }
        else {
            throw new Error(`Unsupported type of select field in Field Query`);
        }
    }
}
//# sourceMappingURL=FieldQuery.js.map