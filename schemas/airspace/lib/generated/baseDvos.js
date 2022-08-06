import { Dvo, } from '@airbridge/validate';
import { Q, duoDiSet, } from './qApplication';
// Application Q object Dependency Injection readiness detection Dvo
export class SQDIDvo extends Dvo {
    constructor(dbEntityId) {
        super(dbEntityId, Q);
    }
}
export class BaseApplicationDvo extends SQDIDvo {
    static diSet() {
        return duoDiSet(10);
    }
    constructor() {
        super(10);
    }
}
export class BaseApplicationColumnDvo extends SQDIDvo {
    static diSet() {
        return duoDiSet(4);
    }
    constructor() {
        super(4);
    }
}
export class BaseApplicationCurrentVersionDvo extends SQDIDvo {
    static diSet() {
        return duoDiSet(9);
    }
    constructor() {
        super(9);
    }
}
export class BaseApplicationEntityDvo extends SQDIDvo {
    static diSet() {
        return duoDiSet(6);
    }
    constructor() {
        super(6);
    }
}
export class BaseApplicationOperationDvo extends SQDIDvo {
    static diSet() {
        return duoDiSet(5);
    }
    constructor() {
        super(5);
    }
}
export class BaseApplicationPropertyDvo extends SQDIDvo {
    static diSet() {
        return duoDiSet(2);
    }
    constructor() {
        super(2);
    }
}
export class BaseApplicationPropertyColumnDvo extends SQDIDvo {
    static diSet() {
        return duoDiSet(3);
    }
    constructor() {
        super(3);
    }
}
export class BaseApplicationReferenceDvo extends SQDIDvo {
    static diSet() {
        return duoDiSet(7);
    }
    constructor() {
        super(7);
    }
}
export class BaseApplicationRelationDvo extends SQDIDvo {
    static diSet() {
        return duoDiSet(1);
    }
    constructor() {
        super(1);
    }
}
export class BaseApplicationRelationColumnDvo extends SQDIDvo {
    static diSet() {
        return duoDiSet(0);
    }
    constructor() {
        super(0);
    }
}
export class BaseApplicationVersionDvo extends SQDIDvo {
    static diSet() {
        return duoDiSet(8);
    }
    constructor() {
        super(8);
    }
}
export class BaseDomainDvo extends SQDIDvo {
    static diSet() {
        return duoDiSet(11);
    }
    constructor() {
        super(11);
    }
}
//# sourceMappingURL=baseDvos.js.map