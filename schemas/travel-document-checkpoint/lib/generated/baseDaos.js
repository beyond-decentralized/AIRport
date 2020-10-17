import { Dao } from '@airport/check-in';
import { Q, duoDiSet } from './qSchema';
// Schema Q object Dependency Injection readiness detection Dao
export class SQDIDao extends Dao {
    constructor(dbEntityId) {
        super(dbEntityId, Q);
    }
}
export class BaseAgtDao extends SQDIDao {
    static diSet() {
        return duoDiSet(5);
    }
    constructor() {
        super(5);
    }
}
export class BaseTerminalDao extends SQDIDao {
    static diSet() {
        return duoDiSet(3);
    }
    constructor() {
        super(3);
    }
}
export class BaseTerminalAgtDao extends SQDIDao {
    static diSet() {
        return duoDiSet(4);
    }
    constructor() {
        super(4);
    }
}
export class BaseUserDao extends SQDIDao {
    static diSet() {
        return duoDiSet(2);
    }
    constructor() {
        super(2);
    }
}
export class BaseUserTerminalDao extends SQDIDao {
    static diSet() {
        return duoDiSet(0);
    }
    constructor() {
        super(0);
    }
}
export class BaseUserTerminalAgtDao extends SQDIDao {
    static diSet() {
        return duoDiSet(1);
    }
    constructor() {
        super(1);
    }
}
//# sourceMappingURL=baseDaos.js.map