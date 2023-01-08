import { IContext, Injected } from '@airport/direction-indicator'
import {
	ApplicationProperty_LocalId,
	ApplicationRelation_LocalId,
	undefinedToNull
} from '@airport/ground-control'
import { Y } from '@airport/tarmaq-query'
import {
	BaseApplicationRelationDao,
	IBaseApplicationRelationDao,
	IApplicationRelation,
	QApplicationRelation,
	QApplicationEntity,
	QApplicationVersion,
	QApplication,
} from '../generated/generated'
import Q from '../generated/qApplication'

export interface IApplicationRelationDao
	extends IBaseApplicationRelationDao {

	findAllForProperties(
		propertyIds: ApplicationProperty_LocalId[]
	): Promise<IApplicationRelation[]>

	findAllByLocalIdsWithApplications(
		localIds: ApplicationRelation_LocalId[]
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
			SELECT: {},
			FROM: [
				r = Q.ApplicationRelation
			],
			WHERE: r.property._localId.IN(propertyIds)
		})
	}

	async findAllByLocalIdsWithApplications(
		localIds: ApplicationRelation_LocalId[]
	): Promise<IApplicationRelation[]> {
		let r: QApplicationRelation,
			e: QApplicationEntity,
			av: QApplicationVersion,
			a: QApplication

		return this.db.find.tree({
			SELECT: {
				_localId: Y,
				entity: {
					applicationVersion: {
						application: {
							domain: {
								name: Y
							},
							name: Y
						},
						integerVersion: Y
					}
				}
			},
			FROM: [
				r = Q.ApplicationRelation,
				e = r.entity.LEFT_JOIN(),
				av = e.applicationVersion.LEFT_JOIN(),
				a = av.application.LEFT_JOIN(),
				a.domain.LEFT_JOIN()
			],
			WHERE: r._localId.IN(localIds)
		})
	}

	async insert(
		applicationRelations: IApplicationRelation[],
		context: IContext
	): Promise<void> {
		let sr: QApplicationRelation;
		const VALUES = []
		for (const applicationRelation of applicationRelations) {
			VALUES.push([
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
			INSERT_INTO: sr = Q.ApplicationRelation,
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
			VALUES
		}, context)
	}

}
