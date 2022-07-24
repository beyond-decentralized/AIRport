var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Injected } from '@airport/direction-indicator';
import { BaseApplicationPropertyColumnDao, Q, } from '../generated/generated';
let ApplicationPropertyColumnDao = class ApplicationPropertyColumnDao extends BaseApplicationPropertyColumnDao {
    async findAllForColumns(columnIds) {
        let rc;
        return this.db.find.tree({
            SELECT: {},
            FROM: [
                rc = Q.ApplicationPropertyColumn
            ],
            WHERE: rc.column._localId.IN(columnIds)
        });
    }
    async insert(applicationPropertyColumns, context) {
        let spc;
        const VALUES = [];
        for (const applicationPropertyColumn of applicationPropertyColumns) {
            VALUES.push([
                applicationPropertyColumn.column._localId, applicationPropertyColumn.property._localId,
                applicationPropertyColumn.deprecatedSinceVersion ? applicationPropertyColumn.deprecatedSinceVersion._localId : null,
                applicationPropertyColumn.removedInVersion ? applicationPropertyColumn.removedInVersion._localId : null,
                applicationPropertyColumn.sinceVersion ? applicationPropertyColumn.sinceVersion._localId : null,
            ]);
        }
        await this.db.insertValuesGenerateIds({
            INSERT_INTO: spc = Q.ApplicationPropertyColumn,
            columns: [
                spc.column._localId,
                spc.property._localId,
                spc.deprecatedSinceVersion._localId,
                spc.removedInVersion._localId,
                spc.sinceVersion._localId
            ],
            VALUES
        }, context);
    }
};
ApplicationPropertyColumnDao = __decorate([
    Injected()
], ApplicationPropertyColumnDao);
export { ApplicationPropertyColumnDao };
//# sourceMappingURL=ApplicationPropertyColumnDao.js.map