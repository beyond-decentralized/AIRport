import { QEntity } from '@airport/air-control';
import { SQLWhereBase } from './SQLWhereBase';
/**
 * Created by Papa on 10/2/2016.
 */
export class SQLNoJoinQuery extends SQLWhereBase {
    constructor(dbEntity, dialect, airportDatabase, applicationUtils, entityStateManager, qMetadataUtils, relationManager, sqlQueryAdapter, storeDriver, context) {
        super(dbEntity, dialect, airportDatabase, applicationUtils, entityStateManager, qMetadataUtils, sqlQueryAdapter, storeDriver, context);
        this.relationManager = relationManager;
    }
    getTableFragment(fromRelation, context, addAs = true) {
        if (!fromRelation) {
            throw new Error(`Expecting exactly one table in UPDATE/DELETE clause`);
        }
        if (fromRelation.ri || fromRelation.jt) {
            throw new Error(`Table in UPDATE/DELETE clause cannot be joined`);
        }
        const firstDbEntity = this.airportDatabase.applications[fromRelation.si]
            .currentVersion[0].applicationVersion.entities[fromRelation.ti];
        let tableName = this.storeDriver.getEntityTableName(firstDbEntity, context);
        if (fromRelation.si !== this.dbEntity.applicationVersion.application.index
            || fromRelation.ti !== this.dbEntity.index) {
            throw new Error(`Unexpected table in UPDATE/DELETE clause: 
			'${tableName}',
			expecting: '${this.dbEntity.applicationVersion.application.name}.${this.dbEntity.name}'`);
        }
        const firstQEntity = new QEntity(firstDbEntity);
        const tableAlias = this.relationManager.getAlias(fromRelation);
        this.qEntityMapByAlias[tableAlias] = firstQEntity;
        let fromFragment = `\t${tableName}`;
        if (addAs) {
            fromFragment += ` AS ${tableAlias}`;
        }
        return fromFragment;
    }
}
//# sourceMappingURL=SQLNoJoinQuery.js.map