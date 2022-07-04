import { Dao, DaoQueryDecorators, } from '@airport/check-in';
import { Q, duoDiSet, } from './qApplication';
// Application Q object Dependency Injection readiness detection Dao
export class SQDIDao extends Dao {
    constructor(dbEntityId) {
        super(dbEntityId, Q);
    }
}
export class BaseClassificationDao extends SQDIDao {
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
BaseClassificationDao.Find = new DaoQueryDecorators();
BaseClassificationDao.FindOne = new DaoQueryDecorators();
BaseClassificationDao.Search = new DaoQueryDecorators();
BaseClassificationDao.SearchOne = new DaoQueryDecorators();
export class BaseClientDao extends SQDIDao {
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
BaseClientDao.Find = new DaoQueryDecorators();
BaseClientDao.FindOne = new DaoQueryDecorators();
BaseClientDao.Search = new DaoQueryDecorators();
BaseClientDao.SearchOne = new DaoQueryDecorators();
export class BaseClientTypeDao extends SQDIDao {
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
BaseClientTypeDao.Find = new DaoQueryDecorators();
BaseClientTypeDao.FindOne = new DaoQueryDecorators();
BaseClientTypeDao.Search = new DaoQueryDecorators();
BaseClientTypeDao.SearchOne = new DaoQueryDecorators();
export class BaseContinentDao extends SQDIDao {
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
BaseContinentDao.Find = new DaoQueryDecorators();
BaseContinentDao.FindOne = new DaoQueryDecorators();
BaseContinentDao.Search = new DaoQueryDecorators();
BaseContinentDao.SearchOne = new DaoQueryDecorators();
export class BaseCountryDao extends SQDIDao {
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
BaseCountryDao.Find = new DaoQueryDecorators();
BaseCountryDao.FindOne = new DaoQueryDecorators();
BaseCountryDao.Search = new DaoQueryDecorators();
BaseCountryDao.SearchOne = new DaoQueryDecorators();
export class BaseDatabaseDao extends SQDIDao {
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
BaseDatabaseDao.Find = new DaoQueryDecorators();
BaseDatabaseDao.FindOne = new DaoQueryDecorators();
BaseDatabaseDao.Search = new DaoQueryDecorators();
BaseDatabaseDao.SearchOne = new DaoQueryDecorators();
export class BaseDatabaseTypeDao extends SQDIDao {
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
BaseDatabaseTypeDao.Find = new DaoQueryDecorators();
BaseDatabaseTypeDao.FindOne = new DaoQueryDecorators();
BaseDatabaseTypeDao.Search = new DaoQueryDecorators();
BaseDatabaseTypeDao.SearchOne = new DaoQueryDecorators();
export class BaseMetroAreaDao extends SQDIDao {
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
BaseMetroAreaDao.Find = new DaoQueryDecorators();
BaseMetroAreaDao.FindOne = new DaoQueryDecorators();
BaseMetroAreaDao.Search = new DaoQueryDecorators();
BaseMetroAreaDao.SearchOne = new DaoQueryDecorators();
export class BaseMetroAreaStateDao extends SQDIDao {
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
BaseMetroAreaStateDao.Find = new DaoQueryDecorators();
BaseMetroAreaStateDao.FindOne = new DaoQueryDecorators();
BaseMetroAreaStateDao.Search = new DaoQueryDecorators();
BaseMetroAreaStateDao.SearchOne = new DaoQueryDecorators();
export class BaseStateDao extends SQDIDao {
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
BaseStateDao.Find = new DaoQueryDecorators();
BaseStateDao.FindOne = new DaoQueryDecorators();
BaseStateDao.Search = new DaoQueryDecorators();
BaseStateDao.SearchOne = new DaoQueryDecorators();
export class BaseTerminalDao extends SQDIDao {
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
BaseTerminalDao.Find = new DaoQueryDecorators();
BaseTerminalDao.FindOne = new DaoQueryDecorators();
BaseTerminalDao.Search = new DaoQueryDecorators();
BaseTerminalDao.SearchOne = new DaoQueryDecorators();
export class BaseTerminalTypeDao extends SQDIDao {
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
BaseTerminalTypeDao.Find = new DaoQueryDecorators();
BaseTerminalTypeDao.FindOne = new DaoQueryDecorators();
BaseTerminalTypeDao.Search = new DaoQueryDecorators();
BaseTerminalTypeDao.SearchOne = new DaoQueryDecorators();
export class BaseTypeDao extends SQDIDao {
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
BaseTypeDao.Find = new DaoQueryDecorators();
BaseTypeDao.FindOne = new DaoQueryDecorators();
BaseTypeDao.Search = new DaoQueryDecorators();
BaseTypeDao.SearchOne = new DaoQueryDecorators();
export class BaseTypeClassificationDao extends SQDIDao {
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
BaseTypeClassificationDao.Find = new DaoQueryDecorators();
BaseTypeClassificationDao.FindOne = new DaoQueryDecorators();
BaseTypeClassificationDao.Search = new DaoQueryDecorators();
BaseTypeClassificationDao.SearchOne = new DaoQueryDecorators();
export class BaseUserDao extends SQDIDao {
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
BaseUserDao.Find = new DaoQueryDecorators();
BaseUserDao.FindOne = new DaoQueryDecorators();
BaseUserDao.Search = new DaoQueryDecorators();
BaseUserDao.SearchOne = new DaoQueryDecorators();
export class BaseUserTerminalDao extends SQDIDao {
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
BaseUserTerminalDao.Find = new DaoQueryDecorators();
BaseUserTerminalDao.FindOne = new DaoQueryDecorators();
BaseUserTerminalDao.Search = new DaoQueryDecorators();
BaseUserTerminalDao.SearchOne = new DaoQueryDecorators();
//# sourceMappingURL=baseDaos.js.map