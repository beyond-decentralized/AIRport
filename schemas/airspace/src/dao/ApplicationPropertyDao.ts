import { IContext, Injected } from '@airport/direction-indicator';
import { ApplicationEntity_LocalId } from '@airport/ground-control'
import {
	BaseApplicationPropertyDao,
	IBaseApplicationPropertyDao,
	IApplicationProperty,
	Q,
	QApplicationProperty,
} from '../generated/generated'

export interface IApplicationPropertyDao
	extends IBaseApplicationPropertyDao {

	findAllForEntities(
		entityIds: ApplicationEntity_LocalId[]
	): Promise<IApplicationProperty[]>;

	insert(
		applicationProperties: IApplicationProperty[],
		context: IContext
	): Promise<void>

}

@Injected()
export class ApplicationPropertyDao
	extends BaseApplicationPropertyDao
	implements IApplicationPropertyDao {

	async findAllForEntities(
		entityIds: ApplicationEntity_LocalId[]
	): Promise<IApplicationProperty[]> {
		let p: QApplicationProperty

		return this.db.find.tree({
			select: {},
			from: [
				p = Q.ApplicationProperty
			],
			where: p.entity._localId.in(entityIds)
		})
	}

	async insert(
		applicationProperties: IApplicationProperty[],
		context: IContext
	): Promise<void> {
		let sp: QApplicationProperty;
		const values = []
		for (const applicationProperty of applicationProperties) {
			values.push([
				applicationProperty._localId, applicationProperty.index,
				applicationProperty.name, applicationProperty.isId,
				applicationProperty.entity._localId,
				applicationProperty.deprecatedSinceVersion ? applicationProperty.deprecatedSinceVersion._localId : null,
				applicationProperty.removedInVersion ? applicationProperty.removedInVersion._localId : null,
				applicationProperty.sinceVersion ? applicationProperty.sinceVersion._localId : null,
			])
		}
		await this.db.insertValuesGenerateIds({
			insertInto: sp = Q.ApplicationProperty,
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
			values
		}, context)
	}

}
