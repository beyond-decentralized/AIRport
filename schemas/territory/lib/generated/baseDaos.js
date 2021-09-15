import { Dao, DaoQueryDecorators, } from '@airport/check-in';
import { Q, duoDiSet, } from './qSchema';
// Schema Q object Dependency Injection readiness detection Dao
export class SQDIDao extends Dao {
    constructor(dbEntityId) {
        super(dbEntityId, Q);
    }
}
export class BaseApplicationDao extends SQDIDao {
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
BaseApplicationDao.Find = new DaoQueryDecorators();
BaseApplicationDao.FindOne = new DaoQueryDecorators();
BaseApplicationDao.Search = new DaoQueryDecorators();
BaseApplicationDao.SearchOne = new DaoQueryDecorators();
export class BaseApplicationPackageDao extends SQDIDao {
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
BaseApplicationPackageDao.Find = new DaoQueryDecorators();
BaseApplicationPackageDao.FindOne = new DaoQueryDecorators();
BaseApplicationPackageDao.Search = new DaoQueryDecorators();
BaseApplicationPackageDao.SearchOne = new DaoQueryDecorators();
export class BaseDomainDao extends SQDIDao {
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
BaseDomainDao.Find = new DaoQueryDecorators();
BaseDomainDao.FindOne = new DaoQueryDecorators();
BaseDomainDao.Search = new DaoQueryDecorators();
BaseDomainDao.SearchOne = new DaoQueryDecorators();
export class BasePackageDao extends SQDIDao {
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
BasePackageDao.Find = new DaoQueryDecorators();
BasePackageDao.FindOne = new DaoQueryDecorators();
BasePackageDao.Search = new DaoQueryDecorators();
BasePackageDao.SearchOne = new DaoQueryDecorators();
export class BasePackagedUnitDao extends SQDIDao {
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
BasePackagedUnitDao.Find = new DaoQueryDecorators();
BasePackagedUnitDao.FindOne = new DaoQueryDecorators();
BasePackagedUnitDao.Search = new DaoQueryDecorators();
BasePackagedUnitDao.SearchOne = new DaoQueryDecorators();
//# sourceMappingURL=baseDaos.js.map