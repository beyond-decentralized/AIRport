"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const check_in_1 = require("@airport/check-in");
const qSchema_1 = require("./qSchema");
class BaseMissingRecordDmo extends check_in_1.Dmo {
    constructor() {
        super(qSchema_1.Q.db.currentVersion.entityMapByName['MissingRecord']);
    }
}
exports.BaseMissingRecordDmo = BaseMissingRecordDmo;
class BaseMissingRecordRepoTransBlockDmo extends check_in_1.Dmo {
    constructor() {
        super(qSchema_1.Q.db.currentVersion.entityMapByName['MissingRecordRepoTransBlock']);
    }
}
exports.BaseMissingRecordRepoTransBlockDmo = BaseMissingRecordRepoTransBlockDmo;
class BaseRecordUpdateStageDmo extends check_in_1.Dmo {
    constructor() {
        super(qSchema_1.Q.db.currentVersion.entityMapByName['RecordUpdateStage']);
    }
}
exports.BaseRecordUpdateStageDmo = BaseRecordUpdateStageDmo;
class BaseRepoTransBlockResponseStageDmo extends check_in_1.Dmo {
    constructor() {
        super(qSchema_1.Q.db.currentVersion.entityMapByName['RepoTransBlockResponseStage']);
    }
}
exports.BaseRepoTransBlockResponseStageDmo = BaseRepoTransBlockResponseStageDmo;
class BaseRepoTransBlockSchemasToChangeDmo extends check_in_1.Dmo {
    constructor() {
        super(qSchema_1.Q.db.currentVersion.entityMapByName['RepoTransBlockSchemasToChange']);
    }
}
exports.BaseRepoTransBlockSchemasToChangeDmo = BaseRepoTransBlockSchemasToChangeDmo;
class BaseRepositoryTransactionBlockDmo extends check_in_1.Dmo {
    constructor() {
        super(qSchema_1.Q.db.currentVersion.entityMapByName['RepositoryTransactionBlock']);
    }
}
exports.BaseRepositoryTransactionBlockDmo = BaseRepositoryTransactionBlockDmo;
class BaseRepositoryTransactionHistoryUpdateStageDmo extends check_in_1.Dmo {
    constructor() {
        super(qSchema_1.Q.db.currentVersion.entityMapByName['RepositoryTransactionHistoryUpdateStage']);
    }
}
exports.BaseRepositoryTransactionHistoryUpdateStageDmo = BaseRepositoryTransactionHistoryUpdateStageDmo;
class BaseSharingMessageDmo extends check_in_1.Dmo {
    constructor() {
        super(qSchema_1.Q.db.currentVersion.entityMapByName['SharingMessage']);
    }
}
exports.BaseSharingMessageDmo = BaseSharingMessageDmo;
class BaseSharingMessageRepoTransBlockDmo extends check_in_1.Dmo {
    constructor() {
        super(qSchema_1.Q.db.currentVersion.entityMapByName['SharingMessageRepoTransBlock']);
    }
}
exports.BaseSharingMessageRepoTransBlockDmo = BaseSharingMessageRepoTransBlockDmo;
class BaseSharingNodeDmo extends check_in_1.Dmo {
    constructor() {
        super(qSchema_1.Q.db.currentVersion.entityMapByName['SharingNode']);
    }
}
exports.BaseSharingNodeDmo = BaseSharingNodeDmo;
class BaseSharingNodeDatabaseDmo extends check_in_1.Dmo {
    constructor() {
        super(qSchema_1.Q.db.currentVersion.entityMapByName['SharingNodeDatabase']);
    }
}
exports.BaseSharingNodeDatabaseDmo = BaseSharingNodeDatabaseDmo;
class BaseSharingNodeRepoTransBlockDmo extends check_in_1.Dmo {
    constructor() {
        super(qSchema_1.Q.db.currentVersion.entityMapByName['SharingNodeRepoTransBlock']);
    }
}
exports.BaseSharingNodeRepoTransBlockDmo = BaseSharingNodeRepoTransBlockDmo;
class BaseSharingNodeRepoTransBlockStageDmo extends check_in_1.Dmo {
    constructor() {
        super(qSchema_1.Q.db.currentVersion.entityMapByName['SharingNodeRepoTransBlockStage']);
    }
}
exports.BaseSharingNodeRepoTransBlockStageDmo = BaseSharingNodeRepoTransBlockStageDmo;
class BaseSharingNodeRepositoryDmo extends check_in_1.Dmo {
    constructor() {
        super(qSchema_1.Q.db.currentVersion.entityMapByName['SharingNodeRepository']);
    }
}
exports.BaseSharingNodeRepositoryDmo = BaseSharingNodeRepositoryDmo;
class BaseSynchronizationConflictDmo extends check_in_1.Dmo {
    constructor() {
        super(qSchema_1.Q.db.currentVersion.entityMapByName['SynchronizationConflict']);
    }
}
exports.BaseSynchronizationConflictDmo = BaseSynchronizationConflictDmo;
class BaseSynchronizationConflictPendingNotificationDmo extends check_in_1.Dmo {
    constructor() {
        super(qSchema_1.Q.db.currentVersion.entityMapByName['SynchronizationConflictPendingNotification']);
    }
}
exports.BaseSynchronizationConflictPendingNotificationDmo = BaseSynchronizationConflictPendingNotificationDmo;
class BaseSynchronizationConflictValuesDmo extends check_in_1.Dmo {
    constructor() {
        super(qSchema_1.Q.db.currentVersion.entityMapByName['SynchronizationConflictValues']);
    }
}
exports.BaseSynchronizationConflictValuesDmo = BaseSynchronizationConflictValuesDmo;
//# sourceMappingURL=baseDmos.js.map