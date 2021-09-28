import { Dao, DaoQueryDecorators, } from '@airport/check-in';
import { Q, duoDiSet, } from './qSchema';
// Schema Q object Dependency Injection readiness detection Dao
export class SQDIDao extends Dao {
    constructor(dbEntityId) {
        super(dbEntityId, Q);
    }
}
export class BaseLevel1Dao extends SQDIDao {
    constructor() {
        super(0);
    }
    static Save(config) {
        return Dao.BaseSave(config);
    }
    static diSet() {
        return duoDiSet(0);
    }
}
BaseLevel1Dao.Find = new DaoQueryDecorators();
BaseLevel1Dao.FindOne = new DaoQueryDecorators();
BaseLevel1Dao.Search = new DaoQueryDecorators();
BaseLevel1Dao.SearchOne = new DaoQueryDecorators();
export class BaseLevel2Dao extends SQDIDao {
    constructor() {
        super(1);
    }
    static Save(config) {
        return Dao.BaseSave(config);
    }
    static diSet() {
        return duoDiSet(1);
    }
}
BaseLevel2Dao.Find = new DaoQueryDecorators();
BaseLevel2Dao.FindOne = new DaoQueryDecorators();
BaseLevel2Dao.Search = new DaoQueryDecorators();
BaseLevel2Dao.SearchOne = new DaoQueryDecorators();
//# sourceMappingURL=baseDaos.js.map