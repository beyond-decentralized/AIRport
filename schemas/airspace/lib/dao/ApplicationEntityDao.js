var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Injected } from '@airport/direction-indicator';
import { BaseApplicationEntityDao, Q, } from '../generated/generated';
let ApplicationEntityDao = class ApplicationEntityDao extends BaseApplicationEntityDao {
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
    async insert(applicationEntities, context) {
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
        }, context);
    }
};
ApplicationEntityDao = __decorate([
    Injected()
], ApplicationEntityDao);
export { ApplicationEntityDao };
//# sourceMappingURL=ApplicationEntityDao.js.map