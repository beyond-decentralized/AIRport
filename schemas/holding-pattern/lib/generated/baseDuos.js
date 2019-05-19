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
        return qSchema_1.Q.__dbSchema__;
    }
}
exports.SQDIDuo = SQDIDuo;
class BaseActorDuo extends SQDIDuo {
    constructor() {
        super('Actor');
    }
}
exports.BaseActorDuo = BaseActorDuo;
class BaseActorApplicationDuo extends SQDIDuo {
    constructor() {
        super('ActorApplication');
    }
}
exports.BaseActorApplicationDuo = BaseActorApplicationDuo;
class BaseApplicationDuo extends SQDIDuo {
    constructor() {
        super('Application');
    }
}
exports.BaseApplicationDuo = BaseApplicationDuo;
class BaseChildRepoRowDuo extends SQDIDuo {
    constructor() {
        super('ChildRepoRow');
    }
}
exports.BaseChildRepoRowDuo = BaseChildRepoRowDuo;
class BaseChildRowDuo extends SQDIDuo {
    constructor() {
        super('ChildRow');
    }
}
exports.BaseChildRowDuo = BaseChildRowDuo;
class BaseImmutableRepoRowDuo extends SQDIDuo {
    constructor() {
        super('ImmutableRepoRow');
    }
}
exports.BaseImmutableRepoRowDuo = BaseImmutableRepoRowDuo;
class BaseImmutableRowDuo extends SQDIDuo {
    constructor() {
        super('ImmutableRow');
    }
}
exports.BaseImmutableRowDuo = BaseImmutableRowDuo;
class BaseMutableRepoRowDuo extends SQDIDuo {
    constructor() {
        super('MutableRepoRow');
    }
}
exports.BaseMutableRepoRowDuo = BaseMutableRepoRowDuo;
class BaseMutableRowDuo extends SQDIDuo {
    constructor() {
        super('MutableRow');
    }
}
exports.BaseMutableRowDuo = BaseMutableRowDuo;
class BaseOperationHistoryDuo extends SQDIDuo {
    constructor() {
        super('OperationHistory');
    }
}
exports.BaseOperationHistoryDuo = BaseOperationHistoryDuo;
class BaseRecordHistoryDuo extends SQDIDuo {
    constructor() {
        super('RecordHistory');
    }
}
exports.BaseRecordHistoryDuo = BaseRecordHistoryDuo;
class BaseRecordHistoryNewValueDuo extends SQDIDuo {
    constructor() {
        super('RecordHistoryNewValue');
    }
}
exports.BaseRecordHistoryNewValueDuo = BaseRecordHistoryNewValueDuo;
class BaseRecordHistoryOldValueDuo extends SQDIDuo {
    constructor() {
        super('RecordHistoryOldValue');
    }
}
exports.BaseRecordHistoryOldValueDuo = BaseRecordHistoryOldValueDuo;
class BaseReferenceRowDuo extends SQDIDuo {
    constructor() {
        super('ReferenceRow');
    }
}
exports.BaseReferenceRowDuo = BaseReferenceRowDuo;
class BaseRepoTransHistoryChangedRepositoryActorDuo extends SQDIDuo {
    constructor() {
        super('RepoTransHistoryChangedRepositoryActor');
    }
}
exports.BaseRepoTransHistoryChangedRepositoryActorDuo = BaseRepoTransHistoryChangedRepositoryActorDuo;
class BaseRepositoryDuo extends SQDIDuo {
    constructor() {
        super('Repository');
    }
}
exports.BaseRepositoryDuo = BaseRepositoryDuo;
class BaseRepositoryActorDuo extends SQDIDuo {
    constructor() {
        super('RepositoryActor');
    }
}
exports.BaseRepositoryActorDuo = BaseRepositoryActorDuo;
class BaseRepositoryApplicationDuo extends SQDIDuo {
    constructor() {
        super('RepositoryApplication');
    }
}
exports.BaseRepositoryApplicationDuo = BaseRepositoryApplicationDuo;
class BaseRepositoryEntityDuo extends SQDIDuo {
    constructor() {
        super('RepositoryEntity');
    }
}
exports.BaseRepositoryEntityDuo = BaseRepositoryEntityDuo;
class BaseRepositorySchemaDuo extends SQDIDuo {
    constructor() {
        super('RepositorySchema');
    }
}
exports.BaseRepositorySchemaDuo = BaseRepositorySchemaDuo;
class BaseRepositoryTransactionHistoryDuo extends SQDIDuo {
    constructor() {
        super('RepositoryTransactionHistory');
    }
}
exports.BaseRepositoryTransactionHistoryDuo = BaseRepositoryTransactionHistoryDuo;
class BaseStageableDuo extends SQDIDuo {
    constructor() {
        super('Stageable');
    }
}
exports.BaseStageableDuo = BaseStageableDuo;
class BaseTransactionHistoryDuo extends SQDIDuo {
    constructor() {
        super('TransactionHistory');
    }
}
exports.BaseTransactionHistoryDuo = BaseTransactionHistoryDuo;
//# sourceMappingURL=baseDuos.js.map