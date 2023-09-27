import { IContext, Injected } from '@airport/direction-indicator'
import { ApplicationVersion_LocalId, DbEntity } from '@airport/ground-control'
import { BaseDdlEntityDao, IBaseDdlEntityDao } from '../../../generated/baseDaos'
import { Q_airport____at_airport_slash_airspace } from '../../../generated/qApplication'
import { QDdlEntity } from '../../../generated/qInterfaces'

export interface IDdlEntityDao
	extends IBaseDdlEntityDao {

	findAllForApplicationVersions(
		applicationVersionIds: ApplicationVersion_LocalId[],
		context: IContext
	): Promise<DbEntity[]>

	insert(
		applicationEntities: DbEntity[],
		context: IContext
	): Promise<void>

}

@Injected()
export class DdlEntityDao
	extends BaseDdlEntityDao
	implements IDdlEntityDao {

	async findAllForApplicationVersions(
		applicationVersionIds: ApplicationVersion_LocalId[],
		context: IContext
	): Promise<DbEntity[]> {
		let se: QDdlEntity

		return await this.db.find.tree({
			SELECT: {},
			FROM: [
				se = Q_airport____at_airport_slash_airspace.DdlEntity
			],
			WHERE: se.applicationVersion._localId.IN(applicationVersionIds)
		}, context)
	}

	async insert(
		applicationEntities: DbEntity[],
		context: IContext
	): Promise<void> {
		let se: QDdlEntity;
		const VALUES = []
		for (const applicationEntity of applicationEntities) {
			VALUES.push([
				applicationEntity._localId, applicationEntity.index,
				applicationEntity.isLocal, applicationEntity.isAirEntity,
				applicationEntity.name, applicationEntity.tableConfig,
				applicationEntity.applicationVersion._localId,
				applicationEntity.deprecatedSinceVersion ? applicationEntity.deprecatedSinceVersion._localId : null,
				applicationEntity.removedInVersion ? applicationEntity.removedInVersion._localId : null,
				applicationEntity.sinceVersion ? applicationEntity.sinceVersion._localId : null,
			])
		}
		await this.db.insertValuesGenerateIds({
			INSERT_INTO: se = Q_airport____at_airport_slash_airspace.DdlEntity,
			columns: [
				se._localId,
				se.index,
				se.isLocal,
				se.isAirEntity,
				se.name,
				se.tableConfig,
				se.applicationVersion._localId,
				se.deprecatedSinceVersion._localId,
				se.removedInVersion._localId,
				se.sinceVersion._localId
			],
			VALUES
		}, context)
	}

}
