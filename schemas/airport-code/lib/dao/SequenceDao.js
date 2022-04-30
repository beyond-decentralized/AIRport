var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { plus } from '@airport/air-control';
import { Injected } from '@airport/direction-indicator';
import { BaseSequenceDao, Q } from '../generated/generated';
let SequenceDao = class SequenceDao extends BaseSequenceDao {
    static diSet() {
        return Q.__dbApplication__ && Q.__dbApplication__.currentVersion[0]
            .applicationVersion.entities[0];
    }
    async incrementCurrentValues() {
        const s = Q.Sequence;
        await this.db.updateWhere({
            update: s,
            set: {
                currentValue: plus(s.currentValue, s.incrementBy)
            }
        });
    }
    async incrementSequence() {
        const s = Q.Sequence;
        await this.db.updateWhere({
            update: s,
            set: {
                currentValue: plus(s.currentValue, s.incrementBy)
            }
        });
    }
};
SequenceDao = __decorate([
    Injected()
], SequenceDao);
export { SequenceDao };
//# sourceMappingURL=SequenceDao.js.map