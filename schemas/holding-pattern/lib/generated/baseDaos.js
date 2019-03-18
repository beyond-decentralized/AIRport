"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const check_in_1 = require("@airport/check-in");
const qSchema_1 = require("./qSchema");
class BaseAbstractRepositoryEntityDao extends check_in_1.Dao {
    constructor() {
        super(qSchema_1.Q.db.currentVersion.entityMapByName['AbstractRepositoryEntity'], qSchema_1.Q);
    }
}
exports.BaseAbstractRepositoryEntityDao = BaseAbstractRepositoryEntityDao;
class BaseActorDao extends check_in_1.Dao {
    constructor() {
        super(qSchema_1.Q.db.currentVersion.entityMapByName['Actor'], qSchema_1.Q);
    }
}
exports.BaseActorDao = BaseActorDao;
class BaseActorApplicationDao extends check_in_1.Dao {
    constructor() {
        super(qSchema_1.Q.db.currentVersion.entityMapByName['ActorApplication'], qSchema_1.Q);
    }
}
exports.BaseActorApplicationDao = BaseActorApplicationDao;
class BaseApplicationDao extends check_in_1.Dao {
    constructor() {
        super(qSchema_1.Q.db.currentVersion.entityMapByName['Application'], qSchema_1.Q);
    }
}
exports.BaseApplicationDao = BaseApplicationDao;
class BaseOperationHistoryDao extends check_in_1.Dao {
    constructor() {
        super(qSchema_1.Q.db.currentVersion.entityMapByName['OperationHistory'], qSchema_1.Q);
    }
}
exports.BaseOperationHistoryDao = BaseOperationHistoryDao;
class BaseRecordHistoryDao extends check_in_1.Dao {
    constructor() {
        super(qSchema_1.Q.db.currentVersion.entityMapByName['RecordHistory'], qSchema_1.Q);
    }
}
exports.BaseRecordHistoryDao = BaseRecordHistoryDao;
class BaseRecordHistoryNewValueDao extends check_in_1.Dao {
    constructor() {
        super(qSchema_1.Q.db.currentVersion.entityMapByName['RecordHistoryNewValue'], qSchema_1.Q);
    }
}
exports.BaseRecordHistoryNewValueDao = BaseRecordHistoryNewValueDao;
class BaseRecordHistoryOldValueDao extends check_in_1.Dao {
    constructor() {
        super(qSchema_1.Q.db.currentVersion.entityMapByName['RecordHistoryOldValue'], qSchema_1.Q);
    }
}
exports.BaseRecordHistoryOldValueDao = BaseRecordHistoryOldValueDao;
class BaseRepoTransHistoryChangedRepositoryActorDao extends check_in_1.Dao {
    constructor() {
        super(qSchema_1.Q.db.currentVersion.entityMapByName['RepoTransHistoryChangedRepositoryActor'], qSchema_1.Q);
    }
}
exports.BaseRepoTransHistoryChangedRepositoryActorDao = BaseRepoTransHistoryChangedRepositoryActorDao;
class BaseRepositoryDao extends check_in_1.Dao {
    constructor() {
        super(qSchema_1.Q.db.currentVersion.entityMapByName['Repository'], qSchema_1.Q);
    }
}
exports.BaseRepositoryDao = BaseRepositoryDao;
class BaseRepositoryActorDao extends check_in_1.Dao {
    constructor() {
        super(qSchema_1.Q.db.currentVersion.entityMapByName['RepositoryActor'], qSchema_1.Q);
    }
}
exports.BaseRepositoryActorDao = BaseRepositoryActorDao;
class BaseRepositoryApplicationDao extends check_in_1.Dao {
    constructor() {
        super(qSchema_1.Q.db.currentVersion.entityMapByName['RepositoryApplication'], qSchema_1.Q);
    }
}
exports.BaseRepositoryApplicationDao = BaseRepositoryApplicationDao;
class BaseRepositorySchemaDao extends check_in_1.Dao {
    constructor() {
        super(qSchema_1.Q.db.currentVersion.entityMapByName['RepositorySchema'], qSchema_1.Q);
    }
}
exports.BaseRepositorySchemaDao = BaseRepositorySchemaDao;
class BaseRepositoryTransactionHistoryDao extends check_in_1.Dao {
    constructor() {
        super(qSchema_1.Q.db.currentVersion.entityMapByName['RepositoryTransactionHistory'], qSchema_1.Q);
    }
}
exports.BaseRepositoryTransactionHistoryDao = BaseRepositoryTransactionHistoryDao;
class BaseTransactionHistoryDao extends check_in_1.Dao {
    constructor() {
        super(qSchema_1.Q.db.currentVersion.entityMapByName['TransactionHistory'], qSchema_1.Q);
    }
}
exports.BaseTransactionHistoryDao = BaseTransactionHistoryDao;
//# sourceMappingURL=baseDaos.js.map