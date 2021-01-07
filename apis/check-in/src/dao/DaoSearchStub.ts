import { IObservable } from '@airport/observe';

export class DaoSearchStub<Entity, EntityArray extends Array<Entity>> {
	Graph(
		...args: any[]
	): IObservable<EntityArray> {
		throw new Error(`Cannot use this.stub.Search.Graph for manual queries (it
		is meant for prepared queries (with @\${EntityName}Dao.Search).  Instead
		please use this.db.search.graph`);
	}

	Tree(
		...args: any[]
	): IObservable<EntityArray> {
		throw new Error(`Cannot use this.stub.Search.Tree for manual queries (it
		is meant for prepared queries (with @\${EntityName}Dao.Search).  Instead
		please use this.db.search.tree`);
	}
}