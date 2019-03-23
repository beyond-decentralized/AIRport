"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const check_in_1 = require("@airport/check-in");
const qSchema_1 = require("./qSchema");
class BaseAgtRepositoryTransactionBlockDao extends check_in_1.Dao {
    constructor() {
        super(qSchema_1.Q.db.currentVersion.entityMapByName['AgtRepositoryTransactionBlock'], qSchema_1.Q);
    }
}
exports.BaseAgtRepositoryTransactionBlockDao = BaseAgtRepositoryTransactionBlockDao;
class BaseAgtSharingMessageDao extends check_in_1.Dao {
    constructor() {
        super(qSchema_1.Q.db.currentVersion.entityMapByName['AgtSharingMessage'], qSchema_1.Q);
    }
}
exports.BaseAgtSharingMessageDao = BaseAgtSharingMessageDao;
class BaseArchiveDao extends check_in_1.Dao {
    constructor() {
        super(qSchema_1.Q.db.currentVersion.entityMapByName['Archive'], qSchema_1.Q);
    }
}
exports.BaseArchiveDao = BaseArchiveDao;
class BaseDailyArchiveLogDao extends check_in_1.Dao {
    constructor() {
        super(qSchema_1.Q.db.currentVersion.entityMapByName['DailyArchiveLog'], qSchema_1.Q);
    }
}
exports.BaseDailyArchiveLogDao = BaseDailyArchiveLogDao;
class BaseDailyTerminalSyncLogDao extends check_in_1.Dao {
    constructor() {
        super(qSchema_1.Q.db.currentVersion.entityMapByName['DailyTerminalSyncLog'], qSchema_1.Q);
    }
}
exports.BaseDailyTerminalSyncLogDao = BaseDailyTerminalSyncLogDao;
class BaseMonthlyArchiveLogDao extends check_in_1.Dao {
    constructor() {
        super(qSchema_1.Q.db.currentVersion.entityMapByName['MonthlyArchiveLog'], qSchema_1.Q);
    }
}
exports.BaseMonthlyArchiveLogDao = BaseMonthlyArchiveLogDao;
class BaseMonthlyTerminalSyncLogDao extends check_in_1.Dao {
    constructor() {
        super(qSchema_1.Q.db.currentVersion.entityMapByName['MonthlyTerminalSyncLog'], qSchema_1.Q);
    }
}
exports.BaseMonthlyTerminalSyncLogDao = BaseMonthlyTerminalSyncLogDao;
class BaseRepositoryDao extends check_in_1.Dao {
    constructor() {
        super(qSchema_1.Q.db.currentVersion.entityMapByName['Repository'], qSchema_1.Q);
    }
}
exports.BaseRepositoryDao = BaseRepositoryDao;
class BaseRepositoryArchiveDao extends check_in_1.Dao {
    constructor() {
        super(qSchema_1.Q.db.currentVersion.entityMapByName['RepositoryArchive'], qSchema_1.Q);
    }
}
exports.BaseRepositoryArchiveDao = BaseRepositoryArchiveDao;
class BaseSecurityAnswerDao extends check_in_1.Dao {
    constructor() {
        super(qSchema_1.Q.db.currentVersion.entityMapByName['SecurityAnswer'], qSchema_1.Q);
    }
}
exports.BaseSecurityAnswerDao = BaseSecurityAnswerDao;
class BaseSecurityQuestionDao extends check_in_1.Dao {
    constructor() {
        super(qSchema_1.Q.db.currentVersion.entityMapByName['SecurityQuestion'], qSchema_1.Q);
    }
}
exports.BaseSecurityQuestionDao = BaseSecurityQuestionDao;
class BaseServerDao extends check_in_1.Dao {
    constructor() {
        super(qSchema_1.Q.db.currentVersion.entityMapByName['Server'], qSchema_1.Q);
    }
}
exports.BaseServerDao = BaseServerDao;
class BaseServerSyncLogDao extends check_in_1.Dao {
    constructor() {
        super(qSchema_1.Q.db.currentVersion.entityMapByName['ServerSyncLog'], qSchema_1.Q);
    }
}
exports.BaseServerSyncLogDao = BaseServerSyncLogDao;
class BaseSyncLogDao extends check_in_1.Dao {
    constructor() {
        super(qSchema_1.Q.db.currentVersion.entityMapByName['SyncLog'], qSchema_1.Q);
    }
}
exports.BaseSyncLogDao = BaseSyncLogDao;
class BaseTerminalDao extends check_in_1.Dao {
    constructor() {
        super(qSchema_1.Q.db.currentVersion.entityMapByName['Terminal'], qSchema_1.Q);
    }
}
exports.BaseTerminalDao = BaseTerminalDao;
class BaseTerminalRepositoryDao extends check_in_1.Dao {
    constructor() {
        super(qSchema_1.Q.db.currentVersion.entityMapByName['TerminalRepository'], qSchema_1.Q);
    }
}
exports.BaseTerminalRepositoryDao = BaseTerminalRepositoryDao;
class BaseTuningParametersDao extends check_in_1.Dao {
    constructor() {
        super(qSchema_1.Q.db.currentVersion.entityMapByName['TuningParameters'], qSchema_1.Q);
    }
}
exports.BaseTuningParametersDao = BaseTuningParametersDao;
class BaseUserDao extends check_in_1.Dao {
    constructor() {
        super(qSchema_1.Q.db.currentVersion.entityMapByName['User'], qSchema_1.Q);
    }
}
exports.BaseUserDao = BaseUserDao;
class BaseUserRepositoryDao extends check_in_1.Dao {
    constructor() {
        super(qSchema_1.Q.db.currentVersion.entityMapByName['UserRepository'], qSchema_1.Q);
    }
}
exports.BaseUserRepositoryDao = BaseUserRepositoryDao;
//# sourceMappingURL=baseDaos.js.map