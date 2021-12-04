import { Duo, } from '@airport/check-in';
import { Q, duoDiSet, } from './qApplication';
// Application Q object Dependency Injection readiness detection Duo
export class SQDIDuo extends Duo {
    constructor(dbEntityId) {
        super(dbEntityId, Q);
    }
}
export class BaseAgtRepositoryTransactionBlockDuo extends SQDIDuo {
    static diSet() {
        return duoDiSet(8);
    }
    constructor() {
        super(8);
    }
}
export class BaseAgtSharingMessageDuo extends SQDIDuo {
    static diSet() {
        return duoDiSet(1);
    }
    constructor() {
        super(1);
    }
}
export class BaseArchiveDuo extends SQDIDuo {
    static diSet() {
        return duoDiSet(14);
    }
    constructor() {
        super(14);
    }
}
export class BaseDailyArchiveLogDuo extends SQDIDuo {
    static diSet() {
        return duoDiSet(10);
    }
    constructor() {
        super(10);
    }
}
export class BaseDailyTerminalSyncLogDuo extends SQDIDuo {
    static diSet() {
        return duoDiSet(11);
    }
    constructor() {
        super(11);
    }
}
export class BaseMonthlyArchiveLogDuo extends SQDIDuo {
    static diSet() {
        return duoDiSet(12);
    }
    constructor() {
        super(12);
    }
}
export class BaseMonthlyTerminalSyncLogDuo extends SQDIDuo {
    static diSet() {
        return duoDiSet(13);
    }
    constructor() {
        super(13);
    }
}
export class BaseRepositoryDuo extends SQDIDuo {
    static diSet() {
        return duoDiSet(9);
    }
    constructor() {
        super(9);
    }
}
export class BaseRepositoryArchiveDuo extends SQDIDuo {
    static diSet() {
        return duoDiSet(15);
    }
    constructor() {
        super(15);
    }
}
export class BaseSecurityAnswerDuo extends SQDIDuo {
    static diSet() {
        return duoDiSet(3);
    }
    constructor() {
        super(3);
    }
}
export class BaseSecurityQuestionDuo extends SQDIDuo {
    static diSet() {
        return duoDiSet(2);
    }
    constructor() {
        super(2);
    }
}
export class BaseServerDuo extends SQDIDuo {
    static diSet() {
        return duoDiSet(17);
    }
    constructor() {
        super(17);
    }
}
export class BaseServerSyncLogDuo extends SQDIDuo {
    static diSet() {
        return duoDiSet(16);
    }
    constructor() {
        super(16);
    }
}
export class BaseSyncLogDuo extends SQDIDuo {
    static diSet() {
        return duoDiSet(0);
    }
    constructor() {
        super(0);
    }
}
export class BaseTerminalDuo extends SQDIDuo {
    static diSet() {
        return duoDiSet(7);
    }
    constructor() {
        super(7);
    }
}
export class BaseTerminalRepositoryDuo extends SQDIDuo {
    static diSet() {
        return duoDiSet(6);
    }
    constructor() {
        super(6);
    }
}
export class BaseTuningParametersDuo extends SQDIDuo {
    static diSet() {
        return duoDiSet(18);
    }
    constructor() {
        super(18);
    }
}
export class BaseUserDuo extends SQDIDuo {
    static diSet() {
        return duoDiSet(5);
    }
    constructor() {
        super(5);
    }
}
export class BaseUserRepositoryDuo extends SQDIDuo {
    static diSet() {
        return duoDiSet(4);
    }
    constructor() {
        super(4);
    }
}
//# sourceMappingURL=baseDuos.js.map