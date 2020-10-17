import { Dao } from '@airport/check-in';
import { Q, duoDiSet } from './qSchema';
// Schema Q object Dependency Injection readiness detection Dao
export class SQDIDao extends Dao {
    constructor(dbEntityId) {
        super(dbEntityId, Q);
    }
}
export class BaseApplicationDao extends SQDIDao {
    static diSet() {
        return duoDiSet(3);
    }
    constructor() {
        super(3);
    }
}
export class BaseApplicationPackageDao extends SQDIDao {
    static diSet() {
        return duoDiSet(1);
    }
    constructor() {
        super(1);
    }
}
export class BaseDomainDao extends SQDIDao {
    static diSet() {
        return duoDiSet(2);
    }
    constructor() {
        super(2);
    }
}
export class BasePackageDao extends SQDIDao {
    static diSet() {
        return duoDiSet(0);
    }
    constructor() {
        super(0);
    }
}
export class BasePackagedUnitDao extends SQDIDao {
    static diSet() {
        return duoDiSet(4);
    }
    constructor() {
        super(4);
    }
}
//# sourceMappingURL=baseDaos.js.map