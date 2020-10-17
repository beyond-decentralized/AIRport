import { QRelation } from '@airport/air-control';
import { SQLNoJoinQuery } from './SQLNoJoinQuery';
/**
 * Created by Papa on 10/2/2016.
 */
export class SQLDelete extends SQLNoJoinQuery {
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
            let tableAlias = QRelation.getAlias(this.jsonDelete.DF);
            let tableName = schemaUtils.getTableName(this.qEntityMapByAlias[tableAlias].__driver__.dbEntity);
            whereFragment = whereFragment.replace(new RegExp(`${tableAlias}`, 'g'), tableName);
        }
        return `DELETE
FROM
${fromFragment}${whereFragment}`;
    }
}
//# sourceMappingURL=SQLDelete.js.map