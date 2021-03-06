var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Injected } from '@airport/direction-indicator';
import { BaseSynchronizationConflictValuesDao, Q } from '../../generated/generated';
let SynchronizationConflictValuesDao = class SynchronizationConflictValuesDao extends BaseSynchronizationConflictValuesDao {
    async insert(synchronizationConflictValues, context) {
        let scv;
        const VALUES = [];
        for (const synchronizationConflictValue of synchronizationConflictValues) {
            VALUES.push([
                synchronizationConflictValue.synchronizationConflict._localId,
                synchronizationConflictValue.columnIndex
            ]);
        }
        await this.db.insertValues({
            INSERT_INTO: scv = Q.SynchronizationConflictValues,
            columns: [
                scv.synchronizationConflict._localId,
                scv.columnIndex
            ],
            VALUES
        }, context);
    }
};
SynchronizationConflictValuesDao = __decorate([
    Injected()
], SynchronizationConflictValuesDao);
export { SynchronizationConflictValuesDao };
//# sourceMappingURL=SynchronizationConflictValuesDao.js.map