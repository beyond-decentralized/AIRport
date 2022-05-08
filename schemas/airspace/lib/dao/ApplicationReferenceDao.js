var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Injected } from '@airport/direction-indicator';
import { BaseApplicationReferenceDao, Q, } from '../generated/generated';
let ApplicationReferenceDao = class ApplicationReferenceDao extends BaseApplicationReferenceDao {
    async findAllForApplicationVersions(applicationVersionIds) {
        let sr;
        return await this.db.find.tree({
            select: {},
            from: [
                sr = Q.ApplicationReference
            ],
            where: sr.ownApplicationVersion.id.in(applicationVersionIds)
        });
    }
    async insert(applicationReferences, context) {
        let sr;
        const values = [];
        for (const applicationReference of applicationReferences) {
            values.push([
                applicationReference.ownApplicationVersion.id,
                applicationReference.referencedApplicationVersion.id,
                applicationReference.index,
                applicationReference.deprecatedSinceVersion ? applicationReference.deprecatedSinceVersion.id : null,
                applicationReference.removedInVersion ? applicationReference.removedInVersion.id : null,
                applicationReference.sinceVersion ? applicationReference.sinceVersion.id : null,
            ]);
        }
        await this.db.insertValuesGenerateIds({
            insertInto: sr = Q.ApplicationReference,
            columns: [
                sr.ownApplicationVersion.id,
                sr.referencedApplicationVersion.id,
                sr.index,
                sr.deprecatedSinceVersion.id,
                sr.removedInVersion.id,
                sr.sinceVersion.id
            ],
            values
        }, context);
    }
};
ApplicationReferenceDao = __decorate([
    Injected()
], ApplicationReferenceDao);
export { ApplicationReferenceDao };
//# sourceMappingURL=ApplicationReferenceDao.js.map