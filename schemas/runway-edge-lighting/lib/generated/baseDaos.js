import { Dao, DaoQueryDecorators, } from '@airport/check-in';
import { Q, duoDiSet, } from './qSchema';
// Schema Q object Dependency Injection readiness detection Dao
export class SQDIDao extends Dao {
    constructor(dbEntityId) {
        super(dbEntityId, Q);
    }
}
export class BaseLogEntryDao extends SQDIDao {
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
BaseLogEntryDao.Find = new DaoQueryDecorators();
BaseLogEntryDao.FindOne = new DaoQueryDecorators();
BaseLogEntryDao.Search = new DaoQueryDecorators();
BaseLogEntryDao.SearchOne = new DaoQueryDecorators();
export class BaseLogEntryTypeDao extends SQDIDao {
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
BaseLogEntryTypeDao.Find = new DaoQueryDecorators();
BaseLogEntryTypeDao.FindOne = new DaoQueryDecorators();
BaseLogEntryTypeDao.Search = new DaoQueryDecorators();
BaseLogEntryTypeDao.SearchOne = new DaoQueryDecorators();
export class BaseLogEntryValueDao extends SQDIDao {
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
BaseLogEntryValueDao.Find = new DaoQueryDecorators();
BaseLogEntryValueDao.FindOne = new DaoQueryDecorators();
BaseLogEntryValueDao.Search = new DaoQueryDecorators();
BaseLogEntryValueDao.SearchOne = new DaoQueryDecorators();
export class BaseLoggedErrorDao extends SQDIDao {
    constructor() {
        super(4);
    }
    static Save(config) {
        return Dao.BaseSave(config);
    }
    static diSet() {
        return duoDiSet(4);
    }
}
BaseLoggedErrorDao.Find = new DaoQueryDecorators();
BaseLoggedErrorDao.FindOne = new DaoQueryDecorators();
BaseLoggedErrorDao.Search = new DaoQueryDecorators();
BaseLoggedErrorDao.SearchOne = new DaoQueryDecorators();
export class BaseLoggedErrorStackTraceDao extends SQDIDao {
    constructor() {
        super(3);
    }
    static Save(config) {
        return Dao.BaseSave(config);
    }
    static diSet() {
        return duoDiSet(3);
    }
}
BaseLoggedErrorStackTraceDao.Find = new DaoQueryDecorators();
BaseLoggedErrorStackTraceDao.FindOne = new DaoQueryDecorators();
BaseLoggedErrorStackTraceDao.Search = new DaoQueryDecorators();
BaseLoggedErrorStackTraceDao.SearchOne = new DaoQueryDecorators();
//# sourceMappingURL=baseDaos.js.map