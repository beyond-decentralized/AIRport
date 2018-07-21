"use strict";
/**
 * Created by Papa on 8/31/2016.
 */
Object.defineProperty(exports, "__esModule", { value: true });
class DDLManager {
    static getCreateDDL() {
        let createQueries = [];
        throw `Implement!`;
        // let tableName = MetadataUtils.getTableName(entityMetadata, QMetadataUtils.getEntityName(qEntity));
        // let createTableStatement = `CREATE TABLE IF NOT EXISTS ${tableName} (${columnNames.join(' , ')})`;
        //
        // return createTableStatement;
    }
    static getColumnIndexByColumnName(globalTableIndex, columnName) {
        throw `Not Implemented`;
    }
    static getRelationIndex(applicationName, entityName, propertyName) {
        throw `Not Implemented`;
    }
    static getRelationGlobalTableIndex() {
        throw `Not Implemented`;
    }
    static getGlobalTableIndex(applicationName, entityName) {
        throw `Not Implemented`;
    }
    static warn(message) {
        console.log(message);
    }
}
exports.DDLManager = DDLManager;
//# sourceMappingURL=DDLManager.js.map