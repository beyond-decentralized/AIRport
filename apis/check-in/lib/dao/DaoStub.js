import { DaoFindOneStub } from './DaoFindOneStub';
import { DaoFindStub } from './DaoFindStub';
import { DaoSearchOneStub } from './DaoSearchOneStub';
import { DaoSearchStub } from './DaoSearchStub';
export class DaoStub {
    constructor() {
        this.Find = new DaoFindStub();
        this.FindOne = new DaoFindOneStub();
        this.Search = new DaoSearchStub();
        this.SearchOne = new DaoSearchOneStub();
    }
    save(entity) {
        throw new Error(`Cannot use this.stub.save for manual queries (it
		is meant for prepared queries (with @\${ApplicationEntity_Name}Dao.Save).  Instead
		please use this.db.save`);
    }
}
//# sourceMappingURL=DaoStub.js.map