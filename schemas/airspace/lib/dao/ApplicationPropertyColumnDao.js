import { DI } from '@airport/di';
import { BaseApplicationPropertyColumnDao, Q, } from '../generated/generated';
import { SCHEMA_PROPERTY_COLUMN_DAO } from '../tokens';
export class ApplicationPropertyColumnDao extends BaseApplicationPropertyColumnDao {
    async findAllForColumns(columnIds) {
        let rc;
        return this.db.find.tree({
            select: {},
            from: [
                rc = Q.ApplicationPropertyColumn
            ],
            where: rc.column.id.in(columnIds)
        });
    }
    async insert(applicationPropertyColumns) {
        let spc;
        const values = [];
        for (const applicationPropertyColumn of applicationPropertyColumns) {
            values.push([
                applicationPropertyColumn.column.id, applicationPropertyColumn.property.id,
                applicationPropertyColumn.deprecatedSinceVersion ? applicationPropertyColumn.deprecatedSinceVersion.id : null,
                applicationPropertyColumn.removedInVersion ? applicationPropertyColumn.removedInVersion.id : null,
                applicationPropertyColumn.sinceVersion ? applicationPropertyColumn.sinceVersion.id : null,
            ]);
        }
        await this.db.insertValuesGenerateIds({
            insertInto: spc = Q.ApplicationPropertyColumn,
            columns: [
                spc.column.id,
                spc.property.id,
                spc.deprecatedSinceVersion.id,
                spc.removedInVersion.id,
                spc.sinceVersion.id
            ],
            values
        });
    }
}
DI.set(SCHEMA_PROPERTY_COLUMN_DAO, ApplicationPropertyColumnDao);
//# sourceMappingURL=ApplicationPropertyColumnDao.js.map