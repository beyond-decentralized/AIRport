import { IContext, Injected } from '@airport/direction-indicator'
import { ApplicationVersion_LocalId, DbEntity } from '@airport/ground-control'
import {
	BaseApplicationEntityDao,
	IBaseApplicationEntityDao,
	QApplicationEntity,
} from '../generated/generated'
import Q from '../generated/qApplication'

export interface IApplicationEntityDao
	extends IBaseApplicationEntityDao {

	findAllForApplicationVersions(
		applicationVersionIds: ApplicationVersion_LocalId[]
	): Promise<DbEntity[]>

	insert(
		applicationEntities: DbEntity[],
		context: IContext
	): Promise<void>

}

@Injected()
export class ApplicationEntityDao
	extends BaseApplicationEntityDao
	implements IApplicationEntityDao {

	async findAllForApplicationVersions(
		applicationVersionIds: ApplicationVersion_LocalId[]
	): Promise<DbEntity[]> {
		let se: QApplicationEntity

		return await this.db.find.tree({
			SELECT: {},
			FROM: [
				se = Q.ApplicationEntity
			],
			WHERE: se.applicationVersion._localId.IN(applicationVersionIds)
		})
	}

	async insert(
		applicationEntities: DbEntity[],
		context: IContext
	): Promise<void> {
		let se: QApplicationEntity;
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
			INSERT_INTO: se = Q.ApplicationEntity,
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
