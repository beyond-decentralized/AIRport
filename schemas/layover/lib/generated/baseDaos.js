import { Dao, DaoQueryDecorators, } from '@airport/tarmaq-dao';
import { Q, duoDiSet, } from './qApplication';
// Application Q object Dependency Injection readiness detection Dao
export class SQDIDao extends Dao {
    constructor(dbEntityId) {
        super(dbEntityId, Q);
    }
}
export class BaseRecordUpdateStageDao extends SQDIDao {
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
BaseRecordUpdateStageDao.Find = new DaoQueryDecorators();
BaseRecordUpdateStageDao.FindOne = new DaoQueryDecorators();
BaseRecordUpdateStageDao.Search = new DaoQueryDecorators();
BaseRecordUpdateStageDao.SearchOne = new DaoQueryDecorators();
export class BaseSynchronizationConflictDao extends SQDIDao {
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
BaseSynchronizationConflictDao.Find = new DaoQueryDecorators();
BaseSynchronizationConflictDao.FindOne = new DaoQueryDecorators();
BaseSynchronizationConflictDao.Search = new DaoQueryDecorators();
BaseSynchronizationConflictDao.SearchOne = new DaoQueryDecorators();
export class BaseSynchronizationConflictValuesDao extends SQDIDao {
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
BaseSynchronizationConflictValuesDao.Find = new DaoQueryDecorators();
BaseSynchronizationConflictValuesDao.FindOne = new DaoQueryDecorators();
BaseSynchronizationConflictValuesDao.Search = new DaoQueryDecorators();
BaseSynchronizationConflictValuesDao.SearchOne = new DaoQueryDecorators();
//# sourceMappingURL=baseDaos.js.map