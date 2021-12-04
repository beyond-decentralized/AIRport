import { Dao, DaoQueryDecorators, } from '@airport/check-in';
import { Q, duoDiSet, } from './qApplication';
// Application Q object Dependency Injection readiness detection Dao
export class SQDIDao extends Dao {
    constructor(dbEntityId) {
        super(dbEntityId, Q);
    }
}
export class BaseDailyArchiveDao extends SQDIDao {
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
BaseDailyArchiveDao.Find = new DaoQueryDecorators();
BaseDailyArchiveDao.FindOne = new DaoQueryDecorators();
BaseDailyArchiveDao.Search = new DaoQueryDecorators();
BaseDailyArchiveDao.SearchOne = new DaoQueryDecorators();
//# sourceMappingURL=baseDaos.js.map