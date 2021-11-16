import { DI } from '@airport/di';
import { BaseSchemaEntityDao, Q, } from '../generated/generated';
import { SCHEMA_ENTITY_DAO } from '../tokens';
export class SchemaEntityDao extends BaseSchemaEntityDao {
    async findAllForSchemaVersions(schemaVersionIds) {
        let se;
        return await this.db.find.tree({
            select: {},
            from: [
                se = Q.SchemaEntity
            ],
            where: se.schemaVersion.id.in(schemaVersionIds)
        });
    }
    async insert(schemaEntities) {
        let se;
        const values = [];
        for (const schemaEntity of schemaEntities) {
            values.push([
                schemaEntity.id, schemaEntity.index,
                schemaEntity.isLocal, schemaEntity.isRepositoryEntity,
                schemaEntity.name, schemaEntity.tableConfig,
                schemaEntity.schemaVersion.id,
                schemaEntity.deprecatedSinceVersion ? schemaEntity.deprecatedSinceVersion.id : null,
                schemaEntity.removedInVersion ? schemaEntity.removedInVersion.id : null,
                schemaEntity.sinceVersion ? schemaEntity.sinceVersion.id : null,
            ]);
        }
        await this.db.insertValuesGenerateIds({
            insertInto: se = Q.SchemaEntity,
            columns: [
                se.id,
                se.index,
                se.isLocal,
                se.isRepositoryEntity,
                se.name,
                se.tableConfig,
                se.schemaVersion.id,
                se.deprecatedSinceVersion.id,
                se.removedInVersion.id,
                se.sinceVersion.id
            ],
            values
        });
    }
}
DI.set(SCHEMA_ENTITY_DAO, SchemaEntityDao);
//# sourceMappingURL=SchemaEntityDao.js.map