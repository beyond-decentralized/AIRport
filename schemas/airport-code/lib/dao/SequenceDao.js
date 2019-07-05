"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const air_control_1 = require("@airport/air-control");
const di_1 = require("@airport/di");
const diTokens_1 = require("../diTokens");
const generated_1 = require("../generated/generated");
class SequenceDao extends generated_1.BaseSequenceDao {
    static diSet() {
        return generated_1.Q.__dbSchema__ && generated_1.Q.__dbSchema__
            .currentVersion.entities[0];
    }
    async incrementCurrentValues() {
        const s = generated_1.Q.Sequence;
        await this.db.updateWhere({
            update: s,
            set: {
                currentValue: air_control_1.plus(s.currentValue, s.incrementBy)
            }
        });
    }
}
exports.SequenceDao = SequenceDao;
di_1.DI.set(diTokens_1.SEQUENCE_DAO, SequenceDao);
//# sourceMappingURL=SequenceDao.js.map