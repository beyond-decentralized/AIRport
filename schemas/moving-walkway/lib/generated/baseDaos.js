"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const check_in_1 = require("@airport/check-in");
const qSchema_1 = require("./qSchema");
// Schema Q object Dependency Injection readiness detection Dao
class SQDIDao extends check_in_1.Dao {
    constructor(dbEntityId) {
        super(dbEntityId, qSchema_1.Q);
    }
}
exports.SQDIDao = SQDIDao;
class BaseMissingRecordDao extends SQDIDao {
    static diSet() {
        return qSchema_1.duoDiSet(3);
    }
    constructor() {
        super(3);
    }
}
exports.BaseMissingRecordDao = BaseMissingRecordDao;
class BaseMissingRecordRepoTransBlockDao extends SQDIDao {
    static diSet() {
        return qSchema_1.duoDiSet(16);
    }
    constructor() {
        super(16);
    }
}
exports.BaseMissingRecordRepoTransBlockDao = BaseMissingRecordRepoTransBlockDao;
class BaseRecordUpdateStageDao extends SQDIDao {
    static diSet() {
        return qSchema_1.duoDiSet(4);
    }
    constructor() {
        super(4);
    }
}
exports.BaseRecordUpdateStageDao = BaseRecordUpdateStageDao;
class BaseRepoTransBlockResponseStageDao extends SQDIDao {
    static diSet() {
        return qSchema_1.duoDiSet(5);
    }
    constructor() {
        super(5);
    }
}
exports.BaseRepoTransBlockResponseStageDao = BaseRepoTransBlockResponseStageDao;
class BaseRepoTransBlockSchemaToChangeDao extends SQDIDao {
    static diSet() {
        return qSchema_1.duoDiSet(6);
    }
    constructor() {
        super(6);
    }
}
exports.BaseRepoTransBlockSchemaToChangeDao = BaseRepoTransBlockSchemaToChangeDao;
class BaseRepositoryTransactionBlockDao extends SQDIDao {
    static diSet() {
        return qSchema_1.duoDiSet(15);
    }
    constructor() {
        super(15);
    }
}
exports.BaseRepositoryTransactionBlockDao = BaseRepositoryTransactionBlockDao;
class BaseRepositoryTransactionHistoryUpdateStageDao extends SQDIDao {
    static diSet() {
        return qSchema_1.duoDiSet(7);
    }
    constructor() {
        super(7);
    }
}
exports.BaseRepositoryTransactionHistoryUpdateStageDao = BaseRepositoryTransactionHistoryUpdateStageDao;
class BaseSharingMessageDao extends SQDIDao {
    static diSet() {
        return qSchema_1.duoDiSet(13);
    }
    constructor() {
        super(13);
    }
}
exports.BaseSharingMessageDao = BaseSharingMessageDao;
class BaseSharingMessageRepoTransBlockDao extends SQDIDao {
    static diSet() {
        return qSchema_1.duoDiSet(14);
    }
    constructor() {
        super(14);
    }
}
exports.BaseSharingMessageRepoTransBlockDao = BaseSharingMessageRepoTransBlockDao;
class BaseSharingNodeDao extends SQDIDao {
    static diSet() {
        return qSchema_1.duoDiSet(9);
    }
    constructor() {
        super(9);
    }
}
exports.BaseSharingNodeDao = BaseSharingNodeDao;
class BaseSharingNodeRepoTransBlockDao extends SQDIDao {
    static diSet() {
        return qSchema_1.duoDiSet(8);
    }
    constructor() {
        super(8);
    }
}
exports.BaseSharingNodeRepoTransBlockDao = BaseSharingNodeRepoTransBlockDao;
class BaseSharingNodeRepoTransBlockStageDao extends SQDIDao {
    static diSet() {
        return qSchema_1.duoDiSet(10);
    }
    constructor() {
        super(10);
    }
}
exports.BaseSharingNodeRepoTransBlockStageDao = BaseSharingNodeRepoTransBlockStageDao;
class BaseSharingNodeRepositoryDao extends SQDIDao {
    static diSet() {
        return qSchema_1.duoDiSet(11);
    }
    constructor() {
        super(11);
    }
}
exports.BaseSharingNodeRepositoryDao = BaseSharingNodeRepositoryDao;
class BaseSharingNodeTerminalDao extends SQDIDao {
    static diSet() {
        return qSchema_1.duoDiSet(12);
    }
    constructor() {
        super(12);
    }
}
exports.BaseSharingNodeTerminalDao = BaseSharingNodeTerminalDao;
class BaseSynchronizationConflictDao extends SQDIDao {
    static diSet() {
        return qSchema_1.duoDiSet(1);
    }
    constructor() {
        super(1);
    }
}
exports.BaseSynchronizationConflictDao = BaseSynchronizationConflictDao;
class BaseSynchronizationConflictPendingNotificationDao extends SQDIDao {
    static diSet() {
        return qSchema_1.duoDiSet(2);
    }
    constructor() {
        super(2);
    }
}
exports.BaseSynchronizationConflictPendingNotificationDao = BaseSynchronizationConflictPendingNotificationDao;
class BaseSynchronizationConflictValuesDao extends SQDIDao {
    static diSet() {
        return qSchema_1.duoDiSet(0);
    }
    constructor() {
        super(0);
    }
}
exports.BaseSynchronizationConflictValuesDao = BaseSynchronizationConflictValuesDao;
//# sourceMappingURL=baseDaos.js.map