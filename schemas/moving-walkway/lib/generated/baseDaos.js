"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const check_in_1 = require("@airport/check-in");
const qSchema_1 = require("./qSchema");
class BaseMissingRecordDao extends check_in_1.Dao {
    constructor() {
        super(qSchema_1.Q.db.currentVersion.entityMapByName['MissingRecord'], qSchema_1.Q);
    }
}
exports.BaseMissingRecordDao = BaseMissingRecordDao;
class BaseMissingRecordRepoTransBlockDao extends check_in_1.Dao {
    constructor() {
        super(qSchema_1.Q.db.currentVersion.entityMapByName['MissingRecordRepoTransBlock'], qSchema_1.Q);
    }
}
exports.BaseMissingRecordRepoTransBlockDao = BaseMissingRecordRepoTransBlockDao;
class BaseRecordUpdateStageDao extends check_in_1.Dao {
    constructor() {
        super(qSchema_1.Q.db.currentVersion.entityMapByName['RecordUpdateStage'], qSchema_1.Q);
    }
}
exports.BaseRecordUpdateStageDao = BaseRecordUpdateStageDao;
class BaseRepoTransBlockResponseStageDao extends check_in_1.Dao {
    constructor() {
        super(qSchema_1.Q.db.currentVersion.entityMapByName['RepoTransBlockResponseStage'], qSchema_1.Q);
    }
}
exports.BaseRepoTransBlockResponseStageDao = BaseRepoTransBlockResponseStageDao;
class BaseRepoTransBlockSchemaToChangeDao extends check_in_1.Dao {
    constructor() {
        super(qSchema_1.Q.db.currentVersion.entityMapByName['RepoTransBlockSchemaToChange'], qSchema_1.Q);
    }
}
exports.BaseRepoTransBlockSchemaToChangeDao = BaseRepoTransBlockSchemaToChangeDao;
class BaseRepositoryTransactionBlockDao extends check_in_1.Dao {
    constructor() {
        super(qSchema_1.Q.db.currentVersion.entityMapByName['RepositoryTransactionBlock'], qSchema_1.Q);
    }
}
exports.BaseRepositoryTransactionBlockDao = BaseRepositoryTransactionBlockDao;
class BaseRepositoryTransactionHistoryUpdateStageDao extends check_in_1.Dao {
    constructor() {
        super(qSchema_1.Q.db.currentVersion.entityMapByName['RepositoryTransactionHistoryUpdateStage'], qSchema_1.Q);
    }
}
exports.BaseRepositoryTransactionHistoryUpdateStageDao = BaseRepositoryTransactionHistoryUpdateStageDao;
class BaseSharingMessageDao extends check_in_1.Dao {
    constructor() {
        super(qSchema_1.Q.db.currentVersion.entityMapByName['SharingMessage'], qSchema_1.Q);
    }
}
exports.BaseSharingMessageDao = BaseSharingMessageDao;
class BaseSharingMessageRepoTransBlockDao extends check_in_1.Dao {
    constructor() {
        super(qSchema_1.Q.db.currentVersion.entityMapByName['SharingMessageRepoTransBlock'], qSchema_1.Q);
    }
}
exports.BaseSharingMessageRepoTransBlockDao = BaseSharingMessageRepoTransBlockDao;
class BaseSharingNodeDao extends check_in_1.Dao {
    constructor() {
        super(qSchema_1.Q.db.currentVersion.entityMapByName['SharingNode'], qSchema_1.Q);
    }
}
exports.BaseSharingNodeDao = BaseSharingNodeDao;
class BaseSharingNodeRepoTransBlockDao extends check_in_1.Dao {
    constructor() {
        super(qSchema_1.Q.db.currentVersion.entityMapByName['SharingNodeRepoTransBlock'], qSchema_1.Q);
    }
}
exports.BaseSharingNodeRepoTransBlockDao = BaseSharingNodeRepoTransBlockDao;
class BaseSharingNodeRepoTransBlockStageDao extends check_in_1.Dao {
    constructor() {
        super(qSchema_1.Q.db.currentVersion.entityMapByName['SharingNodeRepoTransBlockStage'], qSchema_1.Q);
    }
}
exports.BaseSharingNodeRepoTransBlockStageDao = BaseSharingNodeRepoTransBlockStageDao;
class BaseSharingNodeRepositoryDao extends check_in_1.Dao {
    constructor() {
        super(qSchema_1.Q.db.currentVersion.entityMapByName['SharingNodeRepository'], qSchema_1.Q);
    }
}
exports.BaseSharingNodeRepositoryDao = BaseSharingNodeRepositoryDao;
class BaseSharingNodeTerminalDao extends check_in_1.Dao {
    constructor() {
        super(qSchema_1.Q.db.currentVersion.entityMapByName['SharingNodeTerminal'], qSchema_1.Q);
    }
}
exports.BaseSharingNodeTerminalDao = BaseSharingNodeTerminalDao;
class BaseSynchronizationConflictDao extends check_in_1.Dao {
    constructor() {
        super(qSchema_1.Q.db.currentVersion.entityMapByName['SynchronizationConflict'], qSchema_1.Q);
    }
}
exports.BaseSynchronizationConflictDao = BaseSynchronizationConflictDao;
class BaseSynchronizationConflictPendingNotificationDao extends check_in_1.Dao {
    constructor() {
        super(qSchema_1.Q.db.currentVersion.entityMapByName['SynchronizationConflictPendingNotification'], qSchema_1.Q);
    }
}
exports.BaseSynchronizationConflictPendingNotificationDao = BaseSynchronizationConflictPendingNotificationDao;
class BaseSynchronizationConflictValuesDao extends check_in_1.Dao {
    constructor() {
        super(qSchema_1.Q.db.currentVersion.entityMapByName['SynchronizationConflictValues'], qSchema_1.Q);
    }
}
exports.BaseSynchronizationConflictValuesDao = BaseSynchronizationConflictValuesDao;
//# sourceMappingURL=baseDaos.js.map