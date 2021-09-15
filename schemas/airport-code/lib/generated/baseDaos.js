import { Dao, DaoQueryDecorators, } from '@airport/check-in';
import { Q, duoDiSet, } from './qSchema';
// Schema Q object Dependency Injection readiness detection Dao
export class SQDIDao extends Dao {
    constructor(dbEntityId) {
        super(dbEntityId, Q);
    }
}
export class BaseSequenceDao extends SQDIDao {
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
BaseSequenceDao.Find = new DaoQueryDecorators();
BaseSequenceDao.FindOne = new DaoQueryDecorators();
BaseSequenceDao.Search = new DaoQueryDecorators();
BaseSequenceDao.SearchOne = new DaoQueryDecorators();
export class BaseSystemWideOperationIdDao extends SQDIDao {
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
BaseSystemWideOperationIdDao.Find = new DaoQueryDecorators();
BaseSystemWideOperationIdDao.FindOne = new DaoQueryDecorators();
BaseSystemWideOperationIdDao.Search = new DaoQueryDecorators();
BaseSystemWideOperationIdDao.SearchOne = new DaoQueryDecorators();
export class BaseTerminalRunDao extends SQDIDao {
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
BaseTerminalRunDao.Find = new DaoQueryDecorators();
BaseTerminalRunDao.FindOne = new DaoQueryDecorators();
BaseTerminalRunDao.Search = new DaoQueryDecorators();
BaseTerminalRunDao.SearchOne = new DaoQueryDecorators();
//# sourceMappingURL=baseDaos.js.map