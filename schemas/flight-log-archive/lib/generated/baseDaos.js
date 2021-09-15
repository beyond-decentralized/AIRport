import { Dao, DaoQueryDecorators, } from '@airport/check-in';
import { Q, duoDiSet, } from './qSchema';
// Schema Q object Dependency Injection readiness detection Dao
export class SQDIDao extends Dao {
    constructor(dbEntityId) {
        super(dbEntityId, Q);
    }
}
export class BaseDailySyncLogDao extends SQDIDao {
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
BaseDailySyncLogDao.Find = new DaoQueryDecorators();
BaseDailySyncLogDao.FindOne = new DaoQueryDecorators();
BaseDailySyncLogDao.Search = new DaoQueryDecorators();
BaseDailySyncLogDao.SearchOne = new DaoQueryDecorators();
export class BaseLogDao extends SQDIDao {
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
BaseLogDao.Find = new DaoQueryDecorators();
BaseLogDao.FindOne = new DaoQueryDecorators();
BaseLogDao.Search = new DaoQueryDecorators();
BaseLogDao.SearchOne = new DaoQueryDecorators();
export class BaseMonthlySyncLogDao extends SQDIDao {
    constructor() {
        super(2);
    }
    static Save(config) {
        return Dao.BaseSave(config);
    }
    static diSet() {
        return duoDiSet(2);
    }
}
BaseMonthlySyncLogDao.Find = new DaoQueryDecorators();
BaseMonthlySyncLogDao.FindOne = new DaoQueryDecorators();
BaseMonthlySyncLogDao.Search = new DaoQueryDecorators();
BaseMonthlySyncLogDao.SearchOne = new DaoQueryDecorators();
//# sourceMappingURL=baseDaos.js.map