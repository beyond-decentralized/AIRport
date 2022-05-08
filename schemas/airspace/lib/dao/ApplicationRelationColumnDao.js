var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { or } from '@airport/air-traffic-control';
import { Injected } from '@airport/direction-indicator';
import { BaseApplicationRelationColumnDao, Q, } from '../generated/generated';
let ApplicationRelationColumnDao = class ApplicationRelationColumnDao extends BaseApplicationRelationColumnDao {
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
    async insert(applicationRelationColumns, context) {
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
        }, context);
    }
};
ApplicationRelationColumnDao = __decorate([
    Injected()
], ApplicationRelationColumnDao);
export { ApplicationRelationColumnDao };
//# sourceMappingURL=ApplicationRelationColumnDao.js.map