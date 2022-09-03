import { Dao, DaoQueryDecorators, } from '@airport/tarmaq-dao';
import { Q, air____at_airport_slash_travel_dash_document_dash_checkpoint_diSet, } from './qApplication';
// Application Q object Dependency Injection readiness detection Dao
export class SQDIDao extends Dao {
    constructor(dbEntityId) {
        super(dbEntityId, Q);
    }
}
export class BaseClassificationDao extends SQDIDao {
    constructor() {
        super(6);
    }
    static Save(config) {
        return Dao.BaseSave(config);
    }
    static diSet() {
        return air____at_airport_slash_travel_dash_document_dash_checkpoint_diSet(6);
    }
}
BaseClassificationDao.Find = new DaoQueryDecorators();
BaseClassificationDao.FindOne = new DaoQueryDecorators();
BaseClassificationDao.Search = new DaoQueryDecorators();
BaseClassificationDao.SearchOne = new DaoQueryDecorators();
export class BaseClientDao extends SQDIDao {
    constructor() {
        super(10);
    }
    static Save(config) {
        return Dao.BaseSave(config);
    }
    static diSet() {
        return air____at_airport_slash_travel_dash_document_dash_checkpoint_diSet(10);
    }
}
BaseClientDao.Find = new DaoQueryDecorators();
BaseClientDao.FindOne = new DaoQueryDecorators();
BaseClientDao.Search = new DaoQueryDecorators();
BaseClientDao.SearchOne = new DaoQueryDecorators();
export class BaseClientTypeDao extends SQDIDao {
    constructor() {
        super(9);
    }
    static Save(config) {
        return Dao.BaseSave(config);
    }
    static diSet() {
        return air____at_airport_slash_travel_dash_document_dash_checkpoint_diSet(9);
    }
}
BaseClientTypeDao.Find = new DaoQueryDecorators();
BaseClientTypeDao.FindOne = new DaoQueryDecorators();
BaseClientTypeDao.Search = new DaoQueryDecorators();
BaseClientTypeDao.SearchOne = new DaoQueryDecorators();
export class BaseContinentDao extends SQDIDao {
    constructor() {
        super(5);
    }
    static Save(config) {
        return Dao.BaseSave(config);
    }
    static diSet() {
        return air____at_airport_slash_travel_dash_document_dash_checkpoint_diSet(5);
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
        return air____at_airport_slash_travel_dash_document_dash_checkpoint_diSet(0);
    }
}
BaseCountryDao.Find = new DaoQueryDecorators();
BaseCountryDao.FindOne = new DaoQueryDecorators();
BaseCountryDao.Search = new DaoQueryDecorators();
BaseCountryDao.SearchOne = new DaoQueryDecorators();
export class BaseDatabaseDao extends SQDIDao {
    constructor() {
        super(12);
    }
    static Save(config) {
        return Dao.BaseSave(config);
    }
    static diSet() {
        return air____at_airport_slash_travel_dash_document_dash_checkpoint_diSet(12);
    }
}
BaseDatabaseDao.Find = new DaoQueryDecorators();
BaseDatabaseDao.FindOne = new DaoQueryDecorators();
BaseDatabaseDao.Search = new DaoQueryDecorators();
BaseDatabaseDao.SearchOne = new DaoQueryDecorators();
export class BaseDatabaseTypeDao extends SQDIDao {
    constructor() {
        super(11);
    }
    static Save(config) {
        return Dao.BaseSave(config);
    }
    static diSet() {
        return air____at_airport_slash_travel_dash_document_dash_checkpoint_diSet(11);
    }
}
BaseDatabaseTypeDao.Find = new DaoQueryDecorators();
BaseDatabaseTypeDao.FindOne = new DaoQueryDecorators();
BaseDatabaseTypeDao.Search = new DaoQueryDecorators();
BaseDatabaseTypeDao.SearchOne = new DaoQueryDecorators();
export class BaseMetroAreaDao extends SQDIDao {
    constructor() {
        super(3);
    }
    static Save(config) {
        return Dao.BaseSave(config);
    }
    static diSet() {
        return air____at_airport_slash_travel_dash_document_dash_checkpoint_diSet(3);
    }
}
BaseMetroAreaDao.Find = new DaoQueryDecorators();
BaseMetroAreaDao.FindOne = new DaoQueryDecorators();
BaseMetroAreaDao.Search = new DaoQueryDecorators();
BaseMetroAreaDao.SearchOne = new DaoQueryDecorators();
export class BaseMetroAreaStateDao extends SQDIDao {
    constructor() {
        super(2);
    }
    static Save(config) {
        return Dao.BaseSave(config);
    }
    static diSet() {
        return air____at_airport_slash_travel_dash_document_dash_checkpoint_diSet(2);
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
        return air____at_airport_slash_travel_dash_document_dash_checkpoint_diSet(1);
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
        return air____at_airport_slash_travel_dash_document_dash_checkpoint_diSet(14);
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
        return air____at_airport_slash_travel_dash_document_dash_checkpoint_diSet(13);
    }
}
BaseTerminalTypeDao.Find = new DaoQueryDecorators();
BaseTerminalTypeDao.FindOne = new DaoQueryDecorators();
BaseTerminalTypeDao.Search = new DaoQueryDecorators();
BaseTerminalTypeDao.SearchOne = new DaoQueryDecorators();
export class BaseTypeDao extends SQDIDao {
    constructor() {
        super(8);
    }
    static Save(config) {
        return Dao.BaseSave(config);
    }
    static diSet() {
        return air____at_airport_slash_travel_dash_document_dash_checkpoint_diSet(8);
    }
}
BaseTypeDao.Find = new DaoQueryDecorators();
BaseTypeDao.FindOne = new DaoQueryDecorators();
BaseTypeDao.Search = new DaoQueryDecorators();
BaseTypeDao.SearchOne = new DaoQueryDecorators();
export class BaseTypeClassificationDao extends SQDIDao {
    constructor() {
        super(7);
    }
    static Save(config) {
        return Dao.BaseSave(config);
    }
    static diSet() {
        return air____at_airport_slash_travel_dash_document_dash_checkpoint_diSet(7);
    }
}
BaseTypeClassificationDao.Find = new DaoQueryDecorators();
BaseTypeClassificationDao.FindOne = new DaoQueryDecorators();
BaseTypeClassificationDao.Search = new DaoQueryDecorators();
BaseTypeClassificationDao.SearchOne = new DaoQueryDecorators();
export class BaseUserAccountDao extends SQDIDao {
    constructor() {
        super(4);
    }
    static Save(config) {
        return Dao.BaseSave(config);
    }
    static diSet() {
        return air____at_airport_slash_travel_dash_document_dash_checkpoint_diSet(4);
    }
}
BaseUserAccountDao.Find = new DaoQueryDecorators();
BaseUserAccountDao.FindOne = new DaoQueryDecorators();
BaseUserAccountDao.Search = new DaoQueryDecorators();
BaseUserAccountDao.SearchOne = new DaoQueryDecorators();
//# sourceMappingURL=baseDaos.js.map