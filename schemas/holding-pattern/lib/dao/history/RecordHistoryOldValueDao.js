var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Injected } from '@airport/direction-indicator';
import { BaseRecordHistoryOldValueDao } from '../../generated/generated';
import { Q, } from '../../generated/generated';
let RecordHistoryOldValueDao = class RecordHistoryOldValueDao extends BaseRecordHistoryOldValueDao {
    async findByRecordHistory_LocalIdIn(RecordHistory_LocalIds) {
        let rhov;
        return await this.db.find.tree({
            SELECT: {},
            FROM: [
                rhov = Q.RecordHistoryOldValue
            ],
            WHERE: rhov.recordHistory._localId.IN(RecordHistory_LocalIds)
        });
    }
};
RecordHistoryOldValueDao = __decorate([
    Injected()
], RecordHistoryOldValueDao);
export { RecordHistoryOldValueDao };
//# sourceMappingURL=RecordHistoryOldValueDao.js.map