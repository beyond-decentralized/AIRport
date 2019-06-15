"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ground_control_1 = require("@airport/ground-control");
const Aliases_1 = require("../../core/entity/Aliases");
const BooleanField_1 = require("../../core/field/BooleanField");
const DateField_1 = require("../../core/field/DateField");
const Field_1 = require("../../core/field/Field");
const Functions_1 = require("../../core/field/Functions");
const NumberField_1 = require("../../core/field/NumberField");
const StringField_1 = require("../../core/field/StringField");
const UntypedField_1 = require("../../core/field/UntypedField");
const NonEntityQuery_1 = require("./NonEntityQuery");
/**
 * Created by Papa on 10/24/2016.
 */
class FieldQuery extends NonEntityQuery_1.DistinguishableQuery {
    // private qEntityMap: {[entityName: string]: QEntity<any>},
    //	private entitiesRelationPropertyMap: {[entityName: string]: {[propertyName: string]:
    // EntityRelationRecord}},
    //		private entitiesPropertyTypeMap: {[entityName: string]: {[propertyName: string]:
    // boolean}}
    constructor(rawQuery, entityAliases = new Aliases_1.EntityAliases()) {
        super(entityAliases);
        this.rawQuery = rawQuery;
    }
    nonDistinctSelectClauseToJSON(rawSelect, queryUtils, fieldUtils) {
        if (!(this.rawQuery.select instanceof Field_1.QField)) {
            throw NonEntityQuery_1.NON_ENTITY_SELECT_ERROR_MESSAGE;
        }
        this.columnAliases.entityAliases.getNextAlias(this.rawQuery.select.q.__driver__.getRootJoinEntity());
        return this.rawQuery.select.toJSON(this.columnAliases, true, queryUtils, fieldUtils);
    }
    toJSON(queryUtils, fieldUtils) {
        let select = this.selectClauseToJSON(this.rawQuery.select, queryUtils, fieldUtils);
        let jsonFieldQuery = {
            S: select,
            ot: ground_control_1.JSONClauseObjectType.FIELD_QUERY,
            dt: this.getClauseDataType()
        };
        return this.getNonEntityQuery(this.rawQuery, jsonFieldQuery, null, queryUtils, fieldUtils);
    }
    getClauseDataType() {
        let selectField = this.rawQuery.select;
        if (selectField instanceof Functions_1.QDistinctFunction) {
            selectField = selectField.getSelectClause();
        }
        if (selectField instanceof BooleanField_1.QBooleanField) {
            return ground_control_1.SQLDataType.BOOLEAN;
        }
        else if (selectField instanceof DateField_1.QDateField) {
            return ground_control_1.SQLDataType.DATE;
        }
        else if (selectField instanceof NumberField_1.QNumberField) {
            return ground_control_1.SQLDataType.NUMBER;
        }
        else if (selectField instanceof StringField_1.QStringField) {
            return ground_control_1.SQLDataType.STRING;
        }
        else if (selectField instanceof UntypedField_1.QUntypedField) {
            return ground_control_1.SQLDataType.ANY;
        }
        else {
            throw `Unsupported type of select field in Field Query`;
        }
    }
}
exports.FieldQuery = FieldQuery;
//# sourceMappingURL=FieldQuery.js.map