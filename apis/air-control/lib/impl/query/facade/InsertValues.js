import { AbstractInsertValues } from './AbstractInsertValues';
/**
 * Created by Papa on 11/17/2016.
 */
// FIXME: add support for a full blown INSERT VALUES, with expression support for VALUES
export class InsertValues extends AbstractInsertValues {
    toJSON(queryUtils, fieldUtils) {
        const driver = this.rawInsertValues.insertInto
            .__driver__;
        const insertInto = driver.getRelationJson(this.columnAliases, queryUtils, fieldUtils);
        const dbColumns = [];
        const columnIndexes = this.columnIndexes ? this.columnIndexes : this.rawInsertValues.columns.map(column => {
            const dbColumn = column.dbColumn;
            this.validateColumn(dbColumn, driver.dbEntity);
            dbColumns.push(dbColumn);
            return dbColumn.index;
        });
        return {
            II: insertInto,
            C: columnIndexes,
            V: this.valuesToJSON(this.rawInsertValues.values, dbColumns, queryUtils, fieldUtils)
        };
    }
}
//# sourceMappingURL=InsertValues.js.map