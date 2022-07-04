var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Injected } from '@airport/direction-indicator';
import { undefinedToNull } from '@airport/ground-control';
import { BaseApplicationRelationDao, Q, } from '../generated/generated';
let ApplicationRelationDao = class ApplicationRelationDao extends BaseApplicationRelationDao {
    async findAllForProperties(propertyIds) {
        let r;
        return this.db.find.tree({
            select: {},
            from: [
                r = Q.ApplicationRelation
            ],
            where: r.property._localId.in(propertyIds)
        });
    }
    async insert(applicationRelations, context) {
        let sr;
        const values = [];
        for (const applicationRelation of applicationRelations) {
            values.push([
                applicationRelation._localId, applicationRelation.index,
                applicationRelation.property._localId,
                undefinedToNull(applicationRelation.foreignKey),
                undefinedToNull(applicationRelation.manyToOneElems),
                undefinedToNull(applicationRelation.oneToManyElems),
                applicationRelation.relationType, applicationRelation.isId,
                applicationRelation.entity._localId, applicationRelation.relationEntity._localId,
                applicationRelation.deprecatedSinceVersion ? applicationRelation.deprecatedSinceVersion._localId : null,
                applicationRelation.removedInVersion ? applicationRelation.removedInVersion._localId : null,
                applicationRelation.sinceVersion ? applicationRelation.sinceVersion._localId : null,
            ]);
        }
        await this.db.insertValuesGenerateIds({
            insertInto: sr = Q.ApplicationRelation,
            columns: [
                sr._localId,
                sr.index,
                sr.property._localId,
                sr.foreignKey,
                sr.manyToOneElems,
                sr.oneToManyElems,
                sr.relationType,
                sr.isId,
                sr.entity._localId,
                sr.relationEntity._localId,
                sr.deprecatedSinceVersion._localId,
                sr.removedInVersion._localId,
                sr.sinceVersion._localId
            ],
            values
        }, context);
    }
};
ApplicationRelationDao = __decorate([
    Injected()
], ApplicationRelationDao);
export { ApplicationRelationDao };
//# sourceMappingURL=ApplicationRelationDao.js.map