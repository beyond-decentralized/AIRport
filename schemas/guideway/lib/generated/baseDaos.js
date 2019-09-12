"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const check_in_1 = require("@airport/check-in");
const qSchema_1 = require("./qSchema");
// Schema Q object Dependency Injection readiness detection DAO
class SQDIDao extends check_in_1.Dao {
    constructor(dbEntityId) {
        super(dbEntityId, qSchema_1.Q);
    }
}
exports.SQDIDao = SQDIDao;
class BaseAgtRepositoryTransactionBlockDao extends SQDIDao {
    static diSet() {
        return qSchema_1.diSet(8);
    }
    constructor() {
        super(8);
    }
}
exports.BaseAgtRepositoryTransactionBlockDao = BaseAgtRepositoryTransactionBlockDao;
class BaseAgtSharingMessageDao extends SQDIDao {
    static diSet() {
        return qSchema_1.diSet(1);
    }
    constructor() {
        super(1);
    }
}
exports.BaseAgtSharingMessageDao = BaseAgtSharingMessageDao;
class BaseArchiveDao extends SQDIDao {
    static diSet() {
        return qSchema_1.diSet(14);
    }
    constructor() {
        super(14);
    }
}
exports.BaseArchiveDao = BaseArchiveDao;
class BaseDailyArchiveLogDao extends SQDIDao {
    static diSet() {
        return qSchema_1.diSet(10);
    }
    constructor() {
        super(10);
    }
}
exports.BaseDailyArchiveLogDao = BaseDailyArchiveLogDao;
class BaseDailyTerminalSyncLogDao extends SQDIDao {
    static diSet() {
        return qSchema_1.diSet(11);
    }
    constructor() {
        super(11);
    }
}
exports.BaseDailyTerminalSyncLogDao = BaseDailyTerminalSyncLogDao;
class BaseMonthlyArchiveLogDao extends SQDIDao {
    static diSet() {
        return qSchema_1.diSet(12);
    }
    constructor() {
        super(12);
    }
}
exports.BaseMonthlyArchiveLogDao = BaseMonthlyArchiveLogDao;
class BaseMonthlyTerminalSyncLogDao extends SQDIDao {
    static diSet() {
        return qSchema_1.diSet(13);
    }
    constructor() {
        super(13);
    }
}
exports.BaseMonthlyTerminalSyncLogDao = BaseMonthlyTerminalSyncLogDao;
class BaseRepositoryDao extends SQDIDao {
    static diSet() {
        return qSchema_1.diSet(9);
    }
    constructor() {
        super(9);
    }
}
exports.BaseRepositoryDao = BaseRepositoryDao;
class BaseRepositoryArchiveDao extends SQDIDao {
    static diSet() {
        return qSchema_1.diSet(15);
    }
    constructor() {
        super(15);
    }
}
exports.BaseRepositoryArchiveDao = BaseRepositoryArchiveDao;
class BaseSecurityAnswerDao extends SQDIDao {
    static diSet() {
        return qSchema_1.diSet(3);
    }
    constructor() {
        super(3);
    }
}
exports.BaseSecurityAnswerDao = BaseSecurityAnswerDao;
class BaseSecurityQuestionDao extends SQDIDao {
    static diSet() {
        return qSchema_1.diSet(2);
    }
    constructor() {
        super(2);
    }
}
exports.BaseSecurityQuestionDao = BaseSecurityQuestionDao;
class BaseServerDao extends SQDIDao {
    static diSet() {
        return qSchema_1.diSet(17);
    }
    constructor() {
        super(17);
    }
}
exports.BaseServerDao = BaseServerDao;
class BaseServerSyncLogDao extends SQDIDao {
    static diSet() {
        return qSchema_1.diSet(16);
    }
    constructor() {
        super(16);
    }
}
exports.BaseServerSyncLogDao = BaseServerSyncLogDao;
class BaseSyncLogDao extends SQDIDao {
    static diSet() {
        return qSchema_1.diSet(0);
    }
    constructor() {
        super(0);
    }
}
exports.BaseSyncLogDao = BaseSyncLogDao;
class BaseTerminalDao extends SQDIDao {
    static diSet() {
        return qSchema_1.diSet(7);
    }
    constructor() {
        super(7);
    }
}
exports.BaseTerminalDao = BaseTerminalDao;
class BaseTerminalRepositoryDao extends SQDIDao {
    static diSet() {
        return qSchema_1.diSet(6);
    }
    constructor() {
        super(6);
    }
}
exports.BaseTerminalRepositoryDao = BaseTerminalRepositoryDao;
class BaseTuningParametersDao extends SQDIDao {
    static diSet() {
        return qSchema_1.diSet(18);
    }
    constructor() {
        super(18);
    }
}
exports.BaseTuningParametersDao = BaseTuningParametersDao;
class BaseUserDao extends SQDIDao {
    static diSet() {
        return qSchema_1.diSet(5);
    }
    constructor() {
        super(5);
    }
}
exports.BaseUserDao = BaseUserDao;
class BaseUserRepositoryDao extends SQDIDao {
    static diSet() {
        return qSchema_1.diSet(4);
    }
    constructor() {
        super(4);
    }
}
exports.BaseUserRepositoryDao = BaseUserRepositoryDao;
//# sourceMappingURL=baseDaos.js.map