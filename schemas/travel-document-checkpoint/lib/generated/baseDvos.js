import { Dvo, } from '@airbridge/validate';
import { Q, air____at_airport_slash_travel_dash_document_dash_checkpoint_diSet, } from './qApplication';
// Application Q object Dependency Injection readiness detection Dvo
export class SQDIDvo extends Dvo {
    constructor(dbEntityId) {
        super(dbEntityId, Q);
    }
}
export class BaseClassificationDvo extends SQDIDvo {
    static diSet() {
        return air____at_airport_slash_travel_dash_document_dash_checkpoint_diSet(6);
    }
    constructor() {
        super(6);
    }
}
export class BaseClientDvo extends SQDIDvo {
    static diSet() {
        return air____at_airport_slash_travel_dash_document_dash_checkpoint_diSet(10);
    }
    constructor() {
        super(10);
    }
}
export class BaseClientTypeDvo extends SQDIDvo {
    static diSet() {
        return air____at_airport_slash_travel_dash_document_dash_checkpoint_diSet(9);
    }
    constructor() {
        super(9);
    }
}
export class BaseContinentDvo extends SQDIDvo {
    static diSet() {
        return air____at_airport_slash_travel_dash_document_dash_checkpoint_diSet(5);
    }
    constructor() {
        super(5);
    }
}
export class BaseCountryDvo extends SQDIDvo {
    static diSet() {
        return air____at_airport_slash_travel_dash_document_dash_checkpoint_diSet(0);
    }
    constructor() {
        super(0);
    }
}
export class BaseDatabaseDvo extends SQDIDvo {
    static diSet() {
        return air____at_airport_slash_travel_dash_document_dash_checkpoint_diSet(12);
    }
    constructor() {
        super(12);
    }
}
export class BaseDatabaseTypeDvo extends SQDIDvo {
    static diSet() {
        return air____at_airport_slash_travel_dash_document_dash_checkpoint_diSet(11);
    }
    constructor() {
        super(11);
    }
}
export class BaseMetroAreaDvo extends SQDIDvo {
    static diSet() {
        return air____at_airport_slash_travel_dash_document_dash_checkpoint_diSet(3);
    }
    constructor() {
        super(3);
    }
}
export class BaseMetroAreaStateDvo extends SQDIDvo {
    static diSet() {
        return air____at_airport_slash_travel_dash_document_dash_checkpoint_diSet(2);
    }
    constructor() {
        super(2);
    }
}
export class BaseStateDvo extends SQDIDvo {
    static diSet() {
        return air____at_airport_slash_travel_dash_document_dash_checkpoint_diSet(1);
    }
    constructor() {
        super(1);
    }
}
export class BaseTerminalDvo extends SQDIDvo {
    static diSet() {
        return air____at_airport_slash_travel_dash_document_dash_checkpoint_diSet(14);
    }
    constructor() {
        super(14);
    }
}
export class BaseTerminalTypeDvo extends SQDIDvo {
    static diSet() {
        return air____at_airport_slash_travel_dash_document_dash_checkpoint_diSet(13);
    }
    constructor() {
        super(13);
    }
}
export class BaseTypeDvo extends SQDIDvo {
    static diSet() {
        return air____at_airport_slash_travel_dash_document_dash_checkpoint_diSet(8);
    }
    constructor() {
        super(8);
    }
}
export class BaseTypeClassificationDvo extends SQDIDvo {
    static diSet() {
        return air____at_airport_slash_travel_dash_document_dash_checkpoint_diSet(7);
    }
    constructor() {
        super(7);
    }
}
export class BaseUserAccountDvo extends SQDIDvo {
    static diSet() {
        return air____at_airport_slash_travel_dash_document_dash_checkpoint_diSet(4);
    }
    constructor() {
        super(4);
    }
}
//# sourceMappingURL=baseDvos.js.map