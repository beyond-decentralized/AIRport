"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const check_in_1 = require("@airport/check-in");
const qSchema_1 = require("./qSchema");
// Schema Q object Dependency Injection readiness detection DAO
class SQDIDuo extends check_in_1.Duo {
    constructor(dbEntityId) {
        super(dbEntityId, qSchema_1.Q);
    }
}
exports.SQDIDuo = SQDIDuo;
class BaseMissingRecordDuo extends SQDIDuo {
    static diSet() {
        return qSchema_1.duoDiSet(3);
    }
    constructor() {
        super(3);
    }
}
exports.BaseMissingRecordDuo = BaseMissingRecordDuo;
class BaseMissingRecordRepoTransBlockDuo extends SQDIDuo {
    static diSet() {
        return qSchema_1.duoDiSet(4);
    }
    constructor() {
        super(4);
    }
}
exports.BaseMissingRecordRepoTransBlockDuo = BaseMissingRecordRepoTransBlockDuo;
class BaseRecordUpdateStageDuo extends SQDIDuo {
    static diSet() {
        return qSchema_1.duoDiSet(5);
    }
    constructor() {
        super(5);
    }
}
exports.BaseRecordUpdateStageDuo = BaseRecordUpdateStageDuo;
class BaseRepoTransBlockResponseStageDuo extends SQDIDuo {
    static diSet() {
        return qSchema_1.duoDiSet(6);
    }
    constructor() {
        super(6);
    }
}
exports.BaseRepoTransBlockResponseStageDuo = BaseRepoTransBlockResponseStageDuo;
class BaseRepoTransBlockSchemaToChangeDuo extends SQDIDuo {
    static diSet() {
        return qSchema_1.duoDiSet(7);
    }
    constructor() {
        super(7);
    }
}
exports.BaseRepoTransBlockSchemaToChangeDuo = BaseRepoTransBlockSchemaToChangeDuo;
class BaseRepositoryTransactionBlockDuo extends SQDIDuo {
    static diSet() {
        return qSchema_1.duoDiSet(16);
    }
    constructor() {
        super(16);
    }
}
exports.BaseRepositoryTransactionBlockDuo = BaseRepositoryTransactionBlockDuo;
class BaseRepositoryTransactionHistoryUpdateStageDuo extends SQDIDuo {
    static diSet() {
        return qSchema_1.duoDiSet(8);
    }
    constructor() {
        super(8);
    }
}
exports.BaseRepositoryTransactionHistoryUpdateStageDuo = BaseRepositoryTransactionHistoryUpdateStageDuo;
class BaseSharingMessageDuo extends SQDIDuo {
    static diSet() {
        return qSchema_1.duoDiSet(14);
    }
    constructor() {
        super(14);
    }
}
exports.BaseSharingMessageDuo = BaseSharingMessageDuo;
class BaseSharingMessageRepoTransBlockDuo extends SQDIDuo {
    static diSet() {
        return qSchema_1.duoDiSet(15);
    }
    constructor() {
        super(15);
    }
}
exports.BaseSharingMessageRepoTransBlockDuo = BaseSharingMessageRepoTransBlockDuo;
class BaseSharingNodeDuo extends SQDIDuo {
    static diSet() {
        return qSchema_1.duoDiSet(10);
    }
    constructor() {
        super(10);
    }
}
exports.BaseSharingNodeDuo = BaseSharingNodeDuo;
class BaseSharingNodeRepoTransBlockDuo extends SQDIDuo {
    static diSet() {
        return qSchema_1.duoDiSet(9);
    }
    constructor() {
        super(9);
    }
}
exports.BaseSharingNodeRepoTransBlockDuo = BaseSharingNodeRepoTransBlockDuo;
class BaseSharingNodeRepoTransBlockStageDuo extends SQDIDuo {
    static diSet() {
        return qSchema_1.duoDiSet(11);
    }
    constructor() {
        super(11);
    }
}
exports.BaseSharingNodeRepoTransBlockStageDuo = BaseSharingNodeRepoTransBlockStageDuo;
class BaseSharingNodeRepositoryDuo extends SQDIDuo {
    static diSet() {
        return qSchema_1.duoDiSet(12);
    }
    constructor() {
        super(12);
    }
}
exports.BaseSharingNodeRepositoryDuo = BaseSharingNodeRepositoryDuo;
class BaseSharingNodeTerminalDuo extends SQDIDuo {
    static diSet() {
        return qSchema_1.duoDiSet(13);
    }
    constructor() {
        super(13);
    }
}
exports.BaseSharingNodeTerminalDuo = BaseSharingNodeTerminalDuo;
class BaseSynchronizationConflictDuo extends SQDIDuo {
    static diSet() {
        return qSchema_1.duoDiSet(1);
    }
    constructor() {
        super(1);
    }
}
exports.BaseSynchronizationConflictDuo = BaseSynchronizationConflictDuo;
class BaseSynchronizationConflictPendingNotificationDuo extends SQDIDuo {
    static diSet() {
        return qSchema_1.duoDiSet(2);
    }
    constructor() {
        super(2);
    }
}
exports.BaseSynchronizationConflictPendingNotificationDuo = BaseSynchronizationConflictPendingNotificationDuo;
class BaseSynchronizationConflictValuesDuo extends SQDIDuo {
    static diSet() {
        return qSchema_1.duoDiSet(0);
    }
    constructor() {
        super(0);
    }
}
exports.BaseSynchronizationConflictValuesDuo = BaseSynchronizationConflictValuesDuo;
//# sourceMappingURL=baseDuos.js.map