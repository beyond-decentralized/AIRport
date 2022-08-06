import { Dvo, } from '@airbridge/validate';
import { Q, duoDiSet, } from './qApplication';
// Application Q object Dependency Injection readiness detection Dvo
export class SQDIDvo extends Dvo {
    constructor(dbEntityId) {
        super(dbEntityId, Q);
    }
}
export class BaseActorDvo extends SQDIDvo {
    static diSet() {
        return duoDiSet(0);
    }
    constructor() {
        super(0);
    }
}
export class BaseOperationHistoryDvo extends SQDIDvo {
    static diSet() {
        return duoDiSet(12);
    }
    constructor() {
        super(12);
    }
}
export class BaseRecordHistoryDvo extends SQDIDvo {
    static diSet() {
        return duoDiSet(3);
    }
    constructor() {
        super(3);
    }
}
export class BaseRecordHistoryNewValueDvo extends SQDIDvo {
    static diSet() {
        return duoDiSet(1);
    }
    constructor() {
        super(1);
    }
}
export class BaseRecordHistoryOldValueDvo extends SQDIDvo {
    static diSet() {
        return duoDiSet(2);
    }
    constructor() {
        super(2);
    }
}
export class BaseRepositoryDvo extends SQDIDvo {
    static diSet() {
        return duoDiSet(9);
    }
    constructor() {
        super(9);
    }
}
export class BaseRepositoryApplicationDvo extends SQDIDvo {
    static diSet() {
        return duoDiSet(8);
    }
    constructor() {
        super(8);
    }
}
export class BaseRepositoryClientDvo extends SQDIDvo {
    static diSet() {
        return duoDiSet(6);
    }
    constructor() {
        super(6);
    }
}
export class BaseRepositoryDatabaseDvo extends SQDIDvo {
    static diSet() {
        return duoDiSet(5);
    }
    constructor() {
        super(5);
    }
}
export class BaseRepositoryTerminalDvo extends SQDIDvo {
    static diSet() {
        return duoDiSet(7);
    }
    constructor() {
        super(7);
    }
}
export class BaseRepositoryTransactionHistoryDvo extends SQDIDvo {
    static diSet() {
        return duoDiSet(11);
    }
    constructor() {
        super(11);
    }
}
export class BaseRepositoryTypeDvo extends SQDIDvo {
    static diSet() {
        return duoDiSet(4);
    }
    constructor() {
        super(4);
    }
}
export class BaseTransactionHistoryDvo extends SQDIDvo {
    static diSet() {
        return duoDiSet(10);
    }
    constructor() {
        super(10);
    }
}
//# sourceMappingURL=baseDvos.js.map