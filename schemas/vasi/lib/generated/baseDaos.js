import { Dao, DaoQueryDecorators, } from '@airport/check-in';
import { Q, duoDiSet, } from './qApplication';
// Application Q object Dependency Injection readiness detection Dao
export class SQDIDao extends Dao {
    constructor(dbEntityId) {
        super(dbEntityId, Q);
    }
}
export class BaseAddressDao extends SQDIDao {
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
BaseAddressDao.Find = new DaoQueryDecorators();
BaseAddressDao.FindOne = new DaoQueryDecorators();
BaseAddressDao.Search = new DaoQueryDecorators();
BaseAddressDao.SearchOne = new DaoQueryDecorators();
export class BaseLanguageDao extends SQDIDao {
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
BaseLanguageDao.Find = new DaoQueryDecorators();
BaseLanguageDao.FindOne = new DaoQueryDecorators();
BaseLanguageDao.Search = new DaoQueryDecorators();
BaseLanguageDao.SearchOne = new DaoQueryDecorators();
export class BaseTranslationTypeDao extends SQDIDao {
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
BaseTranslationTypeDao.Find = new DaoQueryDecorators();
BaseTranslationTypeDao.FindOne = new DaoQueryDecorators();
BaseTranslationTypeDao.Search = new DaoQueryDecorators();
BaseTranslationTypeDao.SearchOne = new DaoQueryDecorators();
//# sourceMappingURL=baseDaos.js.map