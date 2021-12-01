import { DI } from '@airport/di';
import { BaseApplicationEntityDao, Q, } from '../generated/generated';
import { SCHEMA_ENTITY_DAO } from '../tokens';
export class ApplicationEntityDao extends BaseApplicationEntityDao {
    async findAllForApplicationVersions(applicationVersionIds) {
        let se;
        return await this.db.find.tree({
            select: {},
            from: [
                se = Q.ApplicationEntity
            ],
            where: se.applicationVersion.id.in(applicationVersionIds)
        });
    }
    async insert(applicationEntities) {
        let se;
        const values = [];
        for (const applicationEntity of applicationEntities) {
            values.push([
                applicationEntity.id, applicationEntity.index,
                applicationEntity.isLocal, applicationEntity.isRepositoryEntity,
                applicationEntity.name, applicationEntity.tableConfig,
                applicationEntity.applicationVersion.id,
                applicationEntity.deprecatedSinceVersion ? applicationEntity.deprecatedSinceVersion.id : null,
                applicationEntity.removedInVersion ? applicationEntity.removedInVersion.id : null,
                applicationEntity.sinceVersion ? applicationEntity.sinceVersion.id : null,
            ]);
        }
        await this.db.insertValuesGenerateIds({
            insertInto: se = Q.ApplicationEntity,
            columns: [
                se.id,
                se.index,
                se.isLocal,
                se.isRepositoryEntity,
                se.name,
                se.tableConfig,
                se.applicationVersion.id,
                se.deprecatedSinceVersion.id,
                se.removedInVersion.id,
                se.sinceVersion.id
            ],
            values
        });
    }
}
DI.set(SCHEMA_ENTITY_DAO, ApplicationEntityDao);
//# sourceMappingURL=ApplicationEntityDao.js.map