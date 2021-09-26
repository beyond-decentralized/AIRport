import { Dao, DaoQueryDecorators, } from '@airport/check-in';
import { Q, duoDiSet, } from './qSchema';
// Schema Q object Dependency Injection readiness detection Dao
export class SQDIDao extends Dao {
    constructor(dbEntityId) {
        super(dbEntityId, Q);
    }
}
export class BaseMissingRecordDao extends SQDIDao {
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
BaseMissingRecordDao.Find = new DaoQueryDecorators();
BaseMissingRecordDao.FindOne = new DaoQueryDecorators();
BaseMissingRecordDao.Search = new DaoQueryDecorators();
BaseMissingRecordDao.SearchOne = new DaoQueryDecorators();
export class BaseMissingRecordRepoTransBlockDao extends SQDIDao {
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
BaseMissingRecordRepoTransBlockDao.Find = new DaoQueryDecorators();
BaseMissingRecordRepoTransBlockDao.FindOne = new DaoQueryDecorators();
BaseMissingRecordRepoTransBlockDao.Search = new DaoQueryDecorators();
BaseMissingRecordRepoTransBlockDao.SearchOne = new DaoQueryDecorators();
export class BaseRecordUpdateStageDao extends SQDIDao {
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
BaseRecordUpdateStageDao.Find = new DaoQueryDecorators();
BaseRecordUpdateStageDao.FindOne = new DaoQueryDecorators();
BaseRecordUpdateStageDao.Search = new DaoQueryDecorators();
BaseRecordUpdateStageDao.SearchOne = new DaoQueryDecorators();
export class BaseRepoTransBlockResponseStageDao extends SQDIDao {
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
BaseRepoTransBlockResponseStageDao.Find = new DaoQueryDecorators();
BaseRepoTransBlockResponseStageDao.FindOne = new DaoQueryDecorators();
BaseRepoTransBlockResponseStageDao.Search = new DaoQueryDecorators();
BaseRepoTransBlockResponseStageDao.SearchOne = new DaoQueryDecorators();
export class BaseRepoTransBlockSchemaToChangeDao extends SQDIDao {
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
BaseRepoTransBlockSchemaToChangeDao.Find = new DaoQueryDecorators();
BaseRepoTransBlockSchemaToChangeDao.FindOne = new DaoQueryDecorators();
BaseRepoTransBlockSchemaToChangeDao.Search = new DaoQueryDecorators();
BaseRepoTransBlockSchemaToChangeDao.SearchOne = new DaoQueryDecorators();
export class BaseRepositoryTransactionBlockDao extends SQDIDao {
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
BaseRepositoryTransactionBlockDao.Find = new DaoQueryDecorators();
BaseRepositoryTransactionBlockDao.FindOne = new DaoQueryDecorators();
BaseRepositoryTransactionBlockDao.Search = new DaoQueryDecorators();
BaseRepositoryTransactionBlockDao.SearchOne = new DaoQueryDecorators();
export class BaseRepositoryTransactionHistoryUpdateStageDao extends SQDIDao {
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
BaseRepositoryTransactionHistoryUpdateStageDao.Find = new DaoQueryDecorators();
BaseRepositoryTransactionHistoryUpdateStageDao.FindOne = new DaoQueryDecorators();
BaseRepositoryTransactionHistoryUpdateStageDao.Search = new DaoQueryDecorators();
BaseRepositoryTransactionHistoryUpdateStageDao.SearchOne = new DaoQueryDecorators();
export class BaseSharingMessageDao extends SQDIDao {
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
BaseSharingMessageDao.Find = new DaoQueryDecorators();
BaseSharingMessageDao.FindOne = new DaoQueryDecorators();
BaseSharingMessageDao.Search = new DaoQueryDecorators();
BaseSharingMessageDao.SearchOne = new DaoQueryDecorators();
export class BaseSharingMessageRepoTransBlockDao extends SQDIDao {
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
BaseSharingMessageRepoTransBlockDao.Find = new DaoQueryDecorators();
BaseSharingMessageRepoTransBlockDao.FindOne = new DaoQueryDecorators();
BaseSharingMessageRepoTransBlockDao.Search = new DaoQueryDecorators();
BaseSharingMessageRepoTransBlockDao.SearchOne = new DaoQueryDecorators();
export class BaseSharingNodeDao extends SQDIDao {
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
BaseSharingNodeDao.Find = new DaoQueryDecorators();
BaseSharingNodeDao.FindOne = new DaoQueryDecorators();
BaseSharingNodeDao.Search = new DaoQueryDecorators();
BaseSharingNodeDao.SearchOne = new DaoQueryDecorators();
export class BaseSharingNodeRepoTransBlockDao extends SQDIDao {
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
BaseSharingNodeRepoTransBlockDao.Find = new DaoQueryDecorators();
BaseSharingNodeRepoTransBlockDao.FindOne = new DaoQueryDecorators();
BaseSharingNodeRepoTransBlockDao.Search = new DaoQueryDecorators();
BaseSharingNodeRepoTransBlockDao.SearchOne = new DaoQueryDecorators();
export class BaseSharingNodeRepoTransBlockStageDao extends SQDIDao {
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
BaseSharingNodeRepoTransBlockStageDao.Find = new DaoQueryDecorators();
BaseSharingNodeRepoTransBlockStageDao.FindOne = new DaoQueryDecorators();
BaseSharingNodeRepoTransBlockStageDao.Search = new DaoQueryDecorators();
BaseSharingNodeRepoTransBlockStageDao.SearchOne = new DaoQueryDecorators();
export class BaseSharingNodeRepositoryDao extends SQDIDao {
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
BaseSharingNodeRepositoryDao.Find = new DaoQueryDecorators();
BaseSharingNodeRepositoryDao.FindOne = new DaoQueryDecorators();
BaseSharingNodeRepositoryDao.Search = new DaoQueryDecorators();
BaseSharingNodeRepositoryDao.SearchOne = new DaoQueryDecorators();
export class BaseSharingNodeTerminalDao extends SQDIDao {
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
BaseSharingNodeTerminalDao.Find = new DaoQueryDecorators();
BaseSharingNodeTerminalDao.FindOne = new DaoQueryDecorators();
BaseSharingNodeTerminalDao.Search = new DaoQueryDecorators();
BaseSharingNodeTerminalDao.SearchOne = new DaoQueryDecorators();
export class BaseSynchronizationConflictDao extends SQDIDao {
    constructor() {
        super(15);
    }
    static Save(config) {
        return Dao.BaseSave(config);
    }
    static diSet() {
        return duoDiSet(15);
    }
}
BaseSynchronizationConflictDao.Find = new DaoQueryDecorators();
BaseSynchronizationConflictDao.FindOne = new DaoQueryDecorators();
BaseSynchronizationConflictDao.Search = new DaoQueryDecorators();
BaseSynchronizationConflictDao.SearchOne = new DaoQueryDecorators();
export class BaseSynchronizationConflictPendingNotificationDao extends SQDIDao {
    constructor() {
        super(16);
    }
    static Save(config) {
        return Dao.BaseSave(config);
    }
    static diSet() {
        return duoDiSet(16);
    }
}
BaseSynchronizationConflictPendingNotificationDao.Find = new DaoQueryDecorators();
BaseSynchronizationConflictPendingNotificationDao.FindOne = new DaoQueryDecorators();
BaseSynchronizationConflictPendingNotificationDao.Search = new DaoQueryDecorators();
BaseSynchronizationConflictPendingNotificationDao.SearchOne = new DaoQueryDecorators();
export class BaseSynchronizationConflictValuesDao extends SQDIDao {
    constructor() {
        super(14);
    }
    static Save(config) {
        return Dao.BaseSave(config);
    }
    static diSet() {
        return duoDiSet(14);
    }
}
BaseSynchronizationConflictValuesDao.Find = new DaoQueryDecorators();
BaseSynchronizationConflictValuesDao.FindOne = new DaoQueryDecorators();
BaseSynchronizationConflictValuesDao.Search = new DaoQueryDecorators();
BaseSynchronizationConflictValuesDao.SearchOne = new DaoQueryDecorators();
//# sourceMappingURL=baseDaos.js.map