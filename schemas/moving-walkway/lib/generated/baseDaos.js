"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const check_in_1 = require("@airport/check-in");
const qSchema_1 = require("./qSchema");
// Schema Q object Dependency Injection readiness detection DAO
class SQDIDao extends check_in_1.Dao {
    constructor(dbEntityId) {
        super(dbEntityId, qSchema_1.Q);
    }
}
exports.SQDIDao = SQDIDao;
class BaseMissingRecordDao extends SQDIDao {
    static diSet() {
        return qSchema_1.diSet(4);
    }
    constructor() {
        super(4);
    }
}
exports.BaseMissingRecordDao = BaseMissingRecordDao;
class BaseMissingRecordRepoTransBlockDao extends SQDIDao {
    static diSet() {
        return qSchema_1.diSet(5);
    }
    constructor() {
        super(5);
    }
}
exports.BaseMissingRecordRepoTransBlockDao = BaseMissingRecordRepoTransBlockDao;
class BaseRecordUpdateStageDao extends SQDIDao {
    static diSet() {
        return qSchema_1.diSet(0);
    }
    constructor() {
        super(0);
    }
}
exports.BaseRecordUpdateStageDao = BaseRecordUpdateStageDao;
class BaseRepoTransBlockResponseStageDao extends SQDIDao {
    static diSet() {
        return qSchema_1.diSet(13);
    }
    constructor() {
        super(13);
    }
}
exports.BaseRepoTransBlockResponseStageDao = BaseRepoTransBlockResponseStageDao;
class BaseRepoTransBlockSchemaToChangeDao extends SQDIDao {
    static diSet() {
        return qSchema_1.diSet(10);
    }
    constructor() {
        super(10);
    }
}
exports.BaseRepoTransBlockSchemaToChangeDao = BaseRepoTransBlockSchemaToChangeDao;
class BaseRepositoryTransactionBlockDao extends SQDIDao {
    static diSet() {
        return qSchema_1.diSet(11);
    }
    constructor() {
        super(11);
    }
}
exports.BaseRepositoryTransactionBlockDao = BaseRepositoryTransactionBlockDao;
class BaseRepositoryTransactionHistoryUpdateStageDao extends SQDIDao {
    static diSet() {
        return qSchema_1.diSet(12);
    }
    constructor() {
        super(12);
    }
}
exports.BaseRepositoryTransactionHistoryUpdateStageDao = BaseRepositoryTransactionHistoryUpdateStageDao;
class BaseSharingMessageDao extends SQDIDao {
    static diSet() {
        return qSchema_1.diSet(8);
    }
    constructor() {
        super(8);
    }
}
exports.BaseSharingMessageDao = BaseSharingMessageDao;
class BaseSharingMessageRepoTransBlockDao extends SQDIDao {
    static diSet() {
        return qSchema_1.diSet(9);
    }
    constructor() {
        super(9);
    }
}
exports.BaseSharingMessageRepoTransBlockDao = BaseSharingMessageRepoTransBlockDao;
class BaseSharingNodeDao extends SQDIDao {
    static diSet() {
        return qSchema_1.diSet(7);
    }
    constructor() {
        super(7);
    }
}
exports.BaseSharingNodeDao = BaseSharingNodeDao;
class BaseSharingNodeRepoTransBlockDao extends SQDIDao {
    static diSet() {
        return qSchema_1.diSet(6);
    }
    constructor() {
        super(6);
    }
}
exports.BaseSharingNodeRepoTransBlockDao = BaseSharingNodeRepoTransBlockDao;
class BaseSharingNodeRepoTransBlockStageDao extends SQDIDao {
    static diSet() {
        return qSchema_1.diSet(16);
    }
    constructor() {
        super(16);
    }
}
exports.BaseSharingNodeRepoTransBlockStageDao = BaseSharingNodeRepoTransBlockStageDao;
class BaseSharingNodeRepositoryDao extends SQDIDao {
    static diSet() {
        return qSchema_1.diSet(15);
    }
    constructor() {
        super(15);
    }
}
exports.BaseSharingNodeRepositoryDao = BaseSharingNodeRepositoryDao;
class BaseSharingNodeTerminalDao extends SQDIDao {
    static diSet() {
        return qSchema_1.diSet(14);
    }
    constructor() {
        super(14);
    }
}
exports.BaseSharingNodeTerminalDao = BaseSharingNodeTerminalDao;
class BaseSynchronizationConflictDao extends SQDIDao {
    static diSet() {
        return qSchema_1.diSet(2);
    }
    constructor() {
        super(2);
    }
}
exports.BaseSynchronizationConflictDao = BaseSynchronizationConflictDao;
class BaseSynchronizationConflictPendingNotificationDao extends SQDIDao {
    static diSet() {
        return qSchema_1.diSet(3);
    }
    constructor() {
        super(3);
    }
}
exports.BaseSynchronizationConflictPendingNotificationDao = BaseSynchronizationConflictPendingNotificationDao;
class BaseSynchronizationConflictValuesDao extends SQDIDao {
    static diSet() {
        return qSchema_1.diSet(1);
    }
    constructor() {
        super(1);
    }
}
exports.BaseSynchronizationConflictValuesDao = BaseSynchronizationConflictValuesDao;
//# sourceMappingURL=baseDaos.js.map