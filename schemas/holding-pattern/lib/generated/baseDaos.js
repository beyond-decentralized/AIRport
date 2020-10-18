import { Dao } from '@airport/check-in';
import { Q, duoDiSet } from './qSchema';
// Schema Q object Dependency Injection readiness detection Dao
export class SQDIDao extends Dao {
    constructor(dbEntityId) {
        super(dbEntityId, Q);
    }
}
export class BaseActorDao extends SQDIDao {
    static diSet() {
        return duoDiSet(6);
    }
    constructor() {
        super(6);
    }
}
export class BaseActorApplicationDao extends SQDIDao {
    static diSet() {
        return duoDiSet(1);
    }
    constructor() {
        super(1);
    }
}
export class BaseApplicationDao extends SQDIDao {
    static diSet() {
        return duoDiSet(2);
    }
    constructor() {
        super(2);
    }
}
export class BaseOperationHistoryDao extends SQDIDao {
    static diSet() {
        return duoDiSet(12);
    }
    constructor() {
        super(12);
    }
}
export class BaseRecordHistoryDao extends SQDIDao {
    static diSet() {
        return duoDiSet(0);
    }
    constructor() {
        super(0);
    }
}
export class BaseRecordHistoryNewValueDao extends SQDIDao {
    static diSet() {
        return duoDiSet(8);
    }
    constructor() {
        super(8);
    }
}
export class BaseRecordHistoryOldValueDao extends SQDIDao {
    static diSet() {
        return duoDiSet(9);
    }
    constructor() {
        super(9);
    }
}
export class BaseRepoTransHistoryChangedRepositoryActorDao extends SQDIDao {
    static diSet() {
        return duoDiSet(7);
    }
    constructor() {
        super(7);
    }
}
export class BaseRepositoryDao extends SQDIDao {
    static diSet() {
        return duoDiSet(4);
    }
    constructor() {
        super(4);
    }
}
export class BaseRepositoryActorDao extends SQDIDao {
    static diSet() {
        return duoDiSet(5);
    }
    constructor() {
        super(5);
    }
}
export class BaseRepositoryApplicationDao extends SQDIDao {
    static diSet() {
        return duoDiSet(3);
    }
    constructor() {
        super(3);
    }
}
export class BaseRepositorySchemaDao extends SQDIDao {
    static diSet() {
        return duoDiSet(13);
    }
    constructor() {
        super(13);
    }
}
export class BaseRepositoryTransactionHistoryDao extends SQDIDao {
    static diSet() {
        return duoDiSet(11);
    }
    constructor() {
        super(11);
    }
}
export class BaseTransactionHistoryDao extends SQDIDao {
    static diSet() {
        return duoDiSet(10);
    }
    constructor() {
        super(10);
    }
}
//# sourceMappingURL=baseDaos.js.map