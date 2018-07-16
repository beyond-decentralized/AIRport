"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const air_control_1 = require("@airport/air-control");
const SQLNoJoinQuery_1 = require("./SQLNoJoinQuery");
/**
 * Created by Papa on 10/2/2016.
 */
class SQLDelete extends SQLNoJoinQuery_1.SQLNoJoinQuery {
    constructor(airportDb, utils, jsonDelete, dialect) {
        super(airportDb, utils, airportDb.schemas[jsonDelete.DF.si][jsonDelete.DF.ti], dialect);
        this.jsonDelete = jsonDelete;
    }
    toSQL() {
        let fromFragment = this.getTableFragment(this.jsonDelete.DF);
        let whereFragment = '';
        let jsonQuery = this.jsonDelete;
        if (jsonQuery.W) {
            whereFragment = `
WHERE
${this.getWHEREFragment(jsonQuery.W, '')}`;
            // Always replace the root entity alias reference with the table name
            let tableAlias = air_control_1.QRelation.getAlias(this.jsonDelete.DF);
            let tableName = this.qEntityMapByAlias[tableAlias].__driver__.dbEntity.name;
            whereFragment = whereFragment.replace(new RegExp(`${tableAlias}`, 'g'), tableName);
        }
        return `DELETE
FROM
${fromFragment}${whereFragment}`;
    }
}
exports.SQLDelete = SQLDelete;
//# sourceMappingURL=SQLDelete.js.map