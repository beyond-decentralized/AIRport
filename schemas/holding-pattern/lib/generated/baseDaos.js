import { Dao, DaoQueryDecorators, } from '@airport/check-in';
import { Q, duoDiSet, } from './qSchema';
// Schema Q object Dependency Injection readiness detection Dao
export class SQDIDao extends Dao {
    constructor(dbEntityId) {
        super(dbEntityId, Q);
    }
}
export class BaseActorDao extends SQDIDao {
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
BaseActorDao.Find = new DaoQueryDecorators();
BaseActorDao.FindOne = new DaoQueryDecorators();
BaseActorDao.Search = new DaoQueryDecorators();
BaseActorDao.SearchOne = new DaoQueryDecorators();
export class BaseActorApplicationDao extends SQDIDao {
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
BaseActorApplicationDao.Find = new DaoQueryDecorators();
BaseActorApplicationDao.FindOne = new DaoQueryDecorators();
BaseActorApplicationDao.Search = new DaoQueryDecorators();
BaseActorApplicationDao.SearchOne = new DaoQueryDecorators();
export class BaseApplicationDao extends SQDIDao {
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
BaseApplicationDao.Find = new DaoQueryDecorators();
BaseApplicationDao.FindOne = new DaoQueryDecorators();
BaseApplicationDao.Search = new DaoQueryDecorators();
BaseApplicationDao.SearchOne = new DaoQueryDecorators();
export class BaseOperationHistoryDao extends SQDIDao {
    constructor() {
        super(12);
    }
    static Save(config) {
        return Dao.BaseSave(config);
    }
    static diSet() {
        return duoDiSet(12);
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
        super(8);
    }
    static Save(config) {
        return Dao.BaseSave(config);
    }
    static diSet() {
        return duoDiSet(8);
    }
}
BaseRecordHistoryNewValueDao.Find = new DaoQueryDecorators();
BaseRecordHistoryNewValueDao.FindOne = new DaoQueryDecorators();
BaseRecordHistoryNewValueDao.Search = new DaoQueryDecorators();
BaseRecordHistoryNewValueDao.SearchOne = new DaoQueryDecorators();
export class BaseRecordHistoryOldValueDao extends SQDIDao {
    constructor() {
        super(9);
    }
    static Save(config) {
        return Dao.BaseSave(config);
    }
    static diSet() {
        return duoDiSet(9);
    }
}
BaseRecordHistoryOldValueDao.Find = new DaoQueryDecorators();
BaseRecordHistoryOldValueDao.FindOne = new DaoQueryDecorators();
BaseRecordHistoryOldValueDao.Search = new DaoQueryDecorators();
BaseRecordHistoryOldValueDao.SearchOne = new DaoQueryDecorators();
export class BaseRepoTransHistoryChangedRepositoryActorDao extends SQDIDao {
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
BaseRepoTransHistoryChangedRepositoryActorDao.Find = new DaoQueryDecorators();
BaseRepoTransHistoryChangedRepositoryActorDao.FindOne = new DaoQueryDecorators();
BaseRepoTransHistoryChangedRepositoryActorDao.Search = new DaoQueryDecorators();
BaseRepoTransHistoryChangedRepositoryActorDao.SearchOne = new DaoQueryDecorators();
export class BaseRepositoryDao extends SQDIDao {
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
BaseRepositoryDao.Find = new DaoQueryDecorators();
BaseRepositoryDao.FindOne = new DaoQueryDecorators();
BaseRepositoryDao.Search = new DaoQueryDecorators();
BaseRepositoryDao.SearchOne = new DaoQueryDecorators();
export class BaseRepositoryActorDao extends SQDIDao {
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
BaseRepositoryActorDao.Find = new DaoQueryDecorators();
BaseRepositoryActorDao.FindOne = new DaoQueryDecorators();
BaseRepositoryActorDao.Search = new DaoQueryDecorators();
BaseRepositoryActorDao.SearchOne = new DaoQueryDecorators();
export class BaseRepositoryApplicationDao extends SQDIDao {
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
BaseRepositoryApplicationDao.Find = new DaoQueryDecorators();
BaseRepositoryApplicationDao.FindOne = new DaoQueryDecorators();
BaseRepositoryApplicationDao.Search = new DaoQueryDecorators();
BaseRepositoryApplicationDao.SearchOne = new DaoQueryDecorators();
export class BaseRepositorySchemaDao extends SQDIDao {
    constructor() {
        super(13);
    }
    static Save(config) {
        return Dao.BaseSave(config);
    }
    static diSet() {
        return duoDiSet(13);
    }
}
BaseRepositorySchemaDao.Find = new DaoQueryDecorators();
BaseRepositorySchemaDao.FindOne = new DaoQueryDecorators();
BaseRepositorySchemaDao.Search = new DaoQueryDecorators();
BaseRepositorySchemaDao.SearchOne = new DaoQueryDecorators();
export class BaseRepositoryTransactionHistoryDao extends SQDIDao {
    constructor() {
        super(11);
    }
    static Save(config) {
        return Dao.BaseSave(config);
    }
    static diSet() {
        return duoDiSet(11);
    }
}
BaseRepositoryTransactionHistoryDao.Find = new DaoQueryDecorators();
BaseRepositoryTransactionHistoryDao.FindOne = new DaoQueryDecorators();
BaseRepositoryTransactionHistoryDao.Search = new DaoQueryDecorators();
BaseRepositoryTransactionHistoryDao.SearchOne = new DaoQueryDecorators();
export class BaseTransactionHistoryDao extends SQDIDao {
    constructor() {
        super(10);
    }
    static Save(config) {
        return Dao.BaseSave(config);
    }
    static diSet() {
        return duoDiSet(10);
    }
}
BaseTransactionHistoryDao.Find = new DaoQueryDecorators();
BaseTransactionHistoryDao.FindOne = new DaoQueryDecorators();
BaseTransactionHistoryDao.Search = new DaoQueryDecorators();
BaseTransactionHistoryDao.SearchOne = new DaoQueryDecorators();
//# sourceMappingURL=baseDaos.js.map