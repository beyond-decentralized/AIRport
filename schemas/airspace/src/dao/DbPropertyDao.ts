import { IContext, Injected } from '@airport/direction-indicator';
import { DbEntity_LocalId, DbProperty } from '@airport/ground-control'
import { BaseDdlPropertyDao, IBaseDdlPropertyDao } from '../generated/baseDaos';
import Q_airport____at_airport_slash_airspace from '../generated/qApplication';
import { QDdlProperty } from '../generated/qInterfaces';

export interface IDbPropertyDao
	extends IBaseDdlPropertyDao {

	findAllForEntities(
		entityIds: DbEntity_LocalId[]
	): Promise<DbProperty[]>;

	insert(
		applicationProperties: DbProperty[],
		context: IContext
	): Promise<void>

}

@Injected()
export class DbPropertyDao
	extends BaseDdlPropertyDao
	implements IDbPropertyDao {

	async findAllForEntities(
		entityIds: DbEntity_LocalId[]
	): Promise<DbProperty[]> {
		let p: QDdlProperty

		return this.db.find.tree({
			SELECT: {},
			FROM: [
				p = Q_airport____at_airport_slash_airspace.ApplicationProperty
			],
			WHERE: p.entity._localId.IN(entityIds)
		})
	}

	async insert(
		applicationProperties: DbProperty[],
		context: IContext
	): Promise<void> {
		let sp: QDdlProperty;
		const VALUES = []
		for (const applicationProperty of applicationProperties) {
			VALUES.push([
				applicationProperty._localId, applicationProperty.index,
				applicationProperty.name, applicationProperty.isId,
				applicationProperty.entity._localId,
				applicationProperty.deprecatedSinceVersion ? applicationProperty.deprecatedSinceVersion._localId : null,
				applicationProperty.removedInVersion ? applicationProperty.removedInVersion._localId : null,
				applicationProperty.sinceVersion ? applicationProperty.sinceVersion._localId : null,
			])
		}
		await this.db.insertValuesGenerateIds({
			INSERT_INTO: sp = Q_airport____at_airport_slash_airspace.ApplicationProperty,
			columns: [
				sp._localId,
				sp.index,
				sp.name,
				sp.isId,
				sp.entity._localId,
				sp.deprecatedSinceVersion._localId,
				sp.removedInVersion._localId,
				sp.sinceVersion._localId
			],
			VALUES
		}, context)
	}

}
