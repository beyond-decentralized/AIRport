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
class BaseActorDao extends SQDIDao {
    constructor() {
        super('Actor');
    }
}
exports.BaseActorDao = BaseActorDao;
class BaseActorApplicationDao extends SQDIDao {
    constructor() {
        super('ActorApplication');
    }
}
exports.BaseActorApplicationDao = BaseActorApplicationDao;
class BaseApplicationDao extends SQDIDao {
    constructor() {
        super('Application');
    }
}
exports.BaseApplicationDao = BaseApplicationDao;
class BaseChildRepoRowDao extends SQDIDao {
    constructor() {
        super('ChildRepoRow');
    }
}
exports.BaseChildRepoRowDao = BaseChildRepoRowDao;
class BaseChildRowDao extends SQDIDao {
    constructor() {
        super('ChildRow');
    }
}
exports.BaseChildRowDao = BaseChildRowDao;
class BaseImmutableRepoRowDao extends SQDIDao {
    constructor() {
        super('ImmutableRepoRow');
    }
}
exports.BaseImmutableRepoRowDao = BaseImmutableRepoRowDao;
class BaseImmutableRowDao extends SQDIDao {
    constructor() {
        super('ImmutableRow');
    }
}
exports.BaseImmutableRowDao = BaseImmutableRowDao;
class BaseMutableRepoRowDao extends SQDIDao {
    constructor() {
        super('MutableRepoRow');
    }
}
exports.BaseMutableRepoRowDao = BaseMutableRepoRowDao;
class BaseMutableRowDao extends SQDIDao {
    constructor() {
        super('MutableRow');
    }
}
exports.BaseMutableRowDao = BaseMutableRowDao;
class BaseOperationHistoryDao extends SQDIDao {
    constructor() {
        super('OperationHistory');
    }
}
exports.BaseOperationHistoryDao = BaseOperationHistoryDao;
class BaseRecordHistoryDao extends SQDIDao {
    constructor() {
        super('RecordHistory');
    }
}
exports.BaseRecordHistoryDao = BaseRecordHistoryDao;
class BaseRecordHistoryNewValueDao extends SQDIDao {
    constructor() {
        super('RecordHistoryNewValue');
    }
}
exports.BaseRecordHistoryNewValueDao = BaseRecordHistoryNewValueDao;
class BaseRecordHistoryOldValueDao extends SQDIDao {
    constructor() {
        super('RecordHistoryOldValue');
    }
}
exports.BaseRecordHistoryOldValueDao = BaseRecordHistoryOldValueDao;
class BaseReferenceRowDao extends SQDIDao {
    constructor() {
        super('ReferenceRow');
    }
}
exports.BaseReferenceRowDao = BaseReferenceRowDao;
class BaseRepoTransHistoryChangedRepositoryActorDao extends SQDIDao {
    constructor() {
        super('RepoTransHistoryChangedRepositoryActor');
    }
}
exports.BaseRepoTransHistoryChangedRepositoryActorDao = BaseRepoTransHistoryChangedRepositoryActorDao;
class BaseRepositoryDao extends SQDIDao {
    constructor() {
        super('Repository');
    }
}
exports.BaseRepositoryDao = BaseRepositoryDao;
class BaseRepositoryActorDao extends SQDIDao {
    constructor() {
        super('RepositoryActor');
    }
}
exports.BaseRepositoryActorDao = BaseRepositoryActorDao;
class BaseRepositoryApplicationDao extends SQDIDao {
    constructor() {
        super('RepositoryApplication');
    }
}
exports.BaseRepositoryApplicationDao = BaseRepositoryApplicationDao;
class BaseRepositoryEntityDao extends SQDIDao {
    constructor() {
        super('RepositoryEntity');
    }
}
exports.BaseRepositoryEntityDao = BaseRepositoryEntityDao;
class BaseRepositorySchemaDao extends SQDIDao {
    constructor() {
        super('RepositorySchema');
    }
}
exports.BaseRepositorySchemaDao = BaseRepositorySchemaDao;
class BaseRepositoryTransactionHistoryDao extends SQDIDao {
    constructor() {
        super('RepositoryTransactionHistory');
    }
}
exports.BaseRepositoryTransactionHistoryDao = BaseRepositoryTransactionHistoryDao;
class BaseStageableDao extends SQDIDao {
    constructor() {
        super('Stageable');
    }
}
exports.BaseStageableDao = BaseStageableDao;
class BaseTransactionHistoryDao extends SQDIDao {
    constructor() {
        super('TransactionHistory');
    }
}
exports.BaseTransactionHistoryDao = BaseTransactionHistoryDao;
//# sourceMappingURL=baseDaos.js.map