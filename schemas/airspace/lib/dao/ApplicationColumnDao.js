var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Injected } from '@airport/direction-indicator';
import { undefinedToNull } from '@airport/ground-control';
import { BaseApplicationColumnDao, Q } from '../generated/generated';
let ApplicationColumnDao = class ApplicationColumnDao extends BaseApplicationColumnDao {
    async findAllForEntities(entityIds) {
        let c;
        return this.db.find.tree({
            select: {},
            from: [
                c = Q.ApplicationColumn
            ],
            where: c.entity._localId.in(entityIds)
        });
    }
    async insert(applicationColumns, context) {
        let sc;
        const values = [];
        for (const applicationColumn of applicationColumns) {
            values.push([
                applicationColumn._localId, applicationColumn.index,
                undefinedToNull(applicationColumn.idIndex),
                applicationColumn.isGenerated,
                undefinedToNull(applicationColumn.allocationSize),
                applicationColumn.name,
                applicationColumn.notNull,
                undefinedToNull(applicationColumn.precision),
                undefinedToNull(applicationColumn.scale),
                applicationColumn.type,
                applicationColumn.entity._localId,
                applicationColumn.deprecatedSinceVersion ? applicationColumn.deprecatedSinceVersion._localId : null,
                applicationColumn.removedInVersion ? applicationColumn.removedInVersion._localId : null,
                applicationColumn.sinceVersion ? applicationColumn.sinceVersion._localId : null,
            ]);
        }
        await this.db.insertValuesGenerateIds({
            insertInto: sc = Q.ApplicationColumn,
            columns: [
                sc._localId,
                sc.index,
                sc.idIndex,
                sc.isGenerated,
                sc.allocationSize,
                sc.name,
                sc.notNull,
                sc.precision,
                sc.scale,
                sc.type,
                sc.entity._localId,
                sc.deprecatedSinceVersion._localId,
                sc.removedInVersion._localId,
                sc.sinceVersion._localId
            ],
            values
        }, context);
    }
};
ApplicationColumnDao = __decorate([
    Injected()
], ApplicationColumnDao);
export { ApplicationColumnDao };
//# sourceMappingURL=ApplicationColumnDao.js.map