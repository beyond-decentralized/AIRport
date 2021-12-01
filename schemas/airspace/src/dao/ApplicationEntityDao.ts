import {DI}                from '@airport/di'
import {ApplicationVersionId}   from '@airport/ground-control'
import {
	BaseApplicationEntityDao,
	IBaseApplicationEntityDao,
	IApplicationEntity,
	Q,
	QApplicationEntity,
}                          from '../generated/generated'
import {APPLICATION_ENTITY_DAO} from '../tokens'

export interface IApplicationEntityDao
	extends IBaseApplicationEntityDao {

	findAllForApplicationVersions(
		applicationVersionIds: ApplicationVersionId[]
	): Promise<IApplicationEntity[]>

	insert(
		applicationEntities: IApplicationEntity[]
	): Promise<void>

}

export class ApplicationEntityDao
	extends BaseApplicationEntityDao
	implements IApplicationEntityDao {

	async findAllForApplicationVersions(
		applicationVersionIds: ApplicationVersionId[]
	): Promise<IApplicationEntity[]> {
		let se: QApplicationEntity

		return await this.db.find.tree({
			select: {},
			from: [
				se = Q.ApplicationEntity
			],
			where: se.applicationVersion.id.in(applicationVersionIds)
		})
	}
	
	async insert(
		applicationEntities: IApplicationEntity[]
	): Promise<void> {
		let se: QApplicationEntity;
		const values = []
		for (const applicationEntity of applicationEntities) {
			values.push([
				applicationEntity.id, applicationEntity.index,
				applicationEntity.isLocal, applicationEntity.isRepositoryEntity,
				applicationEntity.name, applicationEntity.tableConfig,
				applicationEntity.applicationVersion.id,
				applicationEntity.deprecatedSinceVersion ? applicationEntity.deprecatedSinceVersion.id : null,
				applicationEntity.removedInVersion ? applicationEntity.removedInVersion.id : null,
				applicationEntity.sinceVersion ? applicationEntity.sinceVersion.id : null,
			])
		}
		await this.db.insertValuesGenerateIds({
			insertInto: se = Q.ApplicationEntity,
			columns: [
				se.id,
				se.index,
				se.isLocal,
				se.isRepositoryEntity,
				se.name,
				se.tableConfig,
				se.applicationVersion.id,
				se.deprecatedSinceVersion.id,
				se.removedInVersion.id,
				se.sinceVersion.id
			],
			values
		})
	}

}

DI.set(APPLICATION_ENTITY_DAO, ApplicationEntityDao)
