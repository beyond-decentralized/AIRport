"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const air_control_1 = require("@airport/air-control");
const SQLNoJoinQuery_1 = require("./SQLNoJoinQuery");
/**
 * Created by Papa on 10/2/2016.
 */
class SQLDelete extends SQLNoJoinQuery_1.SQLNoJoinQuery {
    constructor(airportDb, jsonDelete, dialect, storeDriver) {
        super(airportDb.schemas[jsonDelete.DF.si]
            .currentVersion.entities[jsonDelete.DF.ti], dialect, storeDriver);
        this.jsonDelete = jsonDelete;
    }
    toSQL(airDb, schemaUtils, metadataUtils) {
        let fromFragment = this.getTableFragment(this.jsonDelete.DF, airDb, schemaUtils);
        let whereFragment = '';
        let jsonQuery = this.jsonDelete;
        if (jsonQuery.W) {
            whereFragment = this.getWHEREFragment(jsonQuery.W, '', airDb, schemaUtils, metadataUtils);
            whereFragment = `
WHERE
${whereFragment}`;
            // Always replace the root entity alias reference with the table name
            let tableAlias = air_control_1.QRelation.getAlias(this.jsonDelete.DF);
            let tableName = schemaUtils.getTableName(this.qEntityMapByAlias[tableAlias].__driver__.dbEntity);
            whereFragment = whereFragment.replace(new RegExp(`${tableAlias}`, 'g'), tableName);
        }
        return `DELETE
FROM
${fromFragment}${whereFragment}`;
    }
}
exports.SQLDelete = SQLDelete;
//# sourceMappingURL=SQLDelete.js.map