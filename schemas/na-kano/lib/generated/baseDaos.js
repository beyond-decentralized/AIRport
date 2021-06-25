import { Dao, DaoQueryDecorators, } from '@airport/check-in';
import { Q, duoDiSet, } from './qSchema';
// Schema Q object Dependency Injection readiness detection Dao
export class SQDIDao extends Dao {
    constructor(dbEntityId) {
        super(dbEntityId, Q);
    }
}
export class BaseTodoItemDao extends SQDIDao {
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
BaseTodoItemDao.Find = new DaoQueryDecorators();
BaseTodoItemDao.FindOne = new DaoQueryDecorators();
BaseTodoItemDao.Search = new DaoQueryDecorators();
BaseTodoItemDao.SearchOne = new DaoQueryDecorators();
export class BaseTodoListDao extends SQDIDao {
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
BaseTodoListDao.Find = new DaoQueryDecorators();
BaseTodoListDao.FindOne = new DaoQueryDecorators();
BaseTodoListDao.Search = new DaoQueryDecorators();
BaseTodoListDao.SearchOne = new DaoQueryDecorators();
//# sourceMappingURL=baseDaos.js.map