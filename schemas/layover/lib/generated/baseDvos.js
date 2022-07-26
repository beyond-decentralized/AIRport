import { Dvo, } from '@airport/airbridge-validate';
import { Q, duoDiSet, } from './qApplication';
// Application Q object Dependency Injection readiness detection Dvo
export class SQDIDvo extends Dvo {
    constructor(dbEntityId) {
        super(dbEntityId, Q);
    }
}
export class BaseRecordUpdateStageDvo extends SQDIDvo {
    static diSet() {
        return duoDiSet(0);
    }
    constructor() {
        super(0);
    }
}
export class BaseSynchronizationConflictDvo extends SQDIDvo {
    static diSet() {
        return duoDiSet(2);
    }
    constructor() {
        super(2);
    }
}
export class BaseSynchronizationConflictValuesDvo extends SQDIDvo {
    static diSet() {
        return duoDiSet(1);
    }
    constructor() {
        super(1);
    }
}
//# sourceMappingURL=baseDvos.js.map