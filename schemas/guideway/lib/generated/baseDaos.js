"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const check_in_1 = require("@airport/check-in");
const qSchema_1 = require("./qSchema");
// Schema Q object Dependency Injection readiness detection DAO
class SQDIDao extends check_in_1.Dao {
    constructor(dbEntityName) {
        super(dbEntityName, qSchema_1.Q);
    }
    static diSet() {
        return qSchema_1.Q.db;
    }
}
exports.SQDIDao = SQDIDao;
class BaseAgtRepositoryTransactionBlockDao extends SQDIDao {
    constructor() {
        super('AgtRepositoryTransactionBlock');
    }
}
exports.BaseAgtRepositoryTransactionBlockDao = BaseAgtRepositoryTransactionBlockDao;
class BaseAgtSharingMessageDao extends SQDIDao {
    constructor() {
        super('AgtSharingMessage');
    }
}
exports.BaseAgtSharingMessageDao = BaseAgtSharingMessageDao;
class BaseArchiveDao extends SQDIDao {
    constructor() {
        super('Archive');
    }
}
exports.BaseArchiveDao = BaseArchiveDao;
class BaseDailyArchiveLogDao extends SQDIDao {
    constructor() {
        super('DailyArchiveLog');
    }
}
exports.BaseDailyArchiveLogDao = BaseDailyArchiveLogDao;
class BaseDailyTerminalSyncLogDao extends SQDIDao {
    constructor() {
        super('DailyTerminalSyncLog');
    }
}
exports.BaseDailyTerminalSyncLogDao = BaseDailyTerminalSyncLogDao;
class BaseMonthlyArchiveLogDao extends SQDIDao {
    constructor() {
        super('MonthlyArchiveLog');
    }
}
exports.BaseMonthlyArchiveLogDao = BaseMonthlyArchiveLogDao;
class BaseMonthlyTerminalSyncLogDao extends SQDIDao {
    constructor() {
        super('MonthlyTerminalSyncLog');
    }
}
exports.BaseMonthlyTerminalSyncLogDao = BaseMonthlyTerminalSyncLogDao;
class BaseRepositoryDao extends SQDIDao {
    constructor() {
        super('Repository');
    }
}
exports.BaseRepositoryDao = BaseRepositoryDao;
class BaseRepositoryArchiveDao extends SQDIDao {
    constructor() {
        super('RepositoryArchive');
    }
}
exports.BaseRepositoryArchiveDao = BaseRepositoryArchiveDao;
class BaseSecurityAnswerDao extends SQDIDao {
    constructor() {
        super('SecurityAnswer');
    }
}
exports.BaseSecurityAnswerDao = BaseSecurityAnswerDao;
class BaseSecurityQuestionDao extends SQDIDao {
    constructor() {
        super('SecurityQuestion');
    }
}
exports.BaseSecurityQuestionDao = BaseSecurityQuestionDao;
class BaseServerDao extends SQDIDao {
    constructor() {
        super('Server');
    }
}
exports.BaseServerDao = BaseServerDao;
class BaseServerSyncLogDao extends SQDIDao {
    constructor() {
        super('ServerSyncLog');
    }
}
exports.BaseServerSyncLogDao = BaseServerSyncLogDao;
class BaseSyncLogDao extends SQDIDao {
    constructor() {
        super('SyncLog');
    }
}
exports.BaseSyncLogDao = BaseSyncLogDao;
class BaseTerminalDao extends SQDIDao {
    constructor() {
        super('Terminal');
    }
}
exports.BaseTerminalDao = BaseTerminalDao;
class BaseTerminalRepositoryDao extends SQDIDao {
    constructor() {
        super('TerminalRepository');
    }
}
exports.BaseTerminalRepositoryDao = BaseTerminalRepositoryDao;
class BaseTuningParametersDao extends SQDIDao {
    constructor() {
        super('TuningParameters');
    }
}
exports.BaseTuningParametersDao = BaseTuningParametersDao;
class BaseUserDao extends SQDIDao {
    constructor() {
        super('User');
    }
}
exports.BaseUserDao = BaseUserDao;
class BaseUserRepositoryDao extends SQDIDao {
    constructor() {
        super('UserRepository');
    }
}
exports.BaseUserRepositoryDao = BaseUserRepositoryDao;
//# sourceMappingURL=baseDaos.js.map