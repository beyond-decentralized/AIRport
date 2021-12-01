import { Dao, DaoQueryDecorators, } from '@airport/check-in';
import { Q, duoDiSet, } from './qApplication';
// Application Q object Dependency Injection readiness detection Dao
export class SQDIDao extends Dao {
    constructor(dbEntityId) {
        super(dbEntityId, Q);
    }
}
export class BaseActorDao extends SQDIDao {
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
BaseActorDao.Find = new DaoQueryDecorators();
BaseActorDao.FindOne = new DaoQueryDecorators();
BaseActorDao.Search = new DaoQueryDecorators();
BaseActorDao.SearchOne = new DaoQueryDecorators();
export class BaseOperationHistoryDao extends SQDIDao {
    constructor() {
        super(7);
    }
    static Save(config) {
        return Dao.BaseSave(config);
    }
    static diSet() {
        return duoDiSet(7);
    }
}
BaseOperationHistoryDao.Find = new DaoQueryDecorators();
BaseOperationHistoryDao.FindOne = new DaoQueryDecorators();
BaseOperationHistoryDao.Search = new DaoQueryDecorators();
BaseOperationHistoryDao.SearchOne = new DaoQueryDecorators();
export class BaseRecordHistoryDao extends SQDIDao {
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
BaseRecordHistoryDao.Find = new DaoQueryDecorators();
BaseRecordHistoryDao.FindOne = new DaoQueryDecorators();
BaseRecordHistoryDao.Search = new DaoQueryDecorators();
BaseRecordHistoryDao.SearchOne = new DaoQueryDecorators();
export class BaseRecordHistoryNewValueDao extends SQDIDao {
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
BaseRecordHistoryNewValueDao.Find = new DaoQueryDecorators();
BaseRecordHistoryNewValueDao.FindOne = new DaoQueryDecorators();
BaseRecordHistoryNewValueDao.Search = new DaoQueryDecorators();
BaseRecordHistoryNewValueDao.SearchOne = new DaoQueryDecorators();
export class BaseRecordHistoryOldValueDao extends SQDIDao {
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
BaseRecordHistoryOldValueDao.Find = new DaoQueryDecorators();
BaseRecordHistoryOldValueDao.FindOne = new DaoQueryDecorators();
BaseRecordHistoryOldValueDao.Search = new DaoQueryDecorators();
BaseRecordHistoryOldValueDao.SearchOne = new DaoQueryDecorators();
export class BaseRepositoryDao extends SQDIDao {
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
BaseRepositoryDao.Find = new DaoQueryDecorators();
BaseRepositoryDao.FindOne = new DaoQueryDecorators();
BaseRepositoryDao.Search = new DaoQueryDecorators();
BaseRepositoryDao.SearchOne = new DaoQueryDecorators();
export class BaseRepositoryApplicationDao extends SQDIDao {
    constructor() {
        super(8);
    }
    static Save(config) {
        return Dao.BaseSave(config);
    }
    static diSet() {
        return duoDiSet(8);
    }
}
BaseRepositoryApplicationDao.Find = new DaoQueryDecorators();
BaseRepositoryApplicationDao.FindOne = new DaoQueryDecorators();
BaseRepositoryApplicationDao.Search = new DaoQueryDecorators();
BaseRepositoryApplicationDao.SearchOne = new DaoQueryDecorators();
export class BaseRepositoryTransactionHistoryDao extends SQDIDao {
    constructor() {
        super(6);
    }
    static Save(config) {
        return Dao.BaseSave(config);
    }
    static diSet() {
        return duoDiSet(6);
    }
}
BaseRepositoryTransactionHistoryDao.Find = new DaoQueryDecorators();
BaseRepositoryTransactionHistoryDao.FindOne = new DaoQueryDecorators();
BaseRepositoryTransactionHistoryDao.Search = new DaoQueryDecorators();
BaseRepositoryTransactionHistoryDao.SearchOne = new DaoQueryDecorators();
export class BaseTransactionHistoryDao extends SQDIDao {
    constructor() {
        super(5);
    }
    static Save(config) {
        return Dao.BaseSave(config);
    }
    static diSet() {
        return duoDiSet(5);
    }
}
BaseTransactionHistoryDao.Find = new DaoQueryDecorators();
BaseTransactionHistoryDao.FindOne = new DaoQueryDecorators();
BaseTransactionHistoryDao.Search = new DaoQueryDecorators();
BaseTransactionHistoryDao.SearchOne = new DaoQueryDecorators();
//# sourceMappingURL=baseDaos.js.map