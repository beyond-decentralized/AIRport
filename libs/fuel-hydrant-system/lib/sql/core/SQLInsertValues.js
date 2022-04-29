import { DEPENDENCY_INJECTION } from '@airport/direction-indicator';
import { Q_VALIDATOR, SQL_QUERY_ADAPTOR } from '../../tokens';
import { SQLNoJoinQuery } from './SQLNoJoinQuery';
import { ClauseType } from './SQLWhereBase';
/**
 * Created by Papa on 11/17/2016.
 */
export class SQLInsertValues extends SQLNoJoinQuery {
    constructor(jsonInsertValues, dialect, context
    // repository?: IRepository
    ) {
        super(context.ioc.airDb.applications[jsonInsertValues.II.si].currentVersion[0]
            .applicationVersion.entities[jsonInsertValues.II.ti], dialect, context);
        this.jsonInsertValues = jsonInsertValues;
    }
    toSQL(context) {
        const validator = DEPENDENCY_INJECTION.db()
            .getSync(Q_VALIDATOR);
        if (!this.jsonInsertValues.II) {
            throw new Error(`Expecting exactly one table in INSERT INTO clause`);
        }
        validator.validateInsertQEntity(this.dbEntity);
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
        const sqlAdaptor = DEPENDENCY_INJECTION.db()
            .getSync(SQL_QUERY_ADAPTOR);
        let allValuesFragment = valuesClauseFragment.map((valuesArray) => {
            let valuesFragment = valuesArray.map((value) => {
                if (value === null || ['number', 'string'].indexOf(typeof value) > -1) {
                    this.parameterReferences.push(value);
                    return sqlAdaptor.getParameterReference(this.parameterReferences, value);
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