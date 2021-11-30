import { Dao, DaoQueryDecorators, } from '@airport/check-in';
import { Q, duoDiSet, } from './qSchema';
// Schema Q object Dependency Injection readiness detection Dao
export class SQDIDao extends Dao {
    constructor(dbEntityId) {
        super(dbEntityId, Q);
    }
}
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
export class BaseSchemaDao extends SQDIDao {
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
BaseSchemaDao.Find = new DaoQueryDecorators();
BaseSchemaDao.FindOne = new DaoQueryDecorators();
BaseSchemaDao.Search = new DaoQueryDecorators();
BaseSchemaDao.SearchOne = new DaoQueryDecorators();
export class BaseSchemaColumnDao extends SQDIDao {
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
BaseSchemaColumnDao.Find = new DaoQueryDecorators();
BaseSchemaColumnDao.FindOne = new DaoQueryDecorators();
BaseSchemaColumnDao.Search = new DaoQueryDecorators();
BaseSchemaColumnDao.SearchOne = new DaoQueryDecorators();
export class BaseSchemaCurrentVersionDao extends SQDIDao {
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
BaseSchemaCurrentVersionDao.Find = new DaoQueryDecorators();
BaseSchemaCurrentVersionDao.FindOne = new DaoQueryDecorators();
BaseSchemaCurrentVersionDao.Search = new DaoQueryDecorators();
BaseSchemaCurrentVersionDao.SearchOne = new DaoQueryDecorators();
export class BaseSchemaEntityDao extends SQDIDao {
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
BaseSchemaEntityDao.Find = new DaoQueryDecorators();
BaseSchemaEntityDao.FindOne = new DaoQueryDecorators();
BaseSchemaEntityDao.Search = new DaoQueryDecorators();
BaseSchemaEntityDao.SearchOne = new DaoQueryDecorators();
export class BaseSchemaOperationDao extends SQDIDao {
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
BaseSchemaOperationDao.Find = new DaoQueryDecorators();
BaseSchemaOperationDao.FindOne = new DaoQueryDecorators();
BaseSchemaOperationDao.Search = new DaoQueryDecorators();
BaseSchemaOperationDao.SearchOne = new DaoQueryDecorators();
export class BaseSchemaPropertyDao extends SQDIDao {
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
BaseSchemaPropertyDao.Find = new DaoQueryDecorators();
BaseSchemaPropertyDao.FindOne = new DaoQueryDecorators();
BaseSchemaPropertyDao.Search = new DaoQueryDecorators();
BaseSchemaPropertyDao.SearchOne = new DaoQueryDecorators();
export class BaseSchemaPropertyColumnDao extends SQDIDao {
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
BaseSchemaPropertyColumnDao.Find = new DaoQueryDecorators();
BaseSchemaPropertyColumnDao.FindOne = new DaoQueryDecorators();
BaseSchemaPropertyColumnDao.Search = new DaoQueryDecorators();
BaseSchemaPropertyColumnDao.SearchOne = new DaoQueryDecorators();
export class BaseSchemaReferenceDao extends SQDIDao {
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
BaseSchemaReferenceDao.Find = new DaoQueryDecorators();
BaseSchemaReferenceDao.FindOne = new DaoQueryDecorators();
BaseSchemaReferenceDao.Search = new DaoQueryDecorators();
BaseSchemaReferenceDao.SearchOne = new DaoQueryDecorators();
export class BaseSchemaRelationDao extends SQDIDao {
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
BaseSchemaRelationDao.Find = new DaoQueryDecorators();
BaseSchemaRelationDao.FindOne = new DaoQueryDecorators();
BaseSchemaRelationDao.Search = new DaoQueryDecorators();
BaseSchemaRelationDao.SearchOne = new DaoQueryDecorators();
export class BaseSchemaRelationColumnDao extends SQDIDao {
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
BaseSchemaRelationColumnDao.Find = new DaoQueryDecorators();
BaseSchemaRelationColumnDao.FindOne = new DaoQueryDecorators();
BaseSchemaRelationColumnDao.Search = new DaoQueryDecorators();
BaseSchemaRelationColumnDao.SearchOne = new DaoQueryDecorators();
export class BaseSchemaVersionDao extends SQDIDao {
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
BaseSchemaVersionDao.Find = new DaoQueryDecorators();
BaseSchemaVersionDao.FindOne = new DaoQueryDecorators();
BaseSchemaVersionDao.Search = new DaoQueryDecorators();
BaseSchemaVersionDao.SearchOne = new DaoQueryDecorators();
//# sourceMappingURL=baseDaos.js.map