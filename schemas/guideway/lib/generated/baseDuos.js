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
        return qSchema_1.Q.db;
    }
}
exports.SQDIDuo = SQDIDuo;
class BaseAgtRepositoryTransactionBlockDuo extends SQDIDuo {
    constructor() {
        super('AgtRepositoryTransactionBlock');
    }
}
exports.BaseAgtRepositoryTransactionBlockDuo = BaseAgtRepositoryTransactionBlockDuo;
class BaseAgtSharingMessageDuo extends SQDIDuo {
    constructor() {
        super('AgtSharingMessage');
    }
}
exports.BaseAgtSharingMessageDuo = BaseAgtSharingMessageDuo;
class BaseArchiveDuo extends SQDIDuo {
    constructor() {
        super('Archive');
    }
}
exports.BaseArchiveDuo = BaseArchiveDuo;
class BaseDailyArchiveLogDuo extends SQDIDuo {
    constructor() {
        super('DailyArchiveLog');
    }
}
exports.BaseDailyArchiveLogDuo = BaseDailyArchiveLogDuo;
class BaseDailyTerminalSyncLogDuo extends SQDIDuo {
    constructor() {
        super('DailyTerminalSyncLog');
    }
}
exports.BaseDailyTerminalSyncLogDuo = BaseDailyTerminalSyncLogDuo;
class BaseMonthlyArchiveLogDuo extends SQDIDuo {
    constructor() {
        super('MonthlyArchiveLog');
    }
}
exports.BaseMonthlyArchiveLogDuo = BaseMonthlyArchiveLogDuo;
class BaseMonthlyTerminalSyncLogDuo extends SQDIDuo {
    constructor() {
        super('MonthlyTerminalSyncLog');
    }
}
exports.BaseMonthlyTerminalSyncLogDuo = BaseMonthlyTerminalSyncLogDuo;
class BaseRepositoryDuo extends SQDIDuo {
    constructor() {
        super('Repository');
    }
}
exports.BaseRepositoryDuo = BaseRepositoryDuo;
class BaseRepositoryArchiveDuo extends SQDIDuo {
    constructor() {
        super('RepositoryArchive');
    }
}
exports.BaseRepositoryArchiveDuo = BaseRepositoryArchiveDuo;
class BaseSecurityAnswerDuo extends SQDIDuo {
    constructor() {
        super('SecurityAnswer');
    }
}
exports.BaseSecurityAnswerDuo = BaseSecurityAnswerDuo;
class BaseSecurityQuestionDuo extends SQDIDuo {
    constructor() {
        super('SecurityQuestion');
    }
}
exports.BaseSecurityQuestionDuo = BaseSecurityQuestionDuo;
class BaseServerDuo extends SQDIDuo {
    constructor() {
        super('Server');
    }
}
exports.BaseServerDuo = BaseServerDuo;
class BaseServerSyncLogDuo extends SQDIDuo {
    constructor() {
        super('ServerSyncLog');
    }
}
exports.BaseServerSyncLogDuo = BaseServerSyncLogDuo;
class BaseSyncLogDuo extends SQDIDuo {
    constructor() {
        super('SyncLog');
    }
}
exports.BaseSyncLogDuo = BaseSyncLogDuo;
class BaseTerminalDuo extends SQDIDuo {
    constructor() {
        super('Terminal');
    }
}
exports.BaseTerminalDuo = BaseTerminalDuo;
class BaseTerminalRepositoryDuo extends SQDIDuo {
    constructor() {
        super('TerminalRepository');
    }
}
exports.BaseTerminalRepositoryDuo = BaseTerminalRepositoryDuo;
class BaseTuningParametersDuo extends SQDIDuo {
    constructor() {
        super('TuningParameters');
    }
}
exports.BaseTuningParametersDuo = BaseTuningParametersDuo;
class BaseUserDuo extends SQDIDuo {
    constructor() {
        super('User');
    }
}
exports.BaseUserDuo = BaseUserDuo;
class BaseUserRepositoryDuo extends SQDIDuo {
    constructor() {
        super('UserRepository');
    }
}
exports.BaseUserRepositoryDuo = BaseUserRepositoryDuo;
//# sourceMappingURL=baseDuos.js.map