import { Dao, DaoQueryDecorators, } from '@airport/check-in';
import { Q, duoDiSet, } from './qApplication';
// Application Q object Dependency Injection readiness detection Dao
export class SQDIDao extends Dao {
    constructor(dbEntityId) {
        super(dbEntityId, Q);
    }
}
export class BaseClientDao extends SQDIDao {
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
BaseClientDao.Find = new DaoQueryDecorators();
BaseClientDao.FindOne = new DaoQueryDecorators();
BaseClientDao.Search = new DaoQueryDecorators();
BaseClientDao.SearchOne = new DaoQueryDecorators();
export class BaseContinentDao extends SQDIDao {
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
BaseContinentDao.Find = new DaoQueryDecorators();
BaseContinentDao.FindOne = new DaoQueryDecorators();
BaseContinentDao.Search = new DaoQueryDecorators();
BaseContinentDao.SearchOne = new DaoQueryDecorators();
export class BaseCountryDao extends SQDIDao {
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
BaseCountryDao.Find = new DaoQueryDecorators();
BaseCountryDao.FindOne = new DaoQueryDecorators();
BaseCountryDao.Search = new DaoQueryDecorators();
BaseCountryDao.SearchOne = new DaoQueryDecorators();
export class BaseTerminalDao extends SQDIDao {
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
BaseTerminalDao.Find = new DaoQueryDecorators();
BaseTerminalDao.FindOne = new DaoQueryDecorators();
BaseTerminalDao.Search = new DaoQueryDecorators();
BaseTerminalDao.SearchOne = new DaoQueryDecorators();
export class BaseUserDao extends SQDIDao {
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
BaseUserDao.Find = new DaoQueryDecorators();
BaseUserDao.FindOne = new DaoQueryDecorators();
BaseUserDao.Search = new DaoQueryDecorators();
BaseUserDao.SearchOne = new DaoQueryDecorators();
export class BaseUserTerminalDao extends SQDIDao {
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
BaseUserTerminalDao.Find = new DaoQueryDecorators();
BaseUserTerminalDao.FindOne = new DaoQueryDecorators();
BaseUserTerminalDao.Search = new DaoQueryDecorators();
BaseUserTerminalDao.SearchOne = new DaoQueryDecorators();
//# sourceMappingURL=baseDaos.js.map