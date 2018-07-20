"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const check_in_1 = require("@airport/check-in");
const qSchema_1 = require("./qSchema");
class BaseMissingRecordDao extends check_in_1.Dao {
    constructor(utils) {
        super(qSchema_1.Q.db.currentVersion.entityMapByName['MissingRecord'], qSchema_1.Q, utils);
    }
}
exports.BaseMissingRecordDao = BaseMissingRecordDao;
class BaseMissingRecordRepoTransBlockDao extends check_in_1.Dao {
    constructor(utils) {
        super(qSchema_1.Q.db.currentVersion.entityMapByName['MissingRecordRepoTransBlock'], qSchema_1.Q, utils);
    }
}
exports.BaseMissingRecordRepoTransBlockDao = BaseMissingRecordRepoTransBlockDao;
class BaseRecordUpdateStageDao extends check_in_1.Dao {
    constructor(utils) {
        super(qSchema_1.Q.db.currentVersion.entityMapByName['RecordUpdateStage'], qSchema_1.Q, utils);
    }
}
exports.BaseRecordUpdateStageDao = BaseRecordUpdateStageDao;
class BaseRepoTransBlockResponseStageDao extends check_in_1.Dao {
    constructor(utils) {
        super(qSchema_1.Q.db.currentVersion.entityMapByName['RepoTransBlockResponseStage'], qSchema_1.Q, utils);
    }
}
exports.BaseRepoTransBlockResponseStageDao = BaseRepoTransBlockResponseStageDao;
class BaseRepoTransBlockSchemasToChangeDao extends check_in_1.Dao {
    constructor(utils) {
        super(qSchema_1.Q.db.currentVersion.entityMapByName['RepoTransBlockSchemasToChange'], qSchema_1.Q, utils);
    }
}
exports.BaseRepoTransBlockSchemasToChangeDao = BaseRepoTransBlockSchemasToChangeDao;
class BaseRepositoryTransactionBlockDao extends check_in_1.Dao {
    constructor(utils) {
        super(qSchema_1.Q.db.currentVersion.entityMapByName['RepositoryTransactionBlock'], qSchema_1.Q, utils);
    }
}
exports.BaseRepositoryTransactionBlockDao = BaseRepositoryTransactionBlockDao;
class BaseRepositoryTransactionHistoryUpdateStageDao extends check_in_1.Dao {
    constructor(utils) {
        super(qSchema_1.Q.db.currentVersion.entityMapByName['RepositoryTransactionHistoryUpdateStage'], qSchema_1.Q, utils);
    }
}
exports.BaseRepositoryTransactionHistoryUpdateStageDao = BaseRepositoryTransactionHistoryUpdateStageDao;
class BaseSharingMessageDao extends check_in_1.Dao {
    constructor(utils) {
        super(qSchema_1.Q.db.currentVersion.entityMapByName['SharingMessage'], qSchema_1.Q, utils);
    }
}
exports.BaseSharingMessageDao = BaseSharingMessageDao;
class BaseSharingMessageRepoTransBlockDao extends check_in_1.Dao {
    constructor(utils) {
        super(qSchema_1.Q.db.currentVersion.entityMapByName['SharingMessageRepoTransBlock'], qSchema_1.Q, utils);
    }
}
exports.BaseSharingMessageRepoTransBlockDao = BaseSharingMessageRepoTransBlockDao;
class BaseSharingNodeDao extends check_in_1.Dao {
    constructor(utils) {
        super(qSchema_1.Q.db.currentVersion.entityMapByName['SharingNode'], qSchema_1.Q, utils);
    }
}
exports.BaseSharingNodeDao = BaseSharingNodeDao;
class BaseSharingNodeRepoTransBlockDao extends check_in_1.Dao {
    constructor(utils) {
        super(qSchema_1.Q.db.currentVersion.entityMapByName['SharingNodeRepoTransBlock'], qSchema_1.Q, utils);
    }
}
exports.BaseSharingNodeRepoTransBlockDao = BaseSharingNodeRepoTransBlockDao;
class BaseSharingNodeRepoTransBlockStageDao extends check_in_1.Dao {
    constructor(utils) {
        super(qSchema_1.Q.db.currentVersion.entityMapByName['SharingNodeRepoTransBlockStage'], qSchema_1.Q, utils);
    }
}
exports.BaseSharingNodeRepoTransBlockStageDao = BaseSharingNodeRepoTransBlockStageDao;
class BaseSharingNodeRepositoryDao extends check_in_1.Dao {
    constructor(utils) {
        super(qSchema_1.Q.db.currentVersion.entityMapByName['SharingNodeRepository'], qSchema_1.Q, utils);
    }
}
exports.BaseSharingNodeRepositoryDao = BaseSharingNodeRepositoryDao;
class BaseSharingNodeTerminalDao extends check_in_1.Dao {
    constructor(utils) {
        super(qSchema_1.Q.db.currentVersion.entityMapByName['SharingNodeTerminal'], qSchema_1.Q, utils);
    }
}
exports.BaseSharingNodeTerminalDao = BaseSharingNodeTerminalDao;
class BaseSynchronizationConflictDao extends check_in_1.Dao {
    constructor(utils) {
        super(qSchema_1.Q.db.currentVersion.entityMapByName['SynchronizationConflict'], qSchema_1.Q, utils);
    }
}
exports.BaseSynchronizationConflictDao = BaseSynchronizationConflictDao;
class BaseSynchronizationConflictPendingNotificationDao extends check_in_1.Dao {
    constructor(utils) {
        super(qSchema_1.Q.db.currentVersion.entityMapByName['SynchronizationConflictPendingNotification'], qSchema_1.Q, utils);
    }
}
exports.BaseSynchronizationConflictPendingNotificationDao = BaseSynchronizationConflictPendingNotificationDao;
class BaseSynchronizationConflictValuesDao extends check_in_1.Dao {
    constructor(utils) {
        super(qSchema_1.Q.db.currentVersion.entityMapByName['SynchronizationConflictValues'], qSchema_1.Q, utils);
    }
}
exports.BaseSynchronizationConflictValuesDao = BaseSynchronizationConflictValuesDao;
//# sourceMappingURL=baseDaos.js.map