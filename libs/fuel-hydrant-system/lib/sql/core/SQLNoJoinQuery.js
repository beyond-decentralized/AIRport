import { QEntity, QRelation } from '@airport/air-control';
import { SQLWhereBase } from './SQLWhereBase';
/**
 * Created by Papa on 10/2/2016.
 */
export class SQLNoJoinQuery extends SQLWhereBase {
    constructor(dbEntity, dialect, storeDriver) {
        super(dbEntity, dialect, storeDriver);
    }
    getTableFragment(fromRelation, airDb, schemaUtils) {
        if (!fromRelation) {
            throw new Error(`Expecting exactly one table in UPDATE/DELETE clause`);
        }
        if (fromRelation.ri || fromRelation.jt) {
            throw new Error(`Table in UPDATE/DELETE clause cannot be joined`);
        }
        const firstDbEntity = airDb.schemas[fromRelation.si]
            .currentVersion.entities[fromRelation.ti];
        let tableName = schemaUtils.getTableName(firstDbEntity);
        if (fromRelation.si !== this.dbEntity.schemaVersion.schema.index
            || fromRelation.ti !== this.dbEntity.index) {
            throw new Error(`Unexpected table in UPDATE/DELETE clause: 
			'${tableName}',
			expecting: '${this.dbEntity.schemaVersion.schema.name}.${this.dbEntity.name}'`);
        }
        const firstQEntity = new QEntity(firstDbEntity);
        const tableAlias = QRelation.getAlias(fromRelation);
        this.qEntityMapByAlias[tableAlias] = firstQEntity;
        const fromFragment = `\t${tableName} AS ${tableAlias}`;
        return fromFragment;
    }
}
//# sourceMappingURL=SQLNoJoinQuery.js.map