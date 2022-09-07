import { IContext, Injected } from '@airport/direction-indicator';
import { ApplicationEntity_LocalId } from '@airport/ground-control'
import {
	BaseApplicationPropertyDao,
	IBaseApplicationPropertyDao,
	IApplicationProperty,
	QApplicationProperty,
} from '../generated/generated'
import Q from '../generated/qApplication'

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
			SELECT: {},
			FROM: [
				p = Q.ApplicationProperty
			],
			WHERE: p.entity._localId.IN(entityIds)
		})
	}

	async insert(
		applicationProperties: IApplicationProperty[],
		context: IContext
	): Promise<void> {
		let sp: QApplicationProperty;
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
			INSERT_INTO: sp = Q.ApplicationProperty,
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
