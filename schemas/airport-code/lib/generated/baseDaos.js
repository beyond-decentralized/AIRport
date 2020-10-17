import { Dao } from '@airport/check-in';
import { Q, duoDiSet } from './qSchema';
// Schema Q object Dependency Injection readiness detection Dao
export class SQDIDao extends Dao {
    constructor(dbEntityId) {
        super(dbEntityId, Q);
    }
}
export class BaseSequenceDao extends SQDIDao {
    static diSet() {
        return duoDiSet(0);
    }
    constructor() {
        super(0);
    }
}
export class BaseSystemWideOperationIdDao extends SQDIDao {
    static diSet() {
        return duoDiSet(2);
    }
    constructor() {
        super(2);
    }
}
export class BaseTerminalRunDao extends SQDIDao {
    static diSet() {
        return duoDiSet(1);
    }
    constructor() {
        super(1);
    }
}
//# sourceMappingURL=baseDaos.js.map