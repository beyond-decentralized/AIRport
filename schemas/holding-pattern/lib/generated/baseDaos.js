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
class BaseActorDao extends SQDIDao {
    constructor() {
        super('Actor', qSchema_1.Q);
    }
}
exports.BaseActorDao = BaseActorDao;
class BaseActorApplicationDao extends SQDIDao {
    constructor() {
        super('ActorApplication', qSchema_1.Q);
    }
}
exports.BaseActorApplicationDao = BaseActorApplicationDao;
class BaseApplicationDao extends SQDIDao {
    constructor() {
        super('Application', qSchema_1.Q);
    }
}
exports.BaseApplicationDao = BaseApplicationDao;
class BaseChildRepoRowDao extends SQDIDao {
    constructor() {
        super('ChildRepoRow', qSchema_1.Q);
    }
}
exports.BaseChildRepoRowDao = BaseChildRepoRowDao;
class BaseChildRowDao extends SQDIDao {
    constructor() {
        super('ChildRow', qSchema_1.Q);
    }
}
exports.BaseChildRowDao = BaseChildRowDao;
class BaseImmutableRepoRowDao extends SQDIDao {
    constructor() {
        super('ImmutableRepoRow', qSchema_1.Q);
    }
}
exports.BaseImmutableRepoRowDao = BaseImmutableRepoRowDao;
class BaseImmutableRowDao extends SQDIDao {
    constructor() {
        super('ImmutableRow', qSchema_1.Q);
    }
}
exports.BaseImmutableRowDao = BaseImmutableRowDao;
class BaseMutableRepoRowDao extends SQDIDao {
    constructor() {
        super('MutableRepoRow', qSchema_1.Q);
    }
}
exports.BaseMutableRepoRowDao = BaseMutableRepoRowDao;
class BaseMutableRowDao extends SQDIDao {
    constructor() {
        super('MutableRow', qSchema_1.Q);
    }
}
exports.BaseMutableRowDao = BaseMutableRowDao;
class BaseOperationHistoryDao extends SQDIDao {
    constructor() {
        super('OperationHistory', qSchema_1.Q);
    }
}
exports.BaseOperationHistoryDao = BaseOperationHistoryDao;
class BaseRecordHistoryDao extends SQDIDao {
    constructor() {
        super('RecordHistory', qSchema_1.Q);
    }
}
exports.BaseRecordHistoryDao = BaseRecordHistoryDao;
class BaseRecordHistoryNewValueDao extends SQDIDao {
    constructor() {
        super('RecordHistoryNewValue', qSchema_1.Q);
    }
}
exports.BaseRecordHistoryNewValueDao = BaseRecordHistoryNewValueDao;
class BaseRecordHistoryOldValueDao extends SQDIDao {
    constructor() {
        super('RecordHistoryOldValue', qSchema_1.Q);
    }
}
exports.BaseRecordHistoryOldValueDao = BaseRecordHistoryOldValueDao;
class BaseReferenceRowDao extends SQDIDao {
    constructor() {
        super('ReferenceRow', qSchema_1.Q);
    }
}
exports.BaseReferenceRowDao = BaseReferenceRowDao;
class BaseRepoTransHistoryChangedRepositoryActorDao extends SQDIDao {
    constructor() {
        super('RepoTransHistoryChangedRepositoryActor', qSchema_1.Q);
    }
}
exports.BaseRepoTransHistoryChangedRepositoryActorDao = BaseRepoTransHistoryChangedRepositoryActorDao;
class BaseRepositoryDao extends SQDIDao {
    constructor() {
        super('Repository', qSchema_1.Q);
    }
}
exports.BaseRepositoryDao = BaseRepositoryDao;
class BaseRepositoryActorDao extends SQDIDao {
    constructor() {
        super('RepositoryActor', qSchema_1.Q);
    }
}
exports.BaseRepositoryActorDao = BaseRepositoryActorDao;
class BaseRepositoryApplicationDao extends SQDIDao {
    constructor() {
        super('RepositoryApplication', qSchema_1.Q);
    }
}
exports.BaseRepositoryApplicationDao = BaseRepositoryApplicationDao;
class BaseRepositoryEntityDao extends SQDIDao {
    constructor() {
        super('RepositoryEntity', qSchema_1.Q);
    }
}
exports.BaseRepositoryEntityDao = BaseRepositoryEntityDao;
class BaseRepositorySchemaDao extends SQDIDao {
    constructor() {
        super('RepositorySchema', qSchema_1.Q);
    }
}
exports.BaseRepositorySchemaDao = BaseRepositorySchemaDao;
class BaseRepositoryTransactionHistoryDao extends SQDIDao {
    constructor() {
        super('RepositoryTransactionHistory', qSchema_1.Q);
    }
}
exports.BaseRepositoryTransactionHistoryDao = BaseRepositoryTransactionHistoryDao;
class BaseStageableDao extends SQDIDao {
    constructor() {
        super('Stageable', qSchema_1.Q);
    }
}
exports.BaseStageableDao = BaseStageableDao;
class BaseTransactionHistoryDao extends SQDIDao {
    constructor() {
        super('TransactionHistory', qSchema_1.Q);
    }
}
exports.BaseTransactionHistoryDao = BaseTransactionHistoryDao;
//# sourceMappingURL=baseDaos.js.map