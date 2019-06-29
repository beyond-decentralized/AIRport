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
class BaseAgtRepositoryTransactionBlockDuo extends SQDIDuo {
    static diSet() {
        return qSchema_1.duoDiSet(16);
    }
    constructor() {
        super(16);
    }
}
exports.BaseAgtRepositoryTransactionBlockDuo = BaseAgtRepositoryTransactionBlockDuo;
class BaseAgtSharingMessageDuo extends SQDIDuo {
    static diSet() {
        return qSchema_1.duoDiSet(14);
    }
    constructor() {
        super(14);
    }
}
exports.BaseAgtSharingMessageDuo = BaseAgtSharingMessageDuo;
class BaseArchiveDuo extends SQDIDuo {
    static diSet() {
        return qSchema_1.duoDiSet(0);
    }
    constructor() {
        super(0);
    }
}
exports.BaseArchiveDuo = BaseArchiveDuo;
class BaseDailyArchiveLogDuo extends SQDIDuo {
    static diSet() {
        return qSchema_1.duoDiSet(18);
    }
    constructor() {
        super(18);
    }
}
exports.BaseDailyArchiveLogDuo = BaseDailyArchiveLogDuo;
class BaseDailyTerminalSyncLogDuo extends SQDIDuo {
    static diSet() {
        return qSchema_1.duoDiSet(1);
    }
    constructor() {
        super(1);
    }
}
exports.BaseDailyTerminalSyncLogDuo = BaseDailyTerminalSyncLogDuo;
class BaseMonthlyArchiveLogDuo extends SQDIDuo {
    static diSet() {
        return qSchema_1.duoDiSet(2);
    }
    constructor() {
        super(2);
    }
}
exports.BaseMonthlyArchiveLogDuo = BaseMonthlyArchiveLogDuo;
class BaseMonthlyTerminalSyncLogDuo extends SQDIDuo {
    static diSet() {
        return qSchema_1.duoDiSet(3);
    }
    constructor() {
        super(3);
    }
}
exports.BaseMonthlyTerminalSyncLogDuo = BaseMonthlyTerminalSyncLogDuo;
class BaseRepositoryDuo extends SQDIDuo {
    static diSet() {
        return qSchema_1.duoDiSet(17);
    }
    constructor() {
        super(17);
    }
}
exports.BaseRepositoryDuo = BaseRepositoryDuo;
class BaseRepositoryArchiveDuo extends SQDIDuo {
    static diSet() {
        return qSchema_1.duoDiSet(4);
    }
    constructor() {
        super(4);
    }
}
exports.BaseRepositoryArchiveDuo = BaseRepositoryArchiveDuo;
class BaseSecurityAnswerDuo extends SQDIDuo {
    static diSet() {
        return qSchema_1.duoDiSet(8);
    }
    constructor() {
        super(8);
    }
}
exports.BaseSecurityAnswerDuo = BaseSecurityAnswerDuo;
class BaseSecurityQuestionDuo extends SQDIDuo {
    static diSet() {
        return qSchema_1.duoDiSet(7);
    }
    constructor() {
        super(7);
    }
}
exports.BaseSecurityQuestionDuo = BaseSecurityQuestionDuo;
class BaseServerDuo extends SQDIDuo {
    static diSet() {
        return qSchema_1.duoDiSet(10);
    }
    constructor() {
        super(10);
    }
}
exports.BaseServerDuo = BaseServerDuo;
class BaseServerSyncLogDuo extends SQDIDuo {
    static diSet() {
        return qSchema_1.duoDiSet(9);
    }
    constructor() {
        super(9);
    }
}
exports.BaseServerSyncLogDuo = BaseServerSyncLogDuo;
class BaseSyncLogDuo extends SQDIDuo {
    static diSet() {
        return qSchema_1.duoDiSet(11);
    }
    constructor() {
        super(11);
    }
}
exports.BaseSyncLogDuo = BaseSyncLogDuo;
class BaseTerminalDuo extends SQDIDuo {
    static diSet() {
        return qSchema_1.duoDiSet(15);
    }
    constructor() {
        super(15);
    }
}
exports.BaseTerminalDuo = BaseTerminalDuo;
class BaseTerminalRepositoryDuo extends SQDIDuo {
    static diSet() {
        return qSchema_1.duoDiSet(12);
    }
    constructor() {
        super(12);
    }
}
exports.BaseTerminalRepositoryDuo = BaseTerminalRepositoryDuo;
class BaseTuningParametersDuo extends SQDIDuo {
    static diSet() {
        return qSchema_1.duoDiSet(13);
    }
    constructor() {
        super(13);
    }
}
exports.BaseTuningParametersDuo = BaseTuningParametersDuo;
class BaseUserDuo extends SQDIDuo {
    static diSet() {
        return qSchema_1.duoDiSet(6);
    }
    constructor() {
        super(6);
    }
}
exports.BaseUserDuo = BaseUserDuo;
class BaseUserRepositoryDuo extends SQDIDuo {
    static diSet() {
        return qSchema_1.duoDiSet(5);
    }
    constructor() {
        super(5);
    }
}
exports.BaseUserRepositoryDuo = BaseUserRepositoryDuo;
//# sourceMappingURL=baseDuos.js.map