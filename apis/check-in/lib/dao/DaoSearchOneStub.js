export class DaoSearchOneStub {
    Graph(...args) {
        throw new Error(`Cannot use this.stub.SearchOne.Graph for manual queries (it
		is meant for prepared queries (with @\${EntityName}Dao.SearchOne).  Instead
		please use this.db.searchOne.graph`);
    }
    Tree(...args) {
        throw new Error(`Cannot use this.stub.SearchOne.Tree for manual queries (it
		is meant for prepared queries (with @\${EntityName}Dao.SearchOne).  Instead
		please use this.db.searchOne.tree`);
    }
}
//# sourceMappingURL=DaoSearchOneStub.js.map