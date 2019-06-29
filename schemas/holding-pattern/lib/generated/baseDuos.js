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
class BaseActorDuo extends SQDIDuo {
    static diSet() {
        return qSchema_1.duoDiSet(7);
    }
    constructor() {
        super(7);
    }
}
exports.BaseActorDuo = BaseActorDuo;
class BaseActorApplicationDuo extends SQDIDuo {
    static diSet() {
        return qSchema_1.duoDiSet(8);
    }
    constructor() {
        super(8);
    }
}
exports.BaseActorApplicationDuo = BaseActorApplicationDuo;
class BaseApplicationDuo extends SQDIDuo {
    static diSet() {
        return qSchema_1.duoDiSet(9);
    }
    constructor() {
        super(9);
    }
}
exports.BaseApplicationDuo = BaseApplicationDuo;
class BaseOperationHistoryDuo extends SQDIDuo {
    static diSet() {
        return qSchema_1.duoDiSet(0);
    }
    constructor() {
        super(0);
    }
}
exports.BaseOperationHistoryDuo = BaseOperationHistoryDuo;
class BaseRecordHistoryDuo extends SQDIDuo {
    static diSet() {
        return qSchema_1.duoDiSet(1);
    }
    constructor() {
        super(1);
    }
}
exports.BaseRecordHistoryDuo = BaseRecordHistoryDuo;
class BaseRecordHistoryNewValueDuo extends SQDIDuo {
    static diSet() {
        return qSchema_1.duoDiSet(2);
    }
    constructor() {
        super(2);
    }
}
exports.BaseRecordHistoryNewValueDuo = BaseRecordHistoryNewValueDuo;
class BaseRecordHistoryOldValueDuo extends SQDIDuo {
    static diSet() {
        return qSchema_1.duoDiSet(3);
    }
    constructor() {
        super(3);
    }
}
exports.BaseRecordHistoryOldValueDuo = BaseRecordHistoryOldValueDuo;
class BaseRepoTransHistoryChangedRepositoryActorDuo extends SQDIDuo {
    static diSet() {
        return qSchema_1.duoDiSet(4);
    }
    constructor() {
        super(4);
    }
}
exports.BaseRepoTransHistoryChangedRepositoryActorDuo = BaseRepoTransHistoryChangedRepositoryActorDuo;
class BaseRepositoryDuo extends SQDIDuo {
    static diSet() {
        return qSchema_1.duoDiSet(10);
    }
    constructor() {
        super(10);
    }
}
exports.BaseRepositoryDuo = BaseRepositoryDuo;
class BaseRepositoryActorDuo extends SQDIDuo {
    static diSet() {
        return qSchema_1.duoDiSet(11);
    }
    constructor() {
        super(11);
    }
}
exports.BaseRepositoryActorDuo = BaseRepositoryActorDuo;
class BaseRepositoryApplicationDuo extends SQDIDuo {
    static diSet() {
        return qSchema_1.duoDiSet(12);
    }
    constructor() {
        super(12);
    }
}
exports.BaseRepositoryApplicationDuo = BaseRepositoryApplicationDuo;
class BaseRepositorySchemaDuo extends SQDIDuo {
    static diSet() {
        return qSchema_1.duoDiSet(13);
    }
    constructor() {
        super(13);
    }
}
exports.BaseRepositorySchemaDuo = BaseRepositorySchemaDuo;
class BaseRepositoryTransactionHistoryDuo extends SQDIDuo {
    static diSet() {
        return qSchema_1.duoDiSet(5);
    }
    constructor() {
        super(5);
    }
}
exports.BaseRepositoryTransactionHistoryDuo = BaseRepositoryTransactionHistoryDuo;
class BaseTransactionHistoryDuo extends SQDIDuo {
    static diSet() {
        return qSchema_1.duoDiSet(6);
    }
    constructor() {
        super(6);
    }
}
exports.BaseTransactionHistoryDuo = BaseTransactionHistoryDuo;
//# sourceMappingURL=baseDuos.js.map