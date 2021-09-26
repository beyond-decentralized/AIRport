import { Duo, } from '@airport/check-in';
import { Q, duoDiSet, } from './qSchema';
// Schema Q object Dependency Injection readiness detection Duo
export class SQDIDuo extends Duo {
    constructor(dbEntityId) {
        super(dbEntityId, Q);
    }
}
export class BaseMissingRecordDuo extends SQDIDuo {
    static diSet() {
        return duoDiSet(0);
    }
    constructor() {
        super(0);
    }
}
export class BaseMissingRecordRepoTransBlockDuo extends SQDIDuo {
    static diSet() {
        return duoDiSet(1);
    }
    constructor() {
        super(1);
    }
}
export class BaseRecordUpdateStageDuo extends SQDIDuo {
    static diSet() {
        return duoDiSet(8);
    }
    constructor() {
        super(8);
    }
}
export class BaseRepoTransBlockResponseStageDuo extends SQDIDuo {
    static diSet() {
        return duoDiSet(9);
    }
    constructor() {
        super(9);
    }
}
export class BaseRepoTransBlockSchemaToChangeDuo extends SQDIDuo {
    static diSet() {
        return duoDiSet(3);
    }
    constructor() {
        super(3);
    }
}
export class BaseRepositoryTransactionBlockDuo extends SQDIDuo {
    static diSet() {
        return duoDiSet(4);
    }
    constructor() {
        super(4);
    }
}
export class BaseRepositoryTransactionHistoryUpdateStageDuo extends SQDIDuo {
    static diSet() {
        return duoDiSet(10);
    }
    constructor() {
        super(10);
    }
}
export class BaseSharingMessageDuo extends SQDIDuo {
    static diSet() {
        return duoDiSet(6);
    }
    constructor() {
        super(6);
    }
}
export class BaseSharingMessageRepoTransBlockDuo extends SQDIDuo {
    static diSet() {
        return duoDiSet(5);
    }
    constructor() {
        super(5);
    }
}
export class BaseSharingNodeDuo extends SQDIDuo {
    static diSet() {
        return duoDiSet(7);
    }
    constructor() {
        super(7);
    }
}
export class BaseSharingNodeRepoTransBlockDuo extends SQDIDuo {
    static diSet() {
        return duoDiSet(2);
    }
    constructor() {
        super(2);
    }
}
export class BaseSharingNodeRepoTransBlockStageDuo extends SQDIDuo {
    static diSet() {
        return duoDiSet(11);
    }
    constructor() {
        super(11);
    }
}
export class BaseSharingNodeRepositoryDuo extends SQDIDuo {
    static diSet() {
        return duoDiSet(12);
    }
    constructor() {
        super(12);
    }
}
export class BaseSharingNodeTerminalDuo extends SQDIDuo {
    static diSet() {
        return duoDiSet(13);
    }
    constructor() {
        super(13);
    }
}
export class BaseSynchronizationConflictDuo extends SQDIDuo {
    static diSet() {
        return duoDiSet(15);
    }
    constructor() {
        super(15);
    }
}
export class BaseSynchronizationConflictPendingNotificationDuo extends SQDIDuo {
    static diSet() {
        return duoDiSet(16);
    }
    constructor() {
        super(16);
    }
}
export class BaseSynchronizationConflictValuesDuo extends SQDIDuo {
    static diSet() {
        return duoDiSet(14);
    }
    constructor() {
        super(14);
    }
}
//# sourceMappingURL=baseDuos.js.map