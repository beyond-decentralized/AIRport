import { AbstractInsertValues } from './AbstractInsertValues';
// FIXME: add support for a full blown INSERT VALUES, with expression support for VALUES
export class InsertColumnValues extends AbstractInsertValues {
    toJSON(queryUtils, fieldUtils, relationManager) {
        const entityDriver = this.rawInsertValues.insertInto.__driver__;
        const insertInto = entityDriver.getRelationJson(this.columnAliases, queryUtils, fieldUtils, relationManager);
        const columnMap = entityDriver.dbEntity.columnMap;
        const dbColumns = [];
        const columnIndexes = this.columnIndexes ? this.columnIndexes : this.rawInsertValues.columns.map((columnName) => {
            const dbColumn = columnMap[columnName];
            this.validateColumn(dbColumn, entityDriver.dbEntity, columnName);
            dbColumns.push(dbColumn);
            return dbColumn.index;
        });
        return {
            II: insertInto,
            C: columnIndexes,
            V: this.valuesToJSON(this.rawInsertValues.values, dbColumns, queryUtils, fieldUtils, relationManager)
        };
    }
}
//# sourceMappingURL=InsertColumnValues.js.map