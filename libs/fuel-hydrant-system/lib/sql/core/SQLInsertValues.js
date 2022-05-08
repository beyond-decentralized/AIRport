import { SQLNoJoinQuery } from './SQLNoJoinQuery';
import { ClauseType } from './SQLWhereBase';
/**
 * Created by Papa on 11/17/2016.
 */
export class SQLInsertValues extends SQLNoJoinQuery {
    constructor(jsonInsertValues, dialect, airportDatabase, applicationUtils, entityStateManager, qMetadataUtils, qValidator, relationManager, sqlQueryAdapter, storeDriver, subStatementSqlGenerator, utils, context
    // repository?: IRepository
    ) {
        super(airportDatabase.applications[jsonInsertValues.II.si].currentVersion[0]
            .applicationVersion.entities[jsonInsertValues.II.ti], dialect, airportDatabase, applicationUtils, entityStateManager, qMetadataUtils, qValidator, relationManager, sqlQueryAdapter, storeDriver, subStatementSqlGenerator, utils, context);
        this.jsonInsertValues = jsonInsertValues;
    }
    toSQL(context) {
        if (!this.jsonInsertValues.II) {
            throw new Error(`Expecting exactly one table in INSERT INTO clause`);
        }
        this.qValidator.validateInsertQEntity(this.dbEntity);
        let tableFragment = this.getTableFragment(this.jsonInsertValues.II, context, false);
        let columnsFragment = this.getColumnsFragment(this.dbEntity, this.jsonInsertValues.C);
        let valuesFragment = this.getValuesFragment(this.jsonInsertValues.V, context);
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
    getValuesFragment(valuesClauseFragment, context) {
        let allValuesFragment = valuesClauseFragment.map((valuesArray) => {
            let valuesFragment = valuesArray.map((value) => {
                if (value === null || ['number', 'string'].indexOf(typeof value) > -1) {
                    this.parameterReferences.push(value);
                    return this.sqlQueryAdapter.getParameterReference(this.parameterReferences, value);
                }
                else if (value === undefined) {
                    throw new Error(`An 'undefined' value was provided when inserting into: ${this.dbEntity.applicationVersion.application.name}.${this.dbEntity.name}`);
                }
                else {
                    const fieldValue = this.getFieldValue(value, ClauseType.WHERE_CLAUSE, null, context);
                    return `\n${fieldValue}\n`;
                }
            });
            return `(${valuesFragment.join(',')})`;
        });
        return allValuesFragment.join(',\n');
    }
}
//# sourceMappingURL=SQLInsertValues.js.map