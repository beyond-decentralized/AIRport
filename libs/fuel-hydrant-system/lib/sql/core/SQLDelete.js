import { SQLNoJoinQuery } from './SQLNoJoinQuery';
/**
 * Created by Papa on 10/2/2016.
 */
export class SQLDelete extends SQLNoJoinQuery {
    constructor(jsonDelete, dialect, airportDatabase, applicationUtils, entityStateManager, qMetadataUtils, relationManager, sqlQueryAdapter, storeDriver, utils, context) {
        super(airportDatabase.applications[jsonDelete.DF.si].currentVersion[0]
            .applicationVersion.entities[jsonDelete.DF.ti], dialect, airportDatabase, applicationUtils, entityStateManager, qMetadataUtils, relationManager, sqlQueryAdapter, storeDriver, utils, context);
        this.jsonDelete = jsonDelete;
    }
    toSQL(context) {
        let fromFragment = this.getTableFragment(this.jsonDelete.DF, context);
        let whereFragment = '';
        let jsonQuery = this.jsonDelete;
        if (jsonQuery.W) {
            whereFragment = this.getWHEREFragment(jsonQuery.W, '', context);
            whereFragment = `
WHERE
${whereFragment}`;
            // TODO: following might be needed for some RDBMS, does not work for SqLite
            // Replace the root entity alias reference with the table name
            // let tableAlias = this.relationManager.getAlias(this.jsonDelete.DF)
            // let tableName = this.storeDriver.getEntityTableName(this.qEntityMapByAlias[tableAlias].__driver__.dbEntity, context)
            // whereFragment = whereFragment.replace(new RegExp(`${tableAlias}`, 'g'), tableName)
        }
        return `DELETE
FROM
${fromFragment}${whereFragment}`;
    }
}
//# sourceMappingURL=SQLDelete.js.map