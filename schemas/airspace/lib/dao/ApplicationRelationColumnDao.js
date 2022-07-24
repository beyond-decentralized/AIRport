var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { OR } from '@airport/tarmaq-query';
import { Injected } from '@airport/direction-indicator';
import { BaseApplicationRelationColumnDao, Q, } from '../generated/generated';
let ApplicationRelationColumnDao = class ApplicationRelationColumnDao extends BaseApplicationRelationColumnDao {
    async findAllForColumns(columnIds) {
        let rc;
        return this.db.find.tree({
            SELECT: {},
            FROM: [
                rc = Q.ApplicationRelationColumn
            ],
            WHERE: OR(rc.oneColumn._localId.IN(columnIds), rc.manyColumn._localId.IN(columnIds))
        });
    }
    async insert(applicationRelationColumns, context) {
        let src;
        const VALUES = [];
        for (const applicationRelationColumn of applicationRelationColumns) {
            VALUES.push([
                applicationRelationColumn._localId,
                applicationRelationColumn.manyColumn ? applicationRelationColumn.manyColumn._localId : null,
                applicationRelationColumn.oneColumn ? applicationRelationColumn.oneColumn._localId : null,
                applicationRelationColumn.manyRelation ? applicationRelationColumn.manyRelation._localId : null,
                applicationRelationColumn.oneRelation ? applicationRelationColumn.oneRelation._localId : null,
                applicationRelationColumn.parentRelation ? applicationRelationColumn.parentRelation._localId : null,
                applicationRelationColumn.deprecatedSinceVersion ? applicationRelationColumn.deprecatedSinceVersion._localId : null,
                applicationRelationColumn.removedInVersion ? applicationRelationColumn.removedInVersion._localId : null,
                applicationRelationColumn.sinceVersion ? applicationRelationColumn.sinceVersion._localId : null,
            ]);
        }
        await this.db.insertValuesGenerateIds({
            INSERT_INTO: src = Q.ApplicationRelationColumn,
            columns: [
                src._localId,
                src.manyColumn._localId,
                src.oneColumn._localId,
                src.manyRelation._localId,
                src.oneRelation._localId,
                src.parentRelation._localId,
                src.deprecatedSinceVersion._localId,
                src.removedInVersion._localId,
                src.sinceVersion._localId
            ],
            VALUES
        }, context);
    }
};
ApplicationRelationColumnDao = __decorate([
    Injected()
], ApplicationRelationColumnDao);
export { ApplicationRelationColumnDao };
//# sourceMappingURL=ApplicationRelationColumnDao.js.map