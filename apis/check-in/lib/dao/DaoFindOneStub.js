export class DaoFindOneStub {
    Graph(...args) {
        throw new Error(`Cannot use this.stub.Find.Graph for manual queries (it
		is meant for prepared queries (with @\${ApplicationEntity_Name}Dao.Find).  Instead
		please use this.db.find.graph`);
    }
    Tree(...args) {
        throw new Error(`Cannot use this.stub.Find.Tree for manual queries (it
		is meant for prepared queries (with @\${ApplicationEntity_Name}Dao.Find).  Instead
		please use this.db.find.tree`);
    }
}
//# sourceMappingURL=DaoFindOneStub.js.map