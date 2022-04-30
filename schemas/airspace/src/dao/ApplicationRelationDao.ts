import { Injected } from '@airport/direction-indicator'
import {
	PropertyId,
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
		propertyIds: PropertyId[]
	): Promise<IApplicationRelation[]>

	insert(
		applicationRelations: IApplicationRelation[]
	): Promise<void>

}

@Injected()
export class ApplicationRelationDao
	extends BaseApplicationRelationDao
	implements IApplicationRelationDao {

	async findAllForProperties(
		propertyIds: PropertyId[]
	): Promise<IApplicationRelation[]> {
		let r: QApplicationRelation

		return this.db.find.tree({
			select: {},
			from: [
				r = Q.ApplicationRelation
			],
			where: r.property.id.in(propertyIds)
		})
	}

	async insert(
		applicationRelations: IApplicationRelation[]
	): Promise<void> {
		let sr: QApplicationRelation;
		const values = []
		for (const applicationRelation of applicationRelations) {
			values.push([
				applicationRelation.id, applicationRelation.index,
				applicationRelation.property.id,
				undefinedToNull(applicationRelation.foreignKey),
				undefinedToNull(applicationRelation.manyToOneElems),
				undefinedToNull(applicationRelation.oneToManyElems),
				applicationRelation.relationType, applicationRelation.isId,
				applicationRelation.entity.id, applicationRelation.relationEntity.id,
				applicationRelation.deprecatedSinceVersion ? applicationRelation.deprecatedSinceVersion.id : null,
				applicationRelation.removedInVersion ? applicationRelation.removedInVersion.id : null,
				applicationRelation.sinceVersion ? applicationRelation.sinceVersion.id : null,
			])
		}
		await this.db.insertValuesGenerateIds({
			insertInto: sr = Q.ApplicationRelation,
			columns: [
				sr.id,
				sr.index,
				sr.property.id,
				sr.foreignKey,
				sr.manyToOneElems,
				sr.oneToManyElems,
				sr.relationType,
				sr.isId,
				sr.entity.id,
				sr.relationEntity.id,
				sr.deprecatedSinceVersion.id,
				sr.removedInVersion.id,
				sr.sinceVersion.id
			],
			values
		})
	}

}
