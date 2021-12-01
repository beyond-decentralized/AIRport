import { QField } from '../../core/field/Field';
import { getPrimitiveValue } from '../../core/field/WrapperFunctions';
import { AbstractQuery } from './AbstractQuery';
/**
 * Created by Papa on 11/17/2016.
 */
// FIXME: add support for a full blown INSERT VALUES, with expression support for VALUES
export class AbstractInsertValues extends AbstractQuery {
    constructor(rawInsertValues, columnIndexes) {
        super();
        this.rawInsertValues = rawInsertValues;
        this.columnIndexes = columnIndexes;
    }
    validateColumn(dbColumn, dbEntity, columnName) {
        if (!dbColumn) {
            throw new Error(`
		Could not find column ${columnName} in entity: ${dbEntity.name}
				(table: ${dbEntity.tableConfig.name})
						`);
        }
        if (dbColumn.entity.applicationVersion.application.index !==
            dbEntity.applicationVersion.application.index
            || dbColumn.entity.index !== dbEntity.index) {
            const columnApplication = dbColumn.entity.applicationVersion.application;
            const entityApplication = dbEntity.applicationVersion.application;
            throw new Error(`Unexpected entity for column ${dbColumn.name}.
			Expecting:
				Domain: ${entityApplication.domain.name}
				Application: ${entityApplication.name}
				Entity: ${dbEntity.name}
			Found:
				Domain: ${columnApplication.domain.name}
				Application: ${columnApplication.name}
				Entity: ${dbColumn.entity.name}`);
        }
    }
    valuesToJSON(valueSets, dbColumns, queryUtils, fieldUtils) {
        // let currentValueIndex = -1;
        // this.values           = [];
        return valueSets.map((valueSet, rowIndex) => {
            return valueSet.map((value, columnIndex) => {
                if (value === undefined) {
                    throw new Error(`Cannot use 'undefined' in VALUES clause.`);
                }
                if (!(value instanceof QField)) {
                    return getPrimitiveValue(value, dbColumns[columnIndex], rowIndex);
                    // this.values.push(getPrimitiveValue(value));
                    // return ++currentValueIndex;
                }
                else {
                    return value.toJSON(this.columnAliases, false, queryUtils, fieldUtils);
                }
            });
        });
    }
}
//# sourceMappingURL=AbstractInsertValues.js.map