export class DaoSearchStub {
    Graph(...args) {
        throw new Error(`Cannot use this.stub.Search.Graph for manual queries (it
		is meant for prepared queries (with @\${EntityName}Dao.Search).  Instead
		please use this.db.search.graph`);
    }
    Tree(...args) {
        throw new Error(`Cannot use this.stub.Search.Tree for manual queries (it
		is meant for prepared queries (with @\${EntityName}Dao.Search).  Instead
		please use this.db.search.tree`);
    }
}
//# sourceMappingURL=DaoSearchStub.js.map