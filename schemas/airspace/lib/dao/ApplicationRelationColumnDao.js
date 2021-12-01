import { or } from '@airport/air-control';
import { DI } from '@airport/di';
import { SCHEMA_RELATION_COLUMN_DAO } from '../tokens';
import { BaseApplicationRelationColumnDao, Q, } from '../generated/generated';
export class ApplicationRelationColumnDao extends BaseApplicationRelationColumnDao {
    async findAllForColumns(columnIds) {
        let rc;
        return this.db.find.tree({
            select: {},
            from: [
                rc = Q.ApplicationRelationColumn
            ],
            where: or(rc.oneColumn.id.in(columnIds), rc.manyColumn.id.in(columnIds))
        });
    }
    async insert(applicationRelationColumns) {
        let src;
        const values = [];
        for (const applicationRelationColumn of applicationRelationColumns) {
            values.push([
                applicationRelationColumn.id,
                applicationRelationColumn.manyColumn ? applicationRelationColumn.manyColumn.id : null,
                applicationRelationColumn.oneColumn ? applicationRelationColumn.oneColumn.id : null,
                applicationRelationColumn.manyRelation ? applicationRelationColumn.manyRelation.id : null,
                applicationRelationColumn.oneRelation ? applicationRelationColumn.oneRelation.id : null,
                applicationRelationColumn.parentRelation ? applicationRelationColumn.parentRelation.id : null,
                applicationRelationColumn.deprecatedSinceVersion ? applicationRelationColumn.deprecatedSinceVersion.id : null,
                applicationRelationColumn.removedInVersion ? applicationRelationColumn.removedInVersion.id : null,
                applicationRelationColumn.sinceVersion ? applicationRelationColumn.sinceVersion.id : null,
            ]);
        }
        await this.db.insertValuesGenerateIds({
            insertInto: src = Q.ApplicationRelationColumn,
            columns: [
                src.id,
                src.manyColumn.id,
                src.oneColumn.id,
                src.manyRelation.id,
                src.oneRelation.id,
                src.parentRelation.id,
                src.deprecatedSinceVersion.id,
                src.removedInVersion.id,
                src.sinceVersion.id
            ],
            values
        });
    }
}
DI.set(SCHEMA_RELATION_COLUMN_DAO, ApplicationRelationColumnDao);
//# sourceMappingURL=ApplicationRelationColumnDao.js.map