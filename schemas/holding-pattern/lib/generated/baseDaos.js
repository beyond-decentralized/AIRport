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
class BaseActorDao extends SQDIDao {
    static diSet() {
        return qSchema_1.diSet(7);
    }
    constructor() {
        super(7);
    }
}
exports.BaseActorDao = BaseActorDao;
class BaseActorApplicationDao extends SQDIDao {
    static diSet() {
        return qSchema_1.diSet(8);
    }
    constructor() {
        super(8);
    }
}
exports.BaseActorApplicationDao = BaseActorApplicationDao;
class BaseApplicationDao extends SQDIDao {
    static diSet() {
        return qSchema_1.diSet(9);
    }
    constructor() {
        super(9);
    }
}
exports.BaseApplicationDao = BaseApplicationDao;
class BaseOperationHistoryDao extends SQDIDao {
    static diSet() {
        return qSchema_1.diSet(0);
    }
    constructor() {
        super(0);
    }
}
exports.BaseOperationHistoryDao = BaseOperationHistoryDao;
class BaseRecordHistoryDao extends SQDIDao {
    static diSet() {
        return qSchema_1.diSet(1);
    }
    constructor() {
        super(1);
    }
}
exports.BaseRecordHistoryDao = BaseRecordHistoryDao;
class BaseRecordHistoryNewValueDao extends SQDIDao {
    static diSet() {
        return qSchema_1.diSet(2);
    }
    constructor() {
        super(2);
    }
}
exports.BaseRecordHistoryNewValueDao = BaseRecordHistoryNewValueDao;
class BaseRecordHistoryOldValueDao extends SQDIDao {
    static diSet() {
        return qSchema_1.diSet(3);
    }
    constructor() {
        super(3);
    }
}
exports.BaseRecordHistoryOldValueDao = BaseRecordHistoryOldValueDao;
class BaseRepoTransHistoryChangedRepositoryActorDao extends SQDIDao {
    static diSet() {
        return qSchema_1.diSet(4);
    }
    constructor() {
        super(4);
    }
}
exports.BaseRepoTransHistoryChangedRepositoryActorDao = BaseRepoTransHistoryChangedRepositoryActorDao;
class BaseRepositoryDao extends SQDIDao {
    static diSet() {
        return qSchema_1.diSet(10);
    }
    constructor() {
        super(10);
    }
}
exports.BaseRepositoryDao = BaseRepositoryDao;
class BaseRepositoryActorDao extends SQDIDao {
    static diSet() {
        return qSchema_1.diSet(11);
    }
    constructor() {
        super(11);
    }
}
exports.BaseRepositoryActorDao = BaseRepositoryActorDao;
class BaseRepositoryApplicationDao extends SQDIDao {
    static diSet() {
        return qSchema_1.diSet(12);
    }
    constructor() {
        super(12);
    }
}
exports.BaseRepositoryApplicationDao = BaseRepositoryApplicationDao;
class BaseRepositorySchemaDao extends SQDIDao {
    static diSet() {
        return qSchema_1.diSet(13);
    }
    constructor() {
        super(13);
    }
}
exports.BaseRepositorySchemaDao = BaseRepositorySchemaDao;
class BaseRepositoryTransactionHistoryDao extends SQDIDao {
    static diSet() {
        return qSchema_1.diSet(5);
    }
    constructor() {
        super(5);
    }
}
exports.BaseRepositoryTransactionHistoryDao = BaseRepositoryTransactionHistoryDao;
class BaseTransactionHistoryDao extends SQDIDao {
    static diSet() {
        return qSchema_1.diSet(6);
    }
    constructor() {
        super(6);
    }
}
exports.BaseTransactionHistoryDao = BaseTransactionHistoryDao;
//# sourceMappingURL=baseDaos.js.map