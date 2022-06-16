import { Duo, } from '@airport/check-in';
import { Q, duoDiSet, } from './qApplication';
// Application Q object Dependency Injection readiness detection Duo
export class SQDIDuo extends Duo {
    constructor(dbEntityId) {
        super(dbEntityId, Q);
    }
}
export class BaseContinentDuo extends SQDIDuo {
    static diSet() {
        return duoDiSet(2);
    }
    constructor() {
        super(2);
    }
}
export class BaseCountryDuo extends SQDIDuo {
    static diSet() {
        return duoDiSet(1);
    }
    constructor() {
        super(1);
    }
}
export class BaseTerminalDuo extends SQDIDuo {
    static diSet() {
        return duoDiSet(3);
    }
    constructor() {
        super(3);
    }
}
export class BaseUserDuo extends SQDIDuo {
    static diSet() {
        return duoDiSet(0);
    }
    constructor() {
        super(0);
    }
}
export class BaseUserTerminalDuo extends SQDIDuo {
    static diSet() {
        return duoDiSet(4);
    }
    constructor() {
        super(4);
    }
}
//# sourceMappingURL=baseDuos.js.map