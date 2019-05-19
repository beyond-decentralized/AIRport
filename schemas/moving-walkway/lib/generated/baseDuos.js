"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const check_in_1 = require("@airport/check-in");
const qSchema_1 = require("./qSchema");
// Schema Q object Dependency Injection readiness detection DAO
class SQDIDuo extends check_in_1.Duo {
    constructor(dbEntityName) {
        super(dbEntityName, qSchema_1.Q);
    }
    static diSet() {
        return qSchema_1.Q.__dbSchema__;
    }
}
exports.SQDIDuo = SQDIDuo;
class BaseMissingRecordDuo extends SQDIDuo {
    constructor() {
        super('MissingRecord');
    }
}
exports.BaseMissingRecordDuo = BaseMissingRecordDuo;
class BaseMissingRecordRepoTransBlockDuo extends SQDIDuo {
    constructor() {
        super('MissingRecordRepoTransBlock');
    }
}
exports.BaseMissingRecordRepoTransBlockDuo = BaseMissingRecordRepoTransBlockDuo;
class BaseRecordUpdateStageDuo extends SQDIDuo {
    constructor() {
        super('RecordUpdateStage');
    }
}
exports.BaseRecordUpdateStageDuo = BaseRecordUpdateStageDuo;
class BaseRepoTransBlockResponseStageDuo extends SQDIDuo {
    constructor() {
        super('RepoTransBlockResponseStage');
    }
}
exports.BaseRepoTransBlockResponseStageDuo = BaseRepoTransBlockResponseStageDuo;
class BaseRepoTransBlockSchemaToChangeDuo extends SQDIDuo {
    constructor() {
        super('RepoTransBlockSchemaToChange');
    }
}
exports.BaseRepoTransBlockSchemaToChangeDuo = BaseRepoTransBlockSchemaToChangeDuo;
class BaseRepositoryTransactionBlockDuo extends SQDIDuo {
    constructor() {
        super('RepositoryTransactionBlock');
    }
}
exports.BaseRepositoryTransactionBlockDuo = BaseRepositoryTransactionBlockDuo;
class BaseRepositoryTransactionHistoryUpdateStageDuo extends SQDIDuo {
    constructor() {
        super('RepositoryTransactionHistoryUpdateStage');
    }
}
exports.BaseRepositoryTransactionHistoryUpdateStageDuo = BaseRepositoryTransactionHistoryUpdateStageDuo;
class BaseSharingMessageDuo extends SQDIDuo {
    constructor() {
        super('SharingMessage');
    }
}
exports.BaseSharingMessageDuo = BaseSharingMessageDuo;
class BaseSharingMessageRepoTransBlockDuo extends SQDIDuo {
    constructor() {
        super('SharingMessageRepoTransBlock');
    }
}
exports.BaseSharingMessageRepoTransBlockDuo = BaseSharingMessageRepoTransBlockDuo;
class BaseSharingNodeDuo extends SQDIDuo {
    constructor() {
        super('SharingNode');
    }
}
exports.BaseSharingNodeDuo = BaseSharingNodeDuo;
class BaseSharingNodeRepoTransBlockDuo extends SQDIDuo {
    constructor() {
        super('SharingNodeRepoTransBlock');
    }
}
exports.BaseSharingNodeRepoTransBlockDuo = BaseSharingNodeRepoTransBlockDuo;
class BaseSharingNodeRepoTransBlockStageDuo extends SQDIDuo {
    constructor() {
        super('SharingNodeRepoTransBlockStage');
    }
}
exports.BaseSharingNodeRepoTransBlockStageDuo = BaseSharingNodeRepoTransBlockStageDuo;
class BaseSharingNodeRepositoryDuo extends SQDIDuo {
    constructor() {
        super('SharingNodeRepository');
    }
}
exports.BaseSharingNodeRepositoryDuo = BaseSharingNodeRepositoryDuo;
class BaseSharingNodeTerminalDuo extends SQDIDuo {
    constructor() {
        super('SharingNodeTerminal');
    }
}
exports.BaseSharingNodeTerminalDuo = BaseSharingNodeTerminalDuo;
class BaseSynchronizationConflictDuo extends SQDIDuo {
    constructor() {
        super('SynchronizationConflict');
    }
}
exports.BaseSynchronizationConflictDuo = BaseSynchronizationConflictDuo;
class BaseSynchronizationConflictPendingNotificationDuo extends SQDIDuo {
    constructor() {
        super('SynchronizationConflictPendingNotification');
    }
}
exports.BaseSynchronizationConflictPendingNotificationDuo = BaseSynchronizationConflictPendingNotificationDuo;
class BaseSynchronizationConflictValuesDuo extends SQDIDuo {
    constructor() {
        super('SynchronizationConflictValues');
    }
}
exports.BaseSynchronizationConflictValuesDuo = BaseSynchronizationConflictValuesDuo;
//# sourceMappingURL=baseDuos.js.map