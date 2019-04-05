"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const check_in_1 = require("@airport/check-in");
const qSchema_1 = require("./qSchema");
// Schema Q object Dependency Injection readiness detection DAO
class SQDIDao extends check_in_1.Dao {
    constructor(dbEntityName, qSchema) {
        super(dbEntityName, qSchema);
    }
    static diSet() {
        return qSchema_1.Q.db;
    }
}
exports.SQDIDao = SQDIDao;
class BaseMissingRecordDao extends SQDIDao {
    constructor() {
        super('MissingRecord', qSchema_1.Q);
    }
}
exports.BaseMissingRecordDao = BaseMissingRecordDao;
class BaseMissingRecordRepoTransBlockDao extends SQDIDao {
    constructor() {
        super('MissingRecordRepoTransBlock', qSchema_1.Q);
    }
}
exports.BaseMissingRecordRepoTransBlockDao = BaseMissingRecordRepoTransBlockDao;
class BaseRecordUpdateStageDao extends SQDIDao {
    constructor() {
        super('RecordUpdateStage', qSchema_1.Q);
    }
}
exports.BaseRecordUpdateStageDao = BaseRecordUpdateStageDao;
class BaseRepoTransBlockResponseStageDao extends SQDIDao {
    constructor() {
        super('RepoTransBlockResponseStage', qSchema_1.Q);
    }
}
exports.BaseRepoTransBlockResponseStageDao = BaseRepoTransBlockResponseStageDao;
class BaseRepoTransBlockSchemaToChangeDao extends SQDIDao {
    constructor() {
        super('RepoTransBlockSchemaToChange', qSchema_1.Q);
    }
}
exports.BaseRepoTransBlockSchemaToChangeDao = BaseRepoTransBlockSchemaToChangeDao;
class BaseRepositoryTransactionBlockDao extends SQDIDao {
    constructor() {
        super('RepositoryTransactionBlock', qSchema_1.Q);
    }
}
exports.BaseRepositoryTransactionBlockDao = BaseRepositoryTransactionBlockDao;
class BaseRepositoryTransactionHistoryUpdateStageDao extends SQDIDao {
    constructor() {
        super('RepositoryTransactionHistoryUpdateStage', qSchema_1.Q);
    }
}
exports.BaseRepositoryTransactionHistoryUpdateStageDao = BaseRepositoryTransactionHistoryUpdateStageDao;
class BaseSharingMessageDao extends SQDIDao {
    constructor() {
        super('SharingMessage', qSchema_1.Q);
    }
}
exports.BaseSharingMessageDao = BaseSharingMessageDao;
class BaseSharingMessageRepoTransBlockDao extends SQDIDao {
    constructor() {
        super('SharingMessageRepoTransBlock', qSchema_1.Q);
    }
}
exports.BaseSharingMessageRepoTransBlockDao = BaseSharingMessageRepoTransBlockDao;
class BaseSharingNodeDao extends SQDIDao {
    constructor() {
        super('SharingNode', qSchema_1.Q);
    }
}
exports.BaseSharingNodeDao = BaseSharingNodeDao;
class BaseSharingNodeRepoTransBlockDao extends SQDIDao {
    constructor() {
        super('SharingNodeRepoTransBlock', qSchema_1.Q);
    }
}
exports.BaseSharingNodeRepoTransBlockDao = BaseSharingNodeRepoTransBlockDao;
class BaseSharingNodeRepoTransBlockStageDao extends SQDIDao {
    constructor() {
        super('SharingNodeRepoTransBlockStage', qSchema_1.Q);
    }
}
exports.BaseSharingNodeRepoTransBlockStageDao = BaseSharingNodeRepoTransBlockStageDao;
class BaseSharingNodeRepositoryDao extends SQDIDao {
    constructor() {
        super('SharingNodeRepository', qSchema_1.Q);
    }
}
exports.BaseSharingNodeRepositoryDao = BaseSharingNodeRepositoryDao;
class BaseSharingNodeTerminalDao extends SQDIDao {
    constructor() {
        super('SharingNodeTerminal', qSchema_1.Q);
    }
}
exports.BaseSharingNodeTerminalDao = BaseSharingNodeTerminalDao;
class BaseSynchronizationConflictDao extends SQDIDao {
    constructor() {
        super('SynchronizationConflict', qSchema_1.Q);
    }
}
exports.BaseSynchronizationConflictDao = BaseSynchronizationConflictDao;
class BaseSynchronizationConflictPendingNotificationDao extends SQDIDao {
    constructor() {
        super('SynchronizationConflictPendingNotification', qSchema_1.Q);
    }
}
exports.BaseSynchronizationConflictPendingNotificationDao = BaseSynchronizationConflictPendingNotificationDao;
class BaseSynchronizationConflictValuesDao extends SQDIDao {
    constructor() {
        super('SynchronizationConflictValues', qSchema_1.Q);
    }
}
exports.BaseSynchronizationConflictValuesDao = BaseSynchronizationConflictValuesDao;
//# sourceMappingURL=baseDaos.js.map