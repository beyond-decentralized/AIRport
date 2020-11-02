import { Dao } from '@airport/check-in';
import { Q, duoDiSet } from './qSchema';
// Schema Q object Dependency Injection readiness detection Dao
export class SQDIDao extends Dao {
    constructor(dbEntityId) {
        super(dbEntityId, Q);
    }
}
export class BaseLogEntryDao extends SQDIDao {
    static diSet() {
        return duoDiSet(2);
    }
    constructor() {
        super(2);
    }
}
export class BaseLogEntryTypeDao extends SQDIDao {
    static diSet() {
        return duoDiSet(0);
    }
    constructor() {
        super(0);
    }
}
export class BaseLogEntryValueDao extends SQDIDao {
    static diSet() {
        return duoDiSet(1);
    }
    constructor() {
        super(1);
    }
}
export class BaseLoggedErrorDao extends SQDIDao {
    static diSet() {
        return duoDiSet(4);
    }
    constructor() {
        super(4);
    }
}
export class BaseLoggedErrorStackTraceDao extends SQDIDao {
    static diSet() {
        return duoDiSet(3);
    }
    constructor() {
        super(3);
    }
}
//# sourceMappingURL=baseDaos.js.map