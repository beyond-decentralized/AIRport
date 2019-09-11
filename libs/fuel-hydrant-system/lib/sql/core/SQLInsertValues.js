"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SQLNoJoinQuery_1 = require("./SQLNoJoinQuery");
const SQLWhereBase_1 = require("./SQLWhereBase");
/**
 * Created by Papa on 11/17/2016.
 */
class SQLInsertValues extends SQLNoJoinQuery_1.SQLNoJoinQuery {
    constructor(airportDb, utils, jsonInsertValues, dialect) {
        super(airportDb, utils, airportDb.schemas[jsonInsertValues.II.si]
            .currentVersion.entities[jsonInsertValues.II.ti], dialect);
        this.jsonInsertValues = jsonInsertValues;
    }
    toSQL() {
        if (!this.jsonInsertValues.II) {
            throw `Expecting exactly one table in INSERT INTO clause`;
        }
        this.validator.validateInsertQEntity(this.dbEntity);
        let tableFragment = this.getTableFragment(this.jsonInsertValues.II);
        let columnsFragment = this.getColumnsFragment(this.dbEntity, this.jsonInsertValues.C);
        let valuesFragment = this.getValuesFragment(this.jsonInsertValues.V);
        return `INSERT INTO
${tableFragment} ${columnsFragment}
VALUES
${valuesFragment}
`;
    }
    getColumnsFragment(dbEntity, columns) {
        if (!columns.length) {
            return '';
        }
        const columnNames = columns.map(columnIndex => dbEntity.columns[columnIndex].name);
        return `( ${columnNames.join(', \n')} )`;
    }
    getValuesFragment(valuesClauseFragment) {
        let allValuesFragment = valuesClauseFragment.map((valuesArray) => {
            let valuesFragment = valuesArray.map((value) => {
                if (value === null || ['number', 'string'].indexOf(typeof value) > -1) {
                    this.parameterReferences.push(value);
                    return this.sqlAdaptor.getParameterReference(this.parameterReferences, value);
                }
                else {
                    return `\n${this.getFieldValue(value, SQLWhereBase_1.ClauseType.WHERE_CLAUSE)}\n`;
                }
            });
            return `(${valuesFragment.join(',')})`;
        });
        return allValuesFragment.join(',\n');
    }
}
exports.SQLInsertValues = SQLInsertValues;
//# sourceMappingURL=SQLInsertValues.js.map