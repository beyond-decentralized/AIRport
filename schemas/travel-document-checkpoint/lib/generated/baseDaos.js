import { Dao, DaoQueryDecorators, } from '@airport/check-in';
import { Q, duoDiSet, } from './qApplication';
// Application Q object Dependency Injection readiness detection Dao
export class SQDIDao extends Dao {
    constructor(dbEntityId) {
        super(dbEntityId, Q);
    }
}
export class BaseAgtDao extends SQDIDao {
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
BaseAgtDao.Find = new DaoQueryDecorators();
BaseAgtDao.FindOne = new DaoQueryDecorators();
BaseAgtDao.Search = new DaoQueryDecorators();
BaseAgtDao.SearchOne = new DaoQueryDecorators();
export class BaseContinentDao extends SQDIDao {
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
BaseContinentDao.Find = new DaoQueryDecorators();
BaseContinentDao.FindOne = new DaoQueryDecorators();
BaseContinentDao.Search = new DaoQueryDecorators();
BaseContinentDao.SearchOne = new DaoQueryDecorators();
export class BaseCountryDao extends SQDIDao {
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
BaseCountryDao.Find = new DaoQueryDecorators();
BaseCountryDao.FindOne = new DaoQueryDecorators();
BaseCountryDao.Search = new DaoQueryDecorators();
BaseCountryDao.SearchOne = new DaoQueryDecorators();
export class BaseTerminalDao extends SQDIDao {
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
BaseTerminalDao.Find = new DaoQueryDecorators();
BaseTerminalDao.FindOne = new DaoQueryDecorators();
BaseTerminalDao.Search = new DaoQueryDecorators();
BaseTerminalDao.SearchOne = new DaoQueryDecorators();
export class BaseTerminalAgtDao extends SQDIDao {
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
BaseTerminalAgtDao.Find = new DaoQueryDecorators();
BaseTerminalAgtDao.FindOne = new DaoQueryDecorators();
BaseTerminalAgtDao.Search = new DaoQueryDecorators();
BaseTerminalAgtDao.SearchOne = new DaoQueryDecorators();
export class BaseUserDao extends SQDIDao {
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
BaseUserDao.Find = new DaoQueryDecorators();
BaseUserDao.FindOne = new DaoQueryDecorators();
BaseUserDao.Search = new DaoQueryDecorators();
BaseUserDao.SearchOne = new DaoQueryDecorators();
export class BaseUserTerminalDao extends SQDIDao {
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
BaseUserTerminalDao.Find = new DaoQueryDecorators();
BaseUserTerminalDao.FindOne = new DaoQueryDecorators();
BaseUserTerminalDao.Search = new DaoQueryDecorators();
BaseUserTerminalDao.SearchOne = new DaoQueryDecorators();
export class BaseUserTerminalAgtDao extends SQDIDao {
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
BaseUserTerminalAgtDao.Find = new DaoQueryDecorators();
BaseUserTerminalAgtDao.FindOne = new DaoQueryDecorators();
BaseUserTerminalAgtDao.Search = new DaoQueryDecorators();
BaseUserTerminalAgtDao.SearchOne = new DaoQueryDecorators();
//# sourceMappingURL=baseDaos.js.map