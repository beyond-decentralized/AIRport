import { DaoQueryDecorators, } from '@airport/tarmaq-dao';
import { Dao, } from '@airport/air-traffic-control';
import { Q, duoDiSet, } from './qApplication';
// Application Q object Dependency Injection readiness detection Dao
export class SQDIDao extends Dao {
    constructor(dbEntityId) {
        super(dbEntityId, Q);
    }
}
export class BaseApplicationDao extends SQDIDao {
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
BaseApplicationDao.Find = new DaoQueryDecorators();
BaseApplicationDao.FindOne = new DaoQueryDecorators();
BaseApplicationDao.Search = new DaoQueryDecorators();
BaseApplicationDao.SearchOne = new DaoQueryDecorators();
export class BaseApplicationColumnDao extends SQDIDao {
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
BaseApplicationColumnDao.Find = new DaoQueryDecorators();
BaseApplicationColumnDao.FindOne = new DaoQueryDecorators();
BaseApplicationColumnDao.Search = new DaoQueryDecorators();
BaseApplicationColumnDao.SearchOne = new DaoQueryDecorators();
export class BaseApplicationCurrentVersionDao extends SQDIDao {
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
BaseApplicationCurrentVersionDao.Find = new DaoQueryDecorators();
BaseApplicationCurrentVersionDao.FindOne = new DaoQueryDecorators();
BaseApplicationCurrentVersionDao.Search = new DaoQueryDecorators();
BaseApplicationCurrentVersionDao.SearchOne = new DaoQueryDecorators();
export class BaseApplicationEntityDao extends SQDIDao {
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
BaseApplicationEntityDao.Find = new DaoQueryDecorators();
BaseApplicationEntityDao.FindOne = new DaoQueryDecorators();
BaseApplicationEntityDao.Search = new DaoQueryDecorators();
BaseApplicationEntityDao.SearchOne = new DaoQueryDecorators();
export class BaseApplicationOperationDao extends SQDIDao {
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
BaseApplicationOperationDao.Find = new DaoQueryDecorators();
BaseApplicationOperationDao.FindOne = new DaoQueryDecorators();
BaseApplicationOperationDao.Search = new DaoQueryDecorators();
BaseApplicationOperationDao.SearchOne = new DaoQueryDecorators();
export class BaseApplicationPropertyDao extends SQDIDao {
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
BaseApplicationPropertyDao.Find = new DaoQueryDecorators();
BaseApplicationPropertyDao.FindOne = new DaoQueryDecorators();
BaseApplicationPropertyDao.Search = new DaoQueryDecorators();
BaseApplicationPropertyDao.SearchOne = new DaoQueryDecorators();
export class BaseApplicationPropertyColumnDao extends SQDIDao {
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
BaseApplicationPropertyColumnDao.Find = new DaoQueryDecorators();
BaseApplicationPropertyColumnDao.FindOne = new DaoQueryDecorators();
BaseApplicationPropertyColumnDao.Search = new DaoQueryDecorators();
BaseApplicationPropertyColumnDao.SearchOne = new DaoQueryDecorators();
export class BaseApplicationReferenceDao extends SQDIDao {
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
BaseApplicationReferenceDao.Find = new DaoQueryDecorators();
BaseApplicationReferenceDao.FindOne = new DaoQueryDecorators();
BaseApplicationReferenceDao.Search = new DaoQueryDecorators();
BaseApplicationReferenceDao.SearchOne = new DaoQueryDecorators();
export class BaseApplicationRelationDao extends SQDIDao {
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
BaseApplicationRelationDao.Find = new DaoQueryDecorators();
BaseApplicationRelationDao.FindOne = new DaoQueryDecorators();
BaseApplicationRelationDao.Search = new DaoQueryDecorators();
BaseApplicationRelationDao.SearchOne = new DaoQueryDecorators();
export class BaseApplicationRelationColumnDao extends SQDIDao {
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
BaseApplicationRelationColumnDao.Find = new DaoQueryDecorators();
BaseApplicationRelationColumnDao.FindOne = new DaoQueryDecorators();
BaseApplicationRelationColumnDao.Search = new DaoQueryDecorators();
BaseApplicationRelationColumnDao.SearchOne = new DaoQueryDecorators();
export class BaseApplicationVersionDao extends SQDIDao {
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
BaseApplicationVersionDao.Find = new DaoQueryDecorators();
BaseApplicationVersionDao.FindOne = new DaoQueryDecorators();
BaseApplicationVersionDao.Search = new DaoQueryDecorators();
BaseApplicationVersionDao.SearchOne = new DaoQueryDecorators();
export class BaseDomainDao extends SQDIDao {
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
BaseDomainDao.Find = new DaoQueryDecorators();
BaseDomainDao.FindOne = new DaoQueryDecorators();
BaseDomainDao.Search = new DaoQueryDecorators();
BaseDomainDao.SearchOne = new DaoQueryDecorators();
//# sourceMappingURL=baseDaos.js.map