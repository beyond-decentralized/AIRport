export class DaoFindOneStub<Entity> {
	Graph(
		...args: any[]
	): Promise<Entity> {
		throw new Error(`Cannot use this.stub.Find.Graph for manual queries (it
		is meant for prepared queries (with @\${EntityName}Dao.Find).  Instead
		please use this.db.find.graph`);
	}

	Tree(
		...args: any[]
	): Promise<Entity> {
		throw new Error(`Cannot use this.stub.Find.Tree for manual queries (it
		is meant for prepared queries (with @\${EntityName}Dao.Find).  Instead
		please use this.db.find.tree`);
	}
}