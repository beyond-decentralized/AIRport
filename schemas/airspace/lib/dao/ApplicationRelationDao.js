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
            where: r.property.id.in(propertyIds)
        });
    }
    async insert(applicationRelations, context) {
        let sr;
        const values = [];
        for (const applicationRelation of applicationRelations) {
            values.push([
                applicationRelation.id, applicationRelation.index,
                applicationRelation.property.id,
                undefinedToNull(applicationRelation.foreignKey),
                undefinedToNull(applicationRelation.manyToOneElems),
                undefinedToNull(applicationRelation.oneToManyElems),
                applicationRelation.relationType, applicationRelation.isId,
                applicationRelation.entity.id, applicationRelation.relationEntity.id,
                applicationRelation.deprecatedSinceVersion ? applicationRelation.deprecatedSinceVersion.id : null,
                applicationRelation.removedInVersion ? applicationRelation.removedInVersion.id : null,
                applicationRelation.sinceVersion ? applicationRelation.sinceVersion.id : null,
            ]);
        }
        await this.db.insertValuesGenerateIds({
            insertInto: sr = Q.ApplicationRelation,
            columns: [
                sr.id,
                sr.index,
                sr.property.id,
                sr.foreignKey,
                sr.manyToOneElems,
                sr.oneToManyElems,
                sr.relationType,
                sr.isId,
                sr.entity.id,
                sr.relationEntity.id,
                sr.deprecatedSinceVersion.id,
                sr.removedInVersion.id,
                sr.sinceVersion.id
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