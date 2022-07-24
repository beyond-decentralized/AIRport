var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Injected } from '@airport/direction-indicator';
import { BaseSynchronizationConflictDao, Q } from '../../generated/generated';
let SynchronizationConflictDao = class SynchronizationConflictDao extends BaseSynchronizationConflictDao {
    async insert(synchronizationConflicts, context) {
        let sc;
        const VALUES = [];
        for (const synchronizationConflict of synchronizationConflicts) {
            VALUES.push([
                synchronizationConflict.type,
                synchronizationConflict.acknowledged,
                synchronizationConflict.repository._localId,
                synchronizationConflict.overwrittenRecordHistory._localId,
                synchronizationConflict.overwritingRecordHistory._localId
            ]);
        }
        const ids = await this.db.insertValuesGenerateIds({
            INSERT_INTO: sc = Q.SynchronizationConflict,
            columns: [
                sc.type,
                sc.acknowledged,
                sc.repository._localId,
                sc.overwrittenRecordHistory._localId,
                sc.overwritingRecordHistory._localId
            ],
            VALUES
        }, context);
        for (let i = 0; i < synchronizationConflicts.length; i++) {
            let synchronizationConflict = synchronizationConflicts[i];
            synchronizationConflict._localId = ids[i][0];
        }
    }
};
SynchronizationConflictDao = __decorate([
    Injected()
], SynchronizationConflictDao);
export { SynchronizationConflictDao };
//# sourceMappingURL=SynchronizationConflictDao.js.map