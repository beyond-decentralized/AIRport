import { wrapPrimitive } from '../../core/field/WrapperFunctions';
import { AbstractUpdate } from './AbstractUpdate';
export class UpdateColumns extends AbstractUpdate {
    constructor(rawUpdate) {
        super(rawUpdate);
    }
    setToJSON(set, queryUtils, fieldUtils, relationManager) {
        const setClause = {};
        const dbEntity = this.rawUpdate.UPDATE
            .__driver__.dbEntity;
        const dbColumnMap = dbEntity.columnMap;
        const idDbColumnMap = dbEntity.idColumnMap;
        for (const columnName in set) {
            let value = set[columnName];
            if (value === undefined) {
                delete set[columnName];
                continue;
            }
            if (!dbColumnMap[columnName]) {
                throw new Error(`
	Unknown column: '${columnName}' for entity: '${dbEntity.name}'
			(table: '${dbEntity.tableConfig.name}').
				`);
            }
            if (idDbColumnMap[columnName]) {
                throw new Error(`
	Cannot update @Id columns:
	Column: '${columnName}' for entity: '${dbEntity.name}'
			(table: '${dbEntity.tableConfig.name}').
				`);
            }
            value = wrapPrimitive(value);
            if (!value.toJSON) {
                throw `Unexpected value ${JSON.stringify(value)} for property ${columnName} of entity ${dbEntity.name}`;
            }
            setClause[columnName] = value.toJSON(this.columnAliases, false, queryUtils, fieldUtils, relationManager);
        }
        return setClause;
    }
}
//# sourceMappingURL=UpdateColumns.js.map