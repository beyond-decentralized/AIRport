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
class BaseAgtRepositoryTransactionBlockDmo extends SQDIDmo {
    constructor() {
        super('AgtRepositoryTransactionBlock');
    }
}
exports.BaseAgtRepositoryTransactionBlockDmo = BaseAgtRepositoryTransactionBlockDmo;
class BaseAgtSharingMessageDmo extends SQDIDmo {
    constructor() {
        super('AgtSharingMessage');
    }
}
exports.BaseAgtSharingMessageDmo = BaseAgtSharingMessageDmo;
class BaseArchiveDmo extends SQDIDmo {
    constructor() {
        super('Archive');
    }
}
exports.BaseArchiveDmo = BaseArchiveDmo;
class BaseDailyArchiveLogDmo extends SQDIDmo {
    constructor() {
        super('DailyArchiveLog');
    }
}
exports.BaseDailyArchiveLogDmo = BaseDailyArchiveLogDmo;
class BaseDailyTerminalSyncLogDmo extends SQDIDmo {
    constructor() {
        super('DailyTerminalSyncLog');
    }
}
exports.BaseDailyTerminalSyncLogDmo = BaseDailyTerminalSyncLogDmo;
class BaseMonthlyArchiveLogDmo extends SQDIDmo {
    constructor() {
        super('MonthlyArchiveLog');
    }
}
exports.BaseMonthlyArchiveLogDmo = BaseMonthlyArchiveLogDmo;
class BaseMonthlyTerminalSyncLogDmo extends SQDIDmo {
    constructor() {
        super('MonthlyTerminalSyncLog');
    }
}
exports.BaseMonthlyTerminalSyncLogDmo = BaseMonthlyTerminalSyncLogDmo;
class BaseRepositoryDmo extends SQDIDmo {
    constructor() {
        super('Repository');
    }
}
exports.BaseRepositoryDmo = BaseRepositoryDmo;
class BaseRepositoryArchiveDmo extends SQDIDmo {
    constructor() {
        super('RepositoryArchive');
    }
}
exports.BaseRepositoryArchiveDmo = BaseRepositoryArchiveDmo;
class BaseSecurityAnswerDmo extends SQDIDmo {
    constructor() {
        super('SecurityAnswer');
    }
}
exports.BaseSecurityAnswerDmo = BaseSecurityAnswerDmo;
class BaseSecurityQuestionDmo extends SQDIDmo {
    constructor() {
        super('SecurityQuestion');
    }
}
exports.BaseSecurityQuestionDmo = BaseSecurityQuestionDmo;
class BaseServerDmo extends SQDIDmo {
    constructor() {
        super('Server');
    }
}
exports.BaseServerDmo = BaseServerDmo;
class BaseServerSyncLogDmo extends SQDIDmo {
    constructor() {
        super('ServerSyncLog');
    }
}
exports.BaseServerSyncLogDmo = BaseServerSyncLogDmo;
class BaseSyncLogDmo extends SQDIDmo {
    constructor() {
        super('SyncLog');
    }
}
exports.BaseSyncLogDmo = BaseSyncLogDmo;
class BaseTerminalDmo extends SQDIDmo {
    constructor() {
        super('Terminal');
    }
}
exports.BaseTerminalDmo = BaseTerminalDmo;
class BaseTerminalRepositoryDmo extends SQDIDmo {
    constructor() {
        super('TerminalRepository');
    }
}
exports.BaseTerminalRepositoryDmo = BaseTerminalRepositoryDmo;
class BaseTuningParametersDmo extends SQDIDmo {
    constructor() {
        super('TuningParameters');
    }
}
exports.BaseTuningParametersDmo = BaseTuningParametersDmo;
class BaseUserDmo extends SQDIDmo {
    constructor() {
        super('User');
    }
}
exports.BaseUserDmo = BaseUserDmo;
class BaseUserRepositoryDmo extends SQDIDmo {
    constructor() {
        super('UserRepository');
    }
}
exports.BaseUserRepositoryDmo = BaseUserRepositoryDmo;
//# sourceMappingURL=baseDmos.js.map