import { Dao, DaoQueryDecorators, } from '@airport/check-in';
import { Q, duoDiSet, } from './qApplication';
// Application Q object Dependency Injection readiness detection Dao
export class SQDIDao extends Dao {
    constructor(dbEntityId) {
        super(dbEntityId, Q);
    }
}
export class BaseAgtRepositoryTransactionBlockDao extends SQDIDao {
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
BaseAgtRepositoryTransactionBlockDao.Find = new DaoQueryDecorators();
BaseAgtRepositoryTransactionBlockDao.FindOne = new DaoQueryDecorators();
BaseAgtRepositoryTransactionBlockDao.Search = new DaoQueryDecorators();
BaseAgtRepositoryTransactionBlockDao.SearchOne = new DaoQueryDecorators();
export class BaseAgtSharingMessageDao extends SQDIDao {
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
BaseAgtSharingMessageDao.Find = new DaoQueryDecorators();
BaseAgtSharingMessageDao.FindOne = new DaoQueryDecorators();
BaseAgtSharingMessageDao.Search = new DaoQueryDecorators();
BaseAgtSharingMessageDao.SearchOne = new DaoQueryDecorators();
export class BaseArchiveDao extends SQDIDao {
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
BaseArchiveDao.Find = new DaoQueryDecorators();
BaseArchiveDao.FindOne = new DaoQueryDecorators();
BaseArchiveDao.Search = new DaoQueryDecorators();
BaseArchiveDao.SearchOne = new DaoQueryDecorators();
export class BaseDailyArchiveLogDao extends SQDIDao {
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
BaseDailyArchiveLogDao.Find = new DaoQueryDecorators();
BaseDailyArchiveLogDao.FindOne = new DaoQueryDecorators();
BaseDailyArchiveLogDao.Search = new DaoQueryDecorators();
BaseDailyArchiveLogDao.SearchOne = new DaoQueryDecorators();
export class BaseDailyTerminalSyncLogDao extends SQDIDao {
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
BaseDailyTerminalSyncLogDao.Find = new DaoQueryDecorators();
BaseDailyTerminalSyncLogDao.FindOne = new DaoQueryDecorators();
BaseDailyTerminalSyncLogDao.Search = new DaoQueryDecorators();
BaseDailyTerminalSyncLogDao.SearchOne = new DaoQueryDecorators();
export class BaseMonthlyArchiveLogDao extends SQDIDao {
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
BaseMonthlyArchiveLogDao.Find = new DaoQueryDecorators();
BaseMonthlyArchiveLogDao.FindOne = new DaoQueryDecorators();
BaseMonthlyArchiveLogDao.Search = new DaoQueryDecorators();
BaseMonthlyArchiveLogDao.SearchOne = new DaoQueryDecorators();
export class BaseMonthlyTerminalSyncLogDao extends SQDIDao {
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
BaseMonthlyTerminalSyncLogDao.Find = new DaoQueryDecorators();
BaseMonthlyTerminalSyncLogDao.FindOne = new DaoQueryDecorators();
BaseMonthlyTerminalSyncLogDao.Search = new DaoQueryDecorators();
BaseMonthlyTerminalSyncLogDao.SearchOne = new DaoQueryDecorators();
export class BaseRepositoryDao extends SQDIDao {
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
BaseRepositoryDao.Find = new DaoQueryDecorators();
BaseRepositoryDao.FindOne = new DaoQueryDecorators();
BaseRepositoryDao.Search = new DaoQueryDecorators();
BaseRepositoryDao.SearchOne = new DaoQueryDecorators();
export class BaseRepositoryArchiveDao extends SQDIDao {
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
BaseRepositoryArchiveDao.Find = new DaoQueryDecorators();
BaseRepositoryArchiveDao.FindOne = new DaoQueryDecorators();
BaseRepositoryArchiveDao.Search = new DaoQueryDecorators();
BaseRepositoryArchiveDao.SearchOne = new DaoQueryDecorators();
export class BaseSecurityAnswerDao extends SQDIDao {
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
BaseSecurityAnswerDao.Find = new DaoQueryDecorators();
BaseSecurityAnswerDao.FindOne = new DaoQueryDecorators();
BaseSecurityAnswerDao.Search = new DaoQueryDecorators();
BaseSecurityAnswerDao.SearchOne = new DaoQueryDecorators();
export class BaseSecurityQuestionDao extends SQDIDao {
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
BaseSecurityQuestionDao.Find = new DaoQueryDecorators();
BaseSecurityQuestionDao.FindOne = new DaoQueryDecorators();
BaseSecurityQuestionDao.Search = new DaoQueryDecorators();
BaseSecurityQuestionDao.SearchOne = new DaoQueryDecorators();
export class BaseServerDao extends SQDIDao {
    constructor() {
        super(17);
    }
    static Save(config) {
        return Dao.BaseSave(config);
    }
    static diSet() {
        return duoDiSet(17);
    }
}
BaseServerDao.Find = new DaoQueryDecorators();
BaseServerDao.FindOne = new DaoQueryDecorators();
BaseServerDao.Search = new DaoQueryDecorators();
BaseServerDao.SearchOne = new DaoQueryDecorators();
export class BaseServerSyncLogDao extends SQDIDao {
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
BaseServerSyncLogDao.Find = new DaoQueryDecorators();
BaseServerSyncLogDao.FindOne = new DaoQueryDecorators();
BaseServerSyncLogDao.Search = new DaoQueryDecorators();
BaseServerSyncLogDao.SearchOne = new DaoQueryDecorators();
export class BaseSyncLogDao extends SQDIDao {
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
BaseSyncLogDao.Find = new DaoQueryDecorators();
BaseSyncLogDao.FindOne = new DaoQueryDecorators();
BaseSyncLogDao.Search = new DaoQueryDecorators();
BaseSyncLogDao.SearchOne = new DaoQueryDecorators();
export class BaseTerminalDao extends SQDIDao {
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
BaseTerminalDao.Find = new DaoQueryDecorators();
BaseTerminalDao.FindOne = new DaoQueryDecorators();
BaseTerminalDao.Search = new DaoQueryDecorators();
BaseTerminalDao.SearchOne = new DaoQueryDecorators();
export class BaseTerminalRepositoryDao extends SQDIDao {
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
BaseTerminalRepositoryDao.Find = new DaoQueryDecorators();
BaseTerminalRepositoryDao.FindOne = new DaoQueryDecorators();
BaseTerminalRepositoryDao.Search = new DaoQueryDecorators();
BaseTerminalRepositoryDao.SearchOne = new DaoQueryDecorators();
export class BaseTuningParametersDao extends SQDIDao {
    constructor() {
        super(18);
    }
    static Save(config) {
        return Dao.BaseSave(config);
    }
    static diSet() {
        return duoDiSet(18);
    }
}
BaseTuningParametersDao.Find = new DaoQueryDecorators();
BaseTuningParametersDao.FindOne = new DaoQueryDecorators();
BaseTuningParametersDao.Search = new DaoQueryDecorators();
BaseTuningParametersDao.SearchOne = new DaoQueryDecorators();
export class BaseUserDao extends SQDIDao {
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
BaseUserDao.Find = new DaoQueryDecorators();
BaseUserDao.FindOne = new DaoQueryDecorators();
BaseUserDao.Search = new DaoQueryDecorators();
BaseUserDao.SearchOne = new DaoQueryDecorators();
export class BaseUserRepositoryDao extends SQDIDao {
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
BaseUserRepositoryDao.Find = new DaoQueryDecorators();
BaseUserRepositoryDao.FindOne = new DaoQueryDecorators();
BaseUserRepositoryDao.Search = new DaoQueryDecorators();
BaseUserRepositoryDao.SearchOne = new DaoQueryDecorators();
//# sourceMappingURL=baseDaos.js.map