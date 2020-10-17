/**
 * Created by Papa on 8/31/2016.
 */
export class DDLManager {
    static getCreateDDL() {
        let createQueries = [];
        throw new Error(`Implement!`);
        // let tableName = MetadataUtils.getTableName(entityMetadata,
        // QMetadataUtils.getEntityName(qEntity)); let createTableStatement = `CREATE TABLE
        // IF NOT EXISTS ${tableName} (${columnNames.join(' , ')})`;  return
        // createTableStatement;
    }
    static getColumnIndexByColumnName(globalTableIndex, columnName) {
        throw new Error(`Not Implemented`);
    }
    static getRelationIndex(applicationName, entityName, propertyName) {
        throw new Error(`Not Implemented`);
    }
    static getRelationGlobalTableIndex() {
        throw new Error(`Not Implemented`);
    }
    static getGlobalTableIndex(applicationName, entityName) {
        throw new Error(`Not Implemented`);
    }
    static warn(message) {
        console.log(message);
    }
}
//# sourceMappingURL=DDLManager.js.map