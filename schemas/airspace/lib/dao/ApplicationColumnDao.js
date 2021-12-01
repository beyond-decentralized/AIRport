import { DI } from '@airport/di';
import { undefinedToNull } from '@airport/ground-control';
import { BaseApplicationColumnDao, Q } from '../generated/generated';
import { APPLICATION_COLUMN_DAO } from '../tokens';
export class ApplicationColumnDao extends BaseApplicationColumnDao {
    async findAllForEntities(entityIds) {
        let c;
        return this.db.find.tree({
            select: {},
            from: [
                c = Q.ApplicationColumn
            ],
            where: c.entity.id.in(entityIds)
        });
    }
    async insert(applicationColumns) {
        let sc;
        const values = [];
        for (const applicationColumn of applicationColumns) {
            values.push([
                applicationColumn.id, applicationColumn.index,
                undefinedToNull(applicationColumn.idIndex),
                applicationColumn.isGenerated,
                undefinedToNull(applicationColumn.allocationSize),
                applicationColumn.name,
                applicationColumn.notNull,
                undefinedToNull(applicationColumn.precision),
                undefinedToNull(applicationColumn.scale),
                applicationColumn.type,
                applicationColumn.entity.id,
                applicationColumn.deprecatedSinceVersion ? applicationColumn.deprecatedSinceVersion.id : null,
                applicationColumn.removedInVersion ? applicationColumn.removedInVersion.id : null,
                applicationColumn.sinceVersion ? applicationColumn.sinceVersion.id : null,
            ]);
        }
        await this.db.insertValuesGenerateIds({
            insertInto: sc = Q.ApplicationColumn,
            columns: [
                sc.id,
                sc.index,
                sc.idIndex,
                sc.isGenerated,
                sc.allocationSize,
                sc.name,
                sc.notNull,
                sc.precision,
                sc.scale,
                sc.type,
                sc.entity.id,
                sc.deprecatedSinceVersion.id,
                sc.removedInVersion.id,
                sc.sinceVersion.id
            ],
            values
        });
    }
}
DI.set(APPLICATION_COLUMN_DAO, ApplicationColumnDao);
//# sourceMappingURL=ApplicationColumnDao.js.map