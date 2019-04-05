"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const check_in_1 = require("@airport/check-in");
const qSchema_1 = require("./qSchema");
// Schema Q object Dependency Injection readiness detection DAO
class SQDIDmo extends check_in_1.Dmo {
    constructor(dbEntityName) {
        super(dbEntityName, qSchema_1.Q);
    }
    static diSet() {
        return qSchema_1.Q.db;
    }
}
exports.SQDIDmo = SQDIDmo;
class BaseMissingRecordDmo extends SQDIDmo {
    constructor() {
        super('MissingRecord');
    }
}
exports.BaseMissingRecordDmo = BaseMissingRecordDmo;
class BaseMissingRecordRepoTransBlockDmo extends SQDIDmo {
    constructor() {
        super('MissingRecordRepoTransBlock');
    }
}
exports.BaseMissingRecordRepoTransBlockDmo = BaseMissingRecordRepoTransBlockDmo;
class BaseRecordUpdateStageDmo extends SQDIDmo {
    constructor() {
        super('RecordUpdateStage');
    }
}
exports.BaseRecordUpdateStageDmo = BaseRecordUpdateStageDmo;
class BaseRepoTransBlockResponseStageDmo extends SQDIDmo {
    constructor() {
        super('RepoTransBlockResponseStage');
    }
}
exports.BaseRepoTransBlockResponseStageDmo = BaseRepoTransBlockResponseStageDmo;
class BaseRepoTransBlockSchemaToChangeDmo extends SQDIDmo {
    constructor() {
        super('RepoTransBlockSchemaToChange');
    }
}
exports.BaseRepoTransBlockSchemaToChangeDmo = BaseRepoTransBlockSchemaToChangeDmo;
class BaseRepositoryTransactionBlockDmo extends SQDIDmo {
    constructor() {
        super('RepositoryTransactionBlock');
    }
}
exports.BaseRepositoryTransactionBlockDmo = BaseRepositoryTransactionBlockDmo;
class BaseRepositoryTransactionHistoryUpdateStageDmo extends SQDIDmo {
    constructor() {
        super('RepositoryTransactionHistoryUpdateStage');
    }
}
exports.BaseRepositoryTransactionHistoryUpdateStageDmo = BaseRepositoryTransactionHistoryUpdateStageDmo;
class BaseSharingMessageDmo extends SQDIDmo {
    constructor() {
        super('SharingMessage');
    }
}
exports.BaseSharingMessageDmo = BaseSharingMessageDmo;
class BaseSharingMessageRepoTransBlockDmo extends SQDIDmo {
    constructor() {
        super('SharingMessageRepoTransBlock');
    }
}
exports.BaseSharingMessageRepoTransBlockDmo = BaseSharingMessageRepoTransBlockDmo;
class BaseSharingNodeDmo extends SQDIDmo {
    constructor() {
        super('SharingNode');
    }
}
exports.BaseSharingNodeDmo = BaseSharingNodeDmo;
class BaseSharingNodeRepoTransBlockDmo extends SQDIDmo {
    constructor() {
        super('SharingNodeRepoTransBlock');
    }
}
exports.BaseSharingNodeRepoTransBlockDmo = BaseSharingNodeRepoTransBlockDmo;
class BaseSharingNodeRepoTransBlockStageDmo extends SQDIDmo {
    constructor() {
        super('SharingNodeRepoTransBlockStage');
    }
}
exports.BaseSharingNodeRepoTransBlockStageDmo = BaseSharingNodeRepoTransBlockStageDmo;
class BaseSharingNodeRepositoryDmo extends SQDIDmo {
    constructor() {
        super('SharingNodeRepository');
    }
}
exports.BaseSharingNodeRepositoryDmo = BaseSharingNodeRepositoryDmo;
class BaseSharingNodeTerminalDmo extends SQDIDmo {
    constructor() {
        super('SharingNodeTerminal');
    }
}
exports.BaseSharingNodeTerminalDmo = BaseSharingNodeTerminalDmo;
class BaseSynchronizationConflictDmo extends SQDIDmo {
    constructor() {
        super('SynchronizationConflict');
    }
}
exports.BaseSynchronizationConflictDmo = BaseSynchronizationConflictDmo;
class BaseSynchronizationConflictPendingNotificationDmo extends SQDIDmo {
    constructor() {
        super('SynchronizationConflictPendingNotification');
    }
}
exports.BaseSynchronizationConflictPendingNotificationDmo = BaseSynchronizationConflictPendingNotificationDmo;
class BaseSynchronizationConflictValuesDmo extends SQDIDmo {
    constructor() {
        super('SynchronizationConflictValues');
    }
}
exports.BaseSynchronizationConflictValuesDmo = BaseSynchronizationConflictValuesDmo;
//# sourceMappingURL=baseDmos.js.map