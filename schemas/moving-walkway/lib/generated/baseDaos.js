"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const check_in_1 = require("@airport/check-in");
const qSchema_1 = require("./qSchema");
// Schema Q object Dependency Injection readiness detection DAO
class SQDIDao extends check_in_1.Dao {
    constructor(dbEntityName) {
        super(dbEntityName, qSchema_1.Q);
    }
    static diSet() {
        return qSchema_1.Q.__dbSchema__;
    }
}
exports.SQDIDao = SQDIDao;
class BaseMissingRecordDao extends SQDIDao {
    constructor() {
        super('MissingRecord');
    }
}
exports.BaseMissingRecordDao = BaseMissingRecordDao;
class BaseMissingRecordRepoTransBlockDao extends SQDIDao {
    constructor() {
        super('MissingRecordRepoTransBlock');
    }
}
exports.BaseMissingRecordRepoTransBlockDao = BaseMissingRecordRepoTransBlockDao;
class BaseRecordUpdateStageDao extends SQDIDao {
    constructor() {
        super('RecordUpdateStage');
    }
}
exports.BaseRecordUpdateStageDao = BaseRecordUpdateStageDao;
class BaseRepoTransBlockResponseStageDao extends SQDIDao {
    constructor() {
        super('RepoTransBlockResponseStage');
    }
}
exports.BaseRepoTransBlockResponseStageDao = BaseRepoTransBlockResponseStageDao;
class BaseRepoTransBlockSchemaToChangeDao extends SQDIDao {
    constructor() {
        super('RepoTransBlockSchemaToChange');
    }
}
exports.BaseRepoTransBlockSchemaToChangeDao = BaseRepoTransBlockSchemaToChangeDao;
class BaseRepositoryTransactionBlockDao extends SQDIDao {
    constructor() {
        super('RepositoryTransactionBlock');
    }
}
exports.BaseRepositoryTransactionBlockDao = BaseRepositoryTransactionBlockDao;
class BaseRepositoryTransactionHistoryUpdateStageDao extends SQDIDao {
    constructor() {
        super('RepositoryTransactionHistoryUpdateStage');
    }
}
exports.BaseRepositoryTransactionHistoryUpdateStageDao = BaseRepositoryTransactionHistoryUpdateStageDao;
class BaseSharingMessageDao extends SQDIDao {
    constructor() {
        super('SharingMessage');
    }
}
exports.BaseSharingMessageDao = BaseSharingMessageDao;
class BaseSharingMessageRepoTransBlockDao extends SQDIDao {
    constructor() {
        super('SharingMessageRepoTransBlock');
    }
}
exports.BaseSharingMessageRepoTransBlockDao = BaseSharingMessageRepoTransBlockDao;
class BaseSharingNodeDao extends SQDIDao {
    constructor() {
        super('SharingNode');
    }
}
exports.BaseSharingNodeDao = BaseSharingNodeDao;
class BaseSharingNodeRepoTransBlockDao extends SQDIDao {
    constructor() {
        super('SharingNodeRepoTransBlock');
    }
}
exports.BaseSharingNodeRepoTransBlockDao = BaseSharingNodeRepoTransBlockDao;
class BaseSharingNodeRepoTransBlockStageDao extends SQDIDao {
    constructor() {
        super('SharingNodeRepoTransBlockStage');
    }
}
exports.BaseSharingNodeRepoTransBlockStageDao = BaseSharingNodeRepoTransBlockStageDao;
class BaseSharingNodeRepositoryDao extends SQDIDao {
    constructor() {
        super('SharingNodeRepository');
    }
}
exports.BaseSharingNodeRepositoryDao = BaseSharingNodeRepositoryDao;
class BaseSharingNodeTerminalDao extends SQDIDao {
    constructor() {
        super('SharingNodeTerminal');
    }
}
exports.BaseSharingNodeTerminalDao = BaseSharingNodeTerminalDao;
class BaseSynchronizationConflictDao extends SQDIDao {
    constructor() {
        super('SynchronizationConflict');
    }
}
exports.BaseSynchronizationConflictDao = BaseSynchronizationConflictDao;
class BaseSynchronizationConflictPendingNotificationDao extends SQDIDao {
    constructor() {
        super('SynchronizationConflictPendingNotification');
    }
}
exports.BaseSynchronizationConflictPendingNotificationDao = BaseSynchronizationConflictPendingNotificationDao;
class BaseSynchronizationConflictValuesDao extends SQDIDao {
    constructor() {
        super('SynchronizationConflictValues');
    }
}
exports.BaseSynchronizationConflictValuesDao = BaseSynchronizationConflictValuesDao;
//# sourceMappingURL=baseDaos.js.map