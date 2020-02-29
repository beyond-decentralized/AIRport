import { Dao } from '@airport/check-in';
import { Q, duoDiSet } from './qSchema';
// Schema Q object Dependency Injection readiness detection Dao
export class SQDIDao extends Dao {
    constructor(dbEntityId) {
        super(dbEntityId, Q);
    }
}
export class BaseMissingRecordDao extends SQDIDao {
    static diSet() {
        return duoDiSet(3);
    }
    constructor() {
        super(3);
    }
}
export class BaseMissingRecordRepoTransBlockDao extends SQDIDao {
    static diSet() {
        return duoDiSet(16);
    }
    constructor() {
        super(16);
    }
}
export class BaseRecordUpdateStageDao extends SQDIDao {
    static diSet() {
        return duoDiSet(4);
    }
    constructor() {
        super(4);
    }
}
export class BaseRepoTransBlockResponseStageDao extends SQDIDao {
    static diSet() {
        return duoDiSet(5);
    }
    constructor() {
        super(5);
    }
}
export class BaseRepoTransBlockSchemaToChangeDao extends SQDIDao {
    static diSet() {
        return duoDiSet(6);
    }
    constructor() {
        super(6);
    }
}
export class BaseRepositoryTransactionBlockDao extends SQDIDao {
    static diSet() {
        return duoDiSet(15);
    }
    constructor() {
        super(15);
    }
}
export class BaseRepositoryTransactionHistoryUpdateStageDao extends SQDIDao {
    static diSet() {
        return duoDiSet(7);
    }
    constructor() {
        super(7);
    }
}
export class BaseSharingMessageDao extends SQDIDao {
    static diSet() {
        return duoDiSet(13);
    }
    constructor() {
        super(13);
    }
}
export class BaseSharingMessageRepoTransBlockDao extends SQDIDao {
    static diSet() {
        return duoDiSet(14);
    }
    constructor() {
        super(14);
    }
}
export class BaseSharingNodeDao extends SQDIDao {
    static diSet() {
        return duoDiSet(9);
    }
    constructor() {
        super(9);
    }
}
export class BaseSharingNodeRepoTransBlockDao extends SQDIDao {
    static diSet() {
        return duoDiSet(8);
    }
    constructor() {
        super(8);
    }
}
export class BaseSharingNodeRepoTransBlockStageDao extends SQDIDao {
    static diSet() {
        return duoDiSet(10);
    }
    constructor() {
        super(10);
    }
}
export class BaseSharingNodeRepositoryDao extends SQDIDao {
    static diSet() {
        return duoDiSet(11);
    }
    constructor() {
        super(11);
    }
}
export class BaseSharingNodeTerminalDao extends SQDIDao {
    static diSet() {
        return duoDiSet(12);
    }
    constructor() {
        super(12);
    }
}
export class BaseSynchronizationConflictDao extends SQDIDao {
    static diSet() {
        return duoDiSet(1);
    }
    constructor() {
        super(1);
    }
}
export class BaseSynchronizationConflictPendingNotificationDao extends SQDIDao {
    static diSet() {
        return duoDiSet(2);
    }
    constructor() {
        super(2);
    }
}
export class BaseSynchronizationConflictValuesDao extends SQDIDao {
    static diSet() {
        return duoDiSet(0);
    }
    constructor() {
        super(0);
    }
}
//# sourceMappingURL=baseDaos.js.map