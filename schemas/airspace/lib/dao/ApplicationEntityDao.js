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
            SELECT: {},
            FROM: [
                se = Q.ApplicationEntity
            ],
            WHERE: se.applicationVersion._localId.IN(applicationVersionIds)
        });
    }
    async insert(applicationEntities, context) {
        let se;
        const VALUES = [];
        for (const applicationEntity of applicationEntities) {
            VALUES.push([
                applicationEntity._localId, applicationEntity.index,
                applicationEntity.isLocal, applicationEntity.isAirEntity,
                applicationEntity.name, applicationEntity.tableConfig,
                applicationEntity.applicationVersion._localId,
                applicationEntity.deprecatedSinceVersion ? applicationEntity.deprecatedSinceVersion._localId : null,
                applicationEntity.removedInVersion ? applicationEntity.removedInVersion._localId : null,
                applicationEntity.sinceVersion ? applicationEntity.sinceVersion._localId : null,
            ]);
        }
        await this.db.insertValuesGenerateIds({
            INSERT_INTO: se = Q.ApplicationEntity,
            columns: [
                se._localId,
                se.index,
                se.isLocal,
                se.isAirEntity,
                se.name,
                se.tableConfig,
                se.applicationVersion._localId,
                se.deprecatedSinceVersion._localId,
                se.removedInVersion._localId,
                se.sinceVersion._localId
            ],
            VALUES
        }, context);
    }
};
ApplicationEntityDao = __decorate([
    Injected()
], ApplicationEntityDao);
export { ApplicationEntityDao };
//# sourceMappingURL=ApplicationEntityDao.js.map