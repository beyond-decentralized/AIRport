"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const check_in_1 = require("@airport/check-in");
const qSchema_1 = require("./qSchema");
class BaseAgtRepositoryTransactionBlockDmo extends check_in_1.Dmo {
    constructor() {
        super(qSchema_1.Q.db.currentVersion.entityMapByName['AgtRepositoryTransactionBlock']);
    }
}
exports.BaseAgtRepositoryTransactionBlockDmo = BaseAgtRepositoryTransactionBlockDmo;
class BaseAgtSharingMessageDmo extends check_in_1.Dmo {
    constructor() {
        super(qSchema_1.Q.db.currentVersion.entityMapByName['AgtSharingMessage']);
    }
}
exports.BaseAgtSharingMessageDmo = BaseAgtSharingMessageDmo;
class BaseArchiveDmo extends check_in_1.Dmo {
    constructor() {
        super(qSchema_1.Q.db.currentVersion.entityMapByName['Archive']);
    }
}
exports.BaseArchiveDmo = BaseArchiveDmo;
class BaseDailyArchiveLogDmo extends check_in_1.Dmo {
    constructor() {
        super(qSchema_1.Q.db.currentVersion.entityMapByName['DailyArchiveLog']);
    }
}
exports.BaseDailyArchiveLogDmo = BaseDailyArchiveLogDmo;
class BaseDailyTerminalSyncLogDmo extends check_in_1.Dmo {
    constructor() {
        super(qSchema_1.Q.db.currentVersion.entityMapByName['DailyTerminalSyncLog']);
    }
}
exports.BaseDailyTerminalSyncLogDmo = BaseDailyTerminalSyncLogDmo;
class BaseMonthlyArchiveLogDmo extends check_in_1.Dmo {
    constructor() {
        super(qSchema_1.Q.db.currentVersion.entityMapByName['MonthlyArchiveLog']);
    }
}
exports.BaseMonthlyArchiveLogDmo = BaseMonthlyArchiveLogDmo;
class BaseMonthlyTerminalSyncLogDmo extends check_in_1.Dmo {
    constructor() {
        super(qSchema_1.Q.db.currentVersion.entityMapByName['MonthlyTerminalSyncLog']);
    }
}
exports.BaseMonthlyTerminalSyncLogDmo = BaseMonthlyTerminalSyncLogDmo;
class BaseRepositoryDmo extends check_in_1.Dmo {
    constructor() {
        super(qSchema_1.Q.db.currentVersion.entityMapByName['Repository']);
    }
}
exports.BaseRepositoryDmo = BaseRepositoryDmo;
class BaseRepositoryArchiveDmo extends check_in_1.Dmo {
    constructor() {
        super(qSchema_1.Q.db.currentVersion.entityMapByName['RepositoryArchive']);
    }
}
exports.BaseRepositoryArchiveDmo = BaseRepositoryArchiveDmo;
class BaseSecurityAnswerDmo extends check_in_1.Dmo {
    constructor() {
        super(qSchema_1.Q.db.currentVersion.entityMapByName['SecurityAnswer']);
    }
}
exports.BaseSecurityAnswerDmo = BaseSecurityAnswerDmo;
class BaseSecurityQuestionDmo extends check_in_1.Dmo {
    constructor() {
        super(qSchema_1.Q.db.currentVersion.entityMapByName['SecurityQuestion']);
    }
}
exports.BaseSecurityQuestionDmo = BaseSecurityQuestionDmo;
class BaseServerDmo extends check_in_1.Dmo {
    constructor() {
        super(qSchema_1.Q.db.currentVersion.entityMapByName['Server']);
    }
}
exports.BaseServerDmo = BaseServerDmo;
class BaseServerSyncLogDmo extends check_in_1.Dmo {
    constructor() {
        super(qSchema_1.Q.db.currentVersion.entityMapByName['ServerSyncLog']);
    }
}
exports.BaseServerSyncLogDmo = BaseServerSyncLogDmo;
class BaseSyncLogDmo extends check_in_1.Dmo {
    constructor() {
        super(qSchema_1.Q.db.currentVersion.entityMapByName['SyncLog']);
    }
}
exports.BaseSyncLogDmo = BaseSyncLogDmo;
class BaseTerminalDmo extends check_in_1.Dmo {
    constructor() {
        super(qSchema_1.Q.db.currentVersion.entityMapByName['Terminal']);
    }
}
exports.BaseTerminalDmo = BaseTerminalDmo;
class BaseTerminalRepositoryDmo extends check_in_1.Dmo {
    constructor() {
        super(qSchema_1.Q.db.currentVersion.entityMapByName['TerminalRepository']);
    }
}
exports.BaseTerminalRepositoryDmo = BaseTerminalRepositoryDmo;
class BaseTuningParametersDmo extends check_in_1.Dmo {
    constructor() {
        super(qSchema_1.Q.db.currentVersion.entityMapByName['TuningParameters']);
    }
}
exports.BaseTuningParametersDmo = BaseTuningParametersDmo;
class BaseUserDmo extends check_in_1.Dmo {
    constructor() {
        super(qSchema_1.Q.db.currentVersion.entityMapByName['User']);
    }
}
exports.BaseUserDmo = BaseUserDmo;
class BaseUserRepositoryDmo extends check_in_1.Dmo {
    constructor() {
        super(qSchema_1.Q.db.currentVersion.entityMapByName['UserRepository']);
    }
}
exports.BaseUserRepositoryDmo = BaseUserRepositoryDmo;
//# sourceMappingURL=baseDmos.js.map