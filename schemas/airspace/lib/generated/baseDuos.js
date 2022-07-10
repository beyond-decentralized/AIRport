import { Duo, } from '@airport/tarmaq-dao';
import { Q, duoDiSet, } from './qApplication';
// Application Q object Dependency Injection readiness detection Duo
export class SQDIDuo extends Duo {
    constructor(dbEntityId) {
        super(dbEntityId, Q);
    }
}
export class BaseApplicationDuo extends SQDIDuo {
    static diSet() {
        return duoDiSet(10);
    }
    constructor() {
        super(10);
    }
}
export class BaseApplicationColumnDuo extends SQDIDuo {
    static diSet() {
        return duoDiSet(4);
    }
    constructor() {
        super(4);
    }
}
export class BaseApplicationCurrentVersionDuo extends SQDIDuo {
    static diSet() {
        return duoDiSet(9);
    }
    constructor() {
        super(9);
    }
}
export class BaseApplicationEntityDuo extends SQDIDuo {
    static diSet() {
        return duoDiSet(6);
    }
    constructor() {
        super(6);
    }
}
export class BaseApplicationOperationDuo extends SQDIDuo {
    static diSet() {
        return duoDiSet(5);
    }
    constructor() {
        super(5);
    }
}
export class BaseApplicationPropertyDuo extends SQDIDuo {
    static diSet() {
        return duoDiSet(2);
    }
    constructor() {
        super(2);
    }
}
export class BaseApplicationPropertyColumnDuo extends SQDIDuo {
    static diSet() {
        return duoDiSet(3);
    }
    constructor() {
        super(3);
    }
}
export class BaseApplicationReferenceDuo extends SQDIDuo {
    static diSet() {
        return duoDiSet(7);
    }
    constructor() {
        super(7);
    }
}
export class BaseApplicationRelationDuo extends SQDIDuo {
    static diSet() {
        return duoDiSet(1);
    }
    constructor() {
        super(1);
    }
}
export class BaseApplicationRelationColumnDuo extends SQDIDuo {
    static diSet() {
        return duoDiSet(0);
    }
    constructor() {
        super(0);
    }
}
export class BaseApplicationVersionDuo extends SQDIDuo {
    static diSet() {
        return duoDiSet(8);
    }
    constructor() {
        super(8);
    }
}
export class BaseDomainDuo extends SQDIDuo {
    static diSet() {
        return duoDiSet(11);
    }
    constructor() {
        super(11);
    }
}
//# sourceMappingURL=baseDuos.js.map