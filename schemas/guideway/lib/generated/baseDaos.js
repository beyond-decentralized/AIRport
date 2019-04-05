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
class BaseAgtRepositoryTransactionBlockDao extends SQDIDao {
    constructor() {
        super('AgtRepositoryTransactionBlock', qSchema_1.Q);
    }
}
exports.BaseAgtRepositoryTransactionBlockDao = BaseAgtRepositoryTransactionBlockDao;
class BaseAgtSharingMessageDao extends SQDIDao {
    constructor() {
        super('AgtSharingMessage', qSchema_1.Q);
    }
}
exports.BaseAgtSharingMessageDao = BaseAgtSharingMessageDao;
class BaseArchiveDao extends SQDIDao {
    constructor() {
        super('Archive', qSchema_1.Q);
    }
}
exports.BaseArchiveDao = BaseArchiveDao;
class BaseDailyArchiveLogDao extends SQDIDao {
    constructor() {
        super('DailyArchiveLog', qSchema_1.Q);
    }
}
exports.BaseDailyArchiveLogDao = BaseDailyArchiveLogDao;
class BaseDailyTerminalSyncLogDao extends SQDIDao {
    constructor() {
        super('DailyTerminalSyncLog', qSchema_1.Q);
    }
}
exports.BaseDailyTerminalSyncLogDao = BaseDailyTerminalSyncLogDao;
class BaseMonthlyArchiveLogDao extends SQDIDao {
    constructor() {
        super('MonthlyArchiveLog', qSchema_1.Q);
    }
}
exports.BaseMonthlyArchiveLogDao = BaseMonthlyArchiveLogDao;
class BaseMonthlyTerminalSyncLogDao extends SQDIDao {
    constructor() {
        super('MonthlyTerminalSyncLog', qSchema_1.Q);
    }
}
exports.BaseMonthlyTerminalSyncLogDao = BaseMonthlyTerminalSyncLogDao;
class BaseRepositoryDao extends SQDIDao {
    constructor() {
        super('Repository', qSchema_1.Q);
    }
}
exports.BaseRepositoryDao = BaseRepositoryDao;
class BaseRepositoryArchiveDao extends SQDIDao {
    constructor() {
        super('RepositoryArchive', qSchema_1.Q);
    }
}
exports.BaseRepositoryArchiveDao = BaseRepositoryArchiveDao;
class BaseSecurityAnswerDao extends SQDIDao {
    constructor() {
        super('SecurityAnswer', qSchema_1.Q);
    }
}
exports.BaseSecurityAnswerDao = BaseSecurityAnswerDao;
class BaseSecurityQuestionDao extends SQDIDao {
    constructor() {
        super('SecurityQuestion', qSchema_1.Q);
    }
}
exports.BaseSecurityQuestionDao = BaseSecurityQuestionDao;
class BaseServerDao extends SQDIDao {
    constructor() {
        super('Server', qSchema_1.Q);
    }
}
exports.BaseServerDao = BaseServerDao;
class BaseServerSyncLogDao extends SQDIDao {
    constructor() {
        super('ServerSyncLog', qSchema_1.Q);
    }
}
exports.BaseServerSyncLogDao = BaseServerSyncLogDao;
class BaseSyncLogDao extends SQDIDao {
    constructor() {
        super('SyncLog', qSchema_1.Q);
    }
}
exports.BaseSyncLogDao = BaseSyncLogDao;
class BaseTerminalDao extends SQDIDao {
    constructor() {
        super('Terminal', qSchema_1.Q);
    }
}
exports.BaseTerminalDao = BaseTerminalDao;
class BaseTerminalRepositoryDao extends SQDIDao {
    constructor() {
        super('TerminalRepository', qSchema_1.Q);
    }
}
exports.BaseTerminalRepositoryDao = BaseTerminalRepositoryDao;
class BaseTuningParametersDao extends SQDIDao {
    constructor() {
        super('TuningParameters', qSchema_1.Q);
    }
}
exports.BaseTuningParametersDao = BaseTuningParametersDao;
class BaseUserDao extends SQDIDao {
    constructor() {
        super('User', qSchema_1.Q);
    }
}
exports.BaseUserDao = BaseUserDao;
class BaseUserRepositoryDao extends SQDIDao {
    constructor() {
        super('UserRepository', qSchema_1.Q);
    }
}
exports.BaseUserRepositoryDao = BaseUserRepositoryDao;
//# sourceMappingURL=baseDaos.js.map