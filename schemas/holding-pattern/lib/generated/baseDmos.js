"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const check_in_1 = require("@airport/check-in");
const qSchema_1 = require("./qSchema");
class BaseActorDmo extends check_in_1.Dmo {
    constructor() {
        super(qSchema_1.Q.db.currentVersion.entityMapByName['Actor']);
    }
}
exports.BaseActorDmo = BaseActorDmo;
class BaseActorApplicationDmo extends check_in_1.Dmo {
    constructor() {
        super(qSchema_1.Q.db.currentVersion.entityMapByName['ActorApplication']);
    }
}
exports.BaseActorApplicationDmo = BaseActorApplicationDmo;
class BaseApplicationDmo extends check_in_1.Dmo {
    constructor() {
        super(qSchema_1.Q.db.currentVersion.entityMapByName['Application']);
    }
}
exports.BaseApplicationDmo = BaseApplicationDmo;
class BaseChildRepoRowDmo extends check_in_1.Dmo {
    constructor() {
        super(qSchema_1.Q.db.currentVersion.entityMapByName['ChildRepoRow']);
    }
}
exports.BaseChildRepoRowDmo = BaseChildRepoRowDmo;
class BaseChildRowDmo extends check_in_1.Dmo {
    constructor() {
        super(qSchema_1.Q.db.currentVersion.entityMapByName['ChildRow']);
    }
}
exports.BaseChildRowDmo = BaseChildRowDmo;
class BaseImmutableRepoRowDmo extends check_in_1.Dmo {
    constructor() {
        super(qSchema_1.Q.db.currentVersion.entityMapByName['ImmutableRepoRow']);
    }
}
exports.BaseImmutableRepoRowDmo = BaseImmutableRepoRowDmo;
class BaseImmutableRowDmo extends check_in_1.Dmo {
    constructor() {
        super(qSchema_1.Q.db.currentVersion.entityMapByName['ImmutableRow']);
    }
}
exports.BaseImmutableRowDmo = BaseImmutableRowDmo;
class BaseMutableRepoRowDmo extends check_in_1.Dmo {
    constructor() {
        super(qSchema_1.Q.db.currentVersion.entityMapByName['MutableRepoRow']);
    }
}
exports.BaseMutableRepoRowDmo = BaseMutableRepoRowDmo;
class BaseMutableRowDmo extends check_in_1.Dmo {
    constructor() {
        super(qSchema_1.Q.db.currentVersion.entityMapByName['MutableRow']);
    }
}
exports.BaseMutableRowDmo = BaseMutableRowDmo;
class BaseOperationHistoryDmo extends check_in_1.Dmo {
    constructor() {
        super(qSchema_1.Q.db.currentVersion.entityMapByName['OperationHistory']);
    }
}
exports.BaseOperationHistoryDmo = BaseOperationHistoryDmo;
class BaseRecordHistoryDmo extends check_in_1.Dmo {
    constructor() {
        super(qSchema_1.Q.db.currentVersion.entityMapByName['RecordHistory']);
    }
}
exports.BaseRecordHistoryDmo = BaseRecordHistoryDmo;
class BaseRecordHistoryNewValueDmo extends check_in_1.Dmo {
    constructor() {
        super(qSchema_1.Q.db.currentVersion.entityMapByName['RecordHistoryNewValue']);
    }
}
exports.BaseRecordHistoryNewValueDmo = BaseRecordHistoryNewValueDmo;
class BaseRecordHistoryOldValueDmo extends check_in_1.Dmo {
    constructor() {
        super(qSchema_1.Q.db.currentVersion.entityMapByName['RecordHistoryOldValue']);
    }
}
exports.BaseRecordHistoryOldValueDmo = BaseRecordHistoryOldValueDmo;
class BaseReferenceRowDmo extends check_in_1.Dmo {
    constructor() {
        super(qSchema_1.Q.db.currentVersion.entityMapByName['ReferenceRow']);
    }
}
exports.BaseReferenceRowDmo = BaseReferenceRowDmo;
class BaseRepoTransHistoryChangedRepositoryActorDmo extends check_in_1.Dmo {
    constructor() {
        super(qSchema_1.Q.db.currentVersion.entityMapByName['RepoTransHistoryChangedRepositoryActor']);
    }
}
exports.BaseRepoTransHistoryChangedRepositoryActorDmo = BaseRepoTransHistoryChangedRepositoryActorDmo;
class BaseRepositoryDmo extends check_in_1.Dmo {
    constructor() {
        super(qSchema_1.Q.db.currentVersion.entityMapByName['Repository']);
    }
}
exports.BaseRepositoryDmo = BaseRepositoryDmo;
class BaseRepositoryActorDmo extends check_in_1.Dmo {
    constructor() {
        super(qSchema_1.Q.db.currentVersion.entityMapByName['RepositoryActor']);
    }
}
exports.BaseRepositoryActorDmo = BaseRepositoryActorDmo;
class BaseRepositoryApplicationDmo extends check_in_1.Dmo {
    constructor() {
        super(qSchema_1.Q.db.currentVersion.entityMapByName['RepositoryApplication']);
    }
}
exports.BaseRepositoryApplicationDmo = BaseRepositoryApplicationDmo;
class BaseRepositoryEntityDmo extends check_in_1.Dmo {
    constructor() {
        super(qSchema_1.Q.db.currentVersion.entityMapByName['RepositoryEntity']);
    }
}
exports.BaseRepositoryEntityDmo = BaseRepositoryEntityDmo;
class BaseRepositorySchemaDmo extends check_in_1.Dmo {
    constructor() {
        super(qSchema_1.Q.db.currentVersion.entityMapByName['RepositorySchema']);
    }
}
exports.BaseRepositorySchemaDmo = BaseRepositorySchemaDmo;
class BaseRepositoryTransactionHistoryDmo extends check_in_1.Dmo {
    constructor() {
        super(qSchema_1.Q.db.currentVersion.entityMapByName['RepositoryTransactionHistory']);
    }
}
exports.BaseRepositoryTransactionHistoryDmo = BaseRepositoryTransactionHistoryDmo;
class BaseTransactionHistoryDmo extends check_in_1.Dmo {
    constructor() {
        super(qSchema_1.Q.db.currentVersion.entityMapByName['TransactionHistory']);
    }
}
exports.BaseTransactionHistoryDmo = BaseTransactionHistoryDmo;
//# sourceMappingURL=baseDmos.js.map