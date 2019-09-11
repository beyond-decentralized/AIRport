"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const air_control_1 = require("@airport/air-control");
const ground_control_1 = require("@airport/ground-control");
const SQLNoJoinQuery_1 = require("./SQLNoJoinQuery");
const SQLWhereBase_1 = require("./SQLWhereBase");
/**
 * Created by Papa on 10/2/2016.
 */
class SQLUpdate extends SQLNoJoinQuery_1.SQLNoJoinQuery {
    constructor(airportDb, utils, jsonUpdate, dialect) {
        super(airportDb, utils, airportDb.schemas[jsonUpdate.U.si]
            .currentVersion.entities[jsonUpdate.U.ti], dialect);
        this.jsonUpdate = jsonUpdate;
    }
    toSQL() {
        if (!this.jsonUpdate.U) {
            throw `Expecting exactly one table in UPDATE clause`;
        }
        let updateFragment = this.getTableFragment(this.jsonUpdate.U);
        let setFragment = this.getSetFragment(this.jsonUpdate.S);
        let whereFragment = '';
        let jsonQuery = this.jsonUpdate;
        if (jsonQuery.W) {
            whereFragment = `WHERE
${this.getWHEREFragment(jsonQuery.W, '')}`;
            // Always replace the root entity alias reference with the table name
            let tableAlias = air_control_1.QRelation.getAlias(this.jsonUpdate.U);
            let tableName = this.utils.Schema.getTableName(this.qEntityMapByAlias[tableAlias].__driver__.dbEntity);
            whereFragment = whereFragment.replace(new RegExp(`${tableAlias}`, 'g'), tableName);
        }
        return `UPDATE
${updateFragment}
SET
${setFragment}
${whereFragment}`;
    }
    getSetFragment(setClauseFragment) {
        let setFragments = [];
        for (let columnName in setClauseFragment) {
            let value = setClauseFragment[columnName];
            // Skip undefined values
            if (value === undefined) {
                continue;
            }
            this.validator.validateUpdateColumn(this.dbEntity.columnMap[columnName]);
            this.addSetFragment(columnName, value, setFragments);
        }
        return setFragments.join(', \n');
    }
    addSetFragment(columnName, value, setFragments) {
        let fieldValue;
        if (typeof value === 'number') {
            this.parameterReferences.push(value);
            fieldValue = this.sqlAdaptor.getParameterReference(this.parameterReferences, value);
        }
        else {
            fieldValue = this.getFieldValue(value, SQLWhereBase_1.ClauseType.WHERE_CLAUSE);
        }
        setFragments.push(`\t${columnName} = ${fieldValue}`);
    }
    isManyToOneRelation(value) {
        return typeof value === 'object'
            && value.ot === ground_control_1.JSONClauseObjectType.MANY_TO_ONE_RELATION;
    }
    addManyToOneMappings(parentMapping) {
        let mappings = [];
        const value = parentMapping.value;
        if (typeof value === 'object' &&
            (!value.ot
                || value.ot === ground_control_1.JSONClauseObjectType.MANY_TO_ONE_RELATION)) {
            for (const key in value) {
                if (key === 'ot'
                    && value[key] === ground_control_1.JSONClauseObjectType.MANY_TO_ONE_RELATION) {
                    continue;
                }
                const mapping = {
                    tableIndex: parentMapping.tableIndex,
                    propertyChain: parentMapping.propertyChain.concat([key]),
                    value: value[key]
                };
                const childMappings = this.addManyToOneMappings(mapping);
                mappings = mappings.concat(childMappings);
            }
        }
        else {
            mappings.push(parentMapping);
        }
        return mappings;
    }
}
exports.SQLUpdate = SQLUpdate;
//# sourceMappingURL=SQLUpdate.js.map