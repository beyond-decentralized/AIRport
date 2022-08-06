import { Dvo, } from '@airbridge/validate';
import { Q, duoDiSet, } from './qApplication';
// Application Q object Dependency Injection readiness detection Dvo
export class SQDIDvo extends Dvo {
    constructor(dbEntityId) {
        super(dbEntityId, Q);
    }
}
export class BaseClassificationDvo extends SQDIDvo {
    static diSet() {
        return duoDiSet(6);
    }
    constructor() {
        super(6);
    }
}
export class BaseClientDvo extends SQDIDvo {
    static diSet() {
        return duoDiSet(10);
    }
    constructor() {
        super(10);
    }
}
export class BaseClientTypeDvo extends SQDIDvo {
    static diSet() {
        return duoDiSet(9);
    }
    constructor() {
        super(9);
    }
}
export class BaseContinentDvo extends SQDIDvo {
    static diSet() {
        return duoDiSet(0);
    }
    constructor() {
        super(0);
    }
}
export class BaseCountryDvo extends SQDIDvo {
    static diSet() {
        return duoDiSet(1);
    }
    constructor() {
        super(1);
    }
}
export class BaseDatabaseDvo extends SQDIDvo {
    static diSet() {
        return duoDiSet(12);
    }
    constructor() {
        super(12);
    }
}
export class BaseDatabaseTypeDvo extends SQDIDvo {
    static diSet() {
        return duoDiSet(11);
    }
    constructor() {
        super(11);
    }
}
export class BaseMetroAreaDvo extends SQDIDvo {
    static diSet() {
        return duoDiSet(4);
    }
    constructor() {
        super(4);
    }
}
export class BaseMetroAreaStateDvo extends SQDIDvo {
    static diSet() {
        return duoDiSet(3);
    }
    constructor() {
        super(3);
    }
}
export class BaseStateDvo extends SQDIDvo {
    static diSet() {
        return duoDiSet(2);
    }
    constructor() {
        super(2);
    }
}
export class BaseTerminalDvo extends SQDIDvo {
    static diSet() {
        return duoDiSet(14);
    }
    constructor() {
        super(14);
    }
}
export class BaseTerminalTypeDvo extends SQDIDvo {
    static diSet() {
        return duoDiSet(13);
    }
    constructor() {
        super(13);
    }
}
export class BaseTypeDvo extends SQDIDvo {
    static diSet() {
        return duoDiSet(8);
    }
    constructor() {
        super(8);
    }
}
export class BaseTypeClassificationDvo extends SQDIDvo {
    static diSet() {
        return duoDiSet(7);
    }
    constructor() {
        super(7);
    }
}
export class BaseUserAccountDvo extends SQDIDvo {
    static diSet() {
        return duoDiSet(5);
    }
    constructor() {
        super(5);
    }
}
//# sourceMappingURL=baseDvos.js.map