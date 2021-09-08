import { Dao, DaoQueryDecorators, } from '@airport/check-in';
import { Q, duoDiSet, } from './qSchema';
// Schema Q object Dependency Injection readiness detection Dao
export class SQDIDao extends Dao {
    constructor(dbEntityId) {
        super(dbEntityId, Q);
    }
}
export class BaseChildDao extends SQDIDao {
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
BaseChildDao.Find = new DaoQueryDecorators();
BaseChildDao.FindOne = new DaoQueryDecorators();
BaseChildDao.Search = new DaoQueryDecorators();
BaseChildDao.SearchOne = new DaoQueryDecorators();
export class BaseParentDao extends SQDIDao {
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
BaseParentDao.Find = new DaoQueryDecorators();
BaseParentDao.FindOne = new DaoQueryDecorators();
BaseParentDao.Search = new DaoQueryDecorators();
BaseParentDao.SearchOne = new DaoQueryDecorators();
//# sourceMappingURL=baseDaos.js.map