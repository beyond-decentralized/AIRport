"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const di_1 = require("@airport/di");
const diTokens_1 = require("../../diTokens");
const generated_1 = require("../../generated/generated");
class SynchronizationConflictPendingNotificationDao extends generated_1.BaseSynchronizationConflictPendingNotificationDao {
}
exports.SynchronizationConflictPendingNotificationDao = SynchronizationConflictPendingNotificationDao;
di_1.DI.set(diTokens_1.SYNC_CONFLICT_PENDING_NOTIFICATION_DAO, SynchronizationConflictPendingNotificationDao);
//# sourceMappingURL=SynchronizationConflictPendingNotificationDao.js.map