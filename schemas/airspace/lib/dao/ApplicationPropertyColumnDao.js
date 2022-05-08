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
            select: {},
            from: [
                rc = Q.ApplicationPropertyColumn
            ],
            where: rc.column.id.in(columnIds)
        });
    }
    async insert(applicationPropertyColumns, context) {
        let spc;
        const values = [];
        for (const applicationPropertyColumn of applicationPropertyColumns) {
            values.push([
                applicationPropertyColumn.column.id, applicationPropertyColumn.property.id,
                applicationPropertyColumn.deprecatedSinceVersion ? applicationPropertyColumn.deprecatedSinceVersion.id : null,
                applicationPropertyColumn.removedInVersion ? applicationPropertyColumn.removedInVersion.id : null,
                applicationPropertyColumn.sinceVersion ? applicationPropertyColumn.sinceVersion.id : null,
            ]);
        }
        await this.db.insertValuesGenerateIds({
            insertInto: spc = Q.ApplicationPropertyColumn,
            columns: [
                spc.column.id,
                spc.property.id,
                spc.deprecatedSinceVersion.id,
                spc.removedInVersion.id,
                spc.sinceVersion.id
            ],
            values
        }, context);
    }
};
ApplicationPropertyColumnDao = __decorate([
    Injected()
], ApplicationPropertyColumnDao);
export { ApplicationPropertyColumnDao };
//# sourceMappingURL=ApplicationPropertyColumnDao.js.map