var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Injected } from '@airport/direction-indicator';
import { BaseApplicationPropertyDao, Q, } from '../generated/generated';
let ApplicationPropertyDao = class ApplicationPropertyDao extends BaseApplicationPropertyDao {
    async findAllForEntities(entityIds) {
        let p;
        return this.db.find.tree({
            select: {},
            from: [
                p = Q.ApplicationProperty
            ],
            where: p.entity._localId.in(entityIds)
        });
    }
    async insert(applicationProperties, context) {
        let sp;
        const values = [];
        for (const applicationProperty of applicationProperties) {
            values.push([
                applicationProperty._localId, applicationProperty.index,
                applicationProperty.name, applicationProperty.isId,
                applicationProperty.entity._localId,
                applicationProperty.deprecatedSinceVersion ? applicationProperty.deprecatedSinceVersion._localId : null,
                applicationProperty.removedInVersion ? applicationProperty.removedInVersion._localId : null,
                applicationProperty.sinceVersion ? applicationProperty.sinceVersion._localId : null,
            ]);
        }
        await this.db.insertValuesGenerateIds({
            insertInto: sp = Q.ApplicationProperty,
            columns: [
                sp._localId,
                sp.index,
                sp.name,
                sp.isId,
                sp.entity._localId,
                sp.deprecatedSinceVersion._localId,
                sp.removedInVersion._localId,
                sp.sinceVersion._localId
            ],
            values
        }, context);
    }
};
ApplicationPropertyDao = __decorate([
    Injected()
], ApplicationPropertyDao);
export { ApplicationPropertyDao };
//# sourceMappingURL=ApplicationPropertyDao.js.map