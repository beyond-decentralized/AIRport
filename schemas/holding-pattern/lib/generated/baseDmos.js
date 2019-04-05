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
class BaseActorDmo extends SQDIDmo {
    constructor() {
        super('Actor');
    }
}
exports.BaseActorDmo = BaseActorDmo;
class BaseActorApplicationDmo extends SQDIDmo {
    constructor() {
        super('ActorApplication');
    }
}
exports.BaseActorApplicationDmo = BaseActorApplicationDmo;
class BaseApplicationDmo extends SQDIDmo {
    constructor() {
        super('Application');
    }
}
exports.BaseApplicationDmo = BaseApplicationDmo;
class BaseChildRepoRowDmo extends SQDIDmo {
    constructor() {
        super('ChildRepoRow');
    }
}
exports.BaseChildRepoRowDmo = BaseChildRepoRowDmo;
class BaseChildRowDmo extends SQDIDmo {
    constructor() {
        super('ChildRow');
    }
}
exports.BaseChildRowDmo = BaseChildRowDmo;
class BaseImmutableRepoRowDmo extends SQDIDmo {
    constructor() {
        super('ImmutableRepoRow');
    }
}
exports.BaseImmutableRepoRowDmo = BaseImmutableRepoRowDmo;
class BaseImmutableRowDmo extends SQDIDmo {
    constructor() {
        super('ImmutableRow');
    }
}
exports.BaseImmutableRowDmo = BaseImmutableRowDmo;
class BaseMutableRepoRowDmo extends SQDIDmo {
    constructor() {
        super('MutableRepoRow');
    }
}
exports.BaseMutableRepoRowDmo = BaseMutableRepoRowDmo;
class BaseMutableRowDmo extends SQDIDmo {
    constructor() {
        super('MutableRow');
    }
}
exports.BaseMutableRowDmo = BaseMutableRowDmo;
class BaseOperationHistoryDmo extends SQDIDmo {
    constructor() {
        super('OperationHistory');
    }
}
exports.BaseOperationHistoryDmo = BaseOperationHistoryDmo;
class BaseRecordHistoryDmo extends SQDIDmo {
    constructor() {
        super('RecordHistory');
    }
}
exports.BaseRecordHistoryDmo = BaseRecordHistoryDmo;
class BaseRecordHistoryNewValueDmo extends SQDIDmo {
    constructor() {
        super('RecordHistoryNewValue');
    }
}
exports.BaseRecordHistoryNewValueDmo = BaseRecordHistoryNewValueDmo;
class BaseRecordHistoryOldValueDmo extends SQDIDmo {
    constructor() {
        super('RecordHistoryOldValue');
    }
}
exports.BaseRecordHistoryOldValueDmo = BaseRecordHistoryOldValueDmo;
class BaseReferenceRowDmo extends SQDIDmo {
    constructor() {
        super('ReferenceRow');
    }
}
exports.BaseReferenceRowDmo = BaseReferenceRowDmo;
class BaseRepoTransHistoryChangedRepositoryActorDmo extends SQDIDmo {
    constructor() {
        super('RepoTransHistoryChangedRepositoryActor');
    }
}
exports.BaseRepoTransHistoryChangedRepositoryActorDmo = BaseRepoTransHistoryChangedRepositoryActorDmo;
class BaseRepositoryDmo extends SQDIDmo {
    constructor() {
        super('Repository');
    }
}
exports.BaseRepositoryDmo = BaseRepositoryDmo;
class BaseRepositoryActorDmo extends SQDIDmo {
    constructor() {
        super('RepositoryActor');
    }
}
exports.BaseRepositoryActorDmo = BaseRepositoryActorDmo;
class BaseRepositoryApplicationDmo extends SQDIDmo {
    constructor() {
        super('RepositoryApplication');
    }
}
exports.BaseRepositoryApplicationDmo = BaseRepositoryApplicationDmo;
class BaseRepositoryEntityDmo extends SQDIDmo {
    constructor() {
        super('RepositoryEntity');
    }
}
exports.BaseRepositoryEntityDmo = BaseRepositoryEntityDmo;
class BaseRepositorySchemaDmo extends SQDIDmo {
    constructor() {
        super('RepositorySchema');
    }
}
exports.BaseRepositorySchemaDmo = BaseRepositorySchemaDmo;
class BaseRepositoryTransactionHistoryDmo extends SQDIDmo {
    constructor() {
        super('RepositoryTransactionHistory');
    }
}
exports.BaseRepositoryTransactionHistoryDmo = BaseRepositoryTransactionHistoryDmo;
class BaseStageableDmo extends SQDIDmo {
    constructor() {
        super('Stageable');
    }
}
exports.BaseStageableDmo = BaseStageableDmo;
class BaseTransactionHistoryDmo extends SQDIDmo {
    constructor() {
        super('TransactionHistory');
    }
}
exports.BaseTransactionHistoryDmo = BaseTransactionHistoryDmo;
//# sourceMappingURL=baseDmos.js.map