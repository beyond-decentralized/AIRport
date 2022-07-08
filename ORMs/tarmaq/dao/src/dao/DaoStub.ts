import { IEntityCreateProperties } from '@airport/air-traffic-control';
import { DaoFindOneStub }          from './DaoFindOneStub';
import { DaoFindStub }             from './DaoFindStub';
import { DaoSearchOneStub }        from './DaoSearchOneStub';
import { DaoSearchStub }           from './DaoSearchStub';

export class DaoStub<Entity, EntityCreate extends IEntityCreateProperties> {
	Find      = new DaoFindStub<Entity, Array<Entity>>();
	FindOne   = new DaoFindOneStub<Entity>();
	Search    = new DaoSearchStub<Entity, Array<Entity>>();
	SearchOne = new DaoSearchOneStub<Entity>();

	save<EntityInfo extends EntityCreate | EntityCreate[]>(
		entity: EntityInfo
	): Promise<number> {
		throw new Error(`Cannot use this.stub.save for manual queries (it
		is meant for prepared queries (with @\${ApplicationEntity_Name}Dao.Save).  Instead
		please use this.db.save`);
	}
}