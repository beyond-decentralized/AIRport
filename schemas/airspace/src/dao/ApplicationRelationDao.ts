import { IContext, Injected } from '@airport/direction-indicator'
import {
	ApplicationProperty_LocalId,
	undefinedToNull
} from '@airport/ground-control'
import {
	BaseApplicationRelationDao,
	IBaseApplicationRelationDao,
	IApplicationRelation,
	Q,
	QApplicationRelation,
} from '../generated/generated'

export interface IApplicationRelationDao
	extends IBaseApplicationRelationDao {

	findAllForProperties(
		propertyIds: ApplicationProperty_LocalId[]
	): Promise<IApplicationRelation[]>

	insert(
		applicationRelations: IApplicationRelation[],
		context: IContext
	): Promise<void>

}

@Injected()
export class ApplicationRelationDao
	extends BaseApplicationRelationDao
	implements IApplicationRelationDao {

	async findAllForProperties(
		propertyIds: ApplicationProperty_LocalId[]
	): Promise<IApplicationRelation[]> {
		let r: QApplicationRelation

		return this.db.find.tree({
			select: {},
			from: [
				r = Q.ApplicationRelation
			],
			where: r.property._localId.in(propertyIds)
		})
	}

	async insert(
		applicationRelations: IApplicationRelation[],
		context: IContext
	): Promise<void> {
		let sr: QApplicationRelation;
		const values = []
		for (const applicationRelation of applicationRelations) {
			values.push([
				applicationRelation._localId, applicationRelation.index,
				applicationRelation.property._localId,
				undefinedToNull(applicationRelation.foreignKey),
				undefinedToNull(applicationRelation.manyToOneElems),
				undefinedToNull(applicationRelation.oneToManyElems),
				applicationRelation.relationType, applicationRelation.isId,
				applicationRelation.entity._localId, applicationRelation.relationEntity._localId,
				applicationRelation.deprecatedSinceVersion ? applicationRelation.deprecatedSinceVersion._localId : null,
				applicationRelation.removedInVersion ? applicationRelation.removedInVersion._localId : null,
				applicationRelation.sinceVersion ? applicationRelation.sinceVersion._localId : null,
			])
		}
		await this.db.insertValuesGenerateIds({
			insertInto: sr = Q.ApplicationRelation,
			columns: [
				sr._localId,
				sr.index,
				sr.property._localId,
				sr.foreignKey,
				sr.manyToOneElems,
				sr.oneToManyElems,
				sr.relationType,
				sr.isId,
				sr.entity._localId,
				sr.relationEntity._localId,
				sr.deprecatedSinceVersion._localId,
				sr.removedInVersion._localId,
				sr.sinceVersion._localId
			],
			values
		}, context)
	}

}
