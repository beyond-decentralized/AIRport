import { IContext, Inject, Injected } from '@airport/direction-indicator'
import {
	DbProperty_LocalId,
	DbRelation_LocalId,
	DbRelation,
	IDatastructureUtils
} from '@airport/ground-control'
import { Y } from '@airport/tarmaq-query'
import { BaseDdlRelationDao, IBaseDdlRelationDao } from '../../../generated/baseDaos'
import Q_airport____at_airport_slash_airspace from '../../../generated/qApplication'
import { QDdlApplication, QDdlApplicationVersion, QDdlEntity, QDdlRelation } from '../../../generated/qInterfaces'

export interface IDdlRelationDao
	extends IBaseDdlRelationDao {

	findAllForProperties(
		propertyIds: DbProperty_LocalId[],
		context: IContext
	): Promise<DbRelation[]>

	findAllByLocalIdsWithApplications(
		localIds: DbRelation_LocalId[],
		context: IContext
	): Promise<DbRelation[]>

	insert(
		applicationRelations: DbRelation[],
		context: IContext
	): Promise<void>

}

@Injected()
export class DdlRelationDao
	extends BaseDdlRelationDao
	implements IDdlRelationDao {

	@Inject()
	datastructureUtils: IDatastructureUtils

	async findAllForProperties(
		propertyIds: DbProperty_LocalId[],
		context: IContext
	): Promise<DbRelation[]> {
		let r: QDdlRelation

		return this.db.find.tree({
			SELECT: {},
			FROM: [
				r = Q_airport____at_airport_slash_airspace.DdlRelation
			],
			WHERE: r.property._localId.IN(propertyIds)
		}, context)
	}

	async findAllByLocalIdsWithApplications(
		localIds: DbRelation_LocalId[],
		context: IContext
	): Promise<DbRelation[]> {
		let r: QDdlRelation,
			e: QDdlEntity,
			av: QDdlApplicationVersion,
			a: QDdlApplication

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
				r = Q_airport____at_airport_slash_airspace.DdlRelation,
				e = r.entity.LEFT_JOIN(),
				av = e.applicationVersion.LEFT_JOIN(),
				a = av.application.LEFT_JOIN(),
				a.domain.LEFT_JOIN()
			],
			WHERE: r._localId.IN(localIds)
		}, context)
	}

	async insert(
		applicationRelations: DbRelation[],
		context: IContext
	): Promise<void> {
		let sr: QDdlRelation;
		const VALUES = []
		for (const applicationRelation of applicationRelations) {
			VALUES.push([
				applicationRelation._localId, applicationRelation.index,
				applicationRelation.property._localId,
				this.datastructureUtils.undefinedToNull(applicationRelation.foreignKey),
				this.datastructureUtils.undefinedToNull(applicationRelation.manyToOneElems),
				this.datastructureUtils.undefinedToNull(applicationRelation.oneToManyElems),
				applicationRelation.relationType, applicationRelation.isId,
				applicationRelation.entity._localId, applicationRelation.relationEntity._localId,
				applicationRelation.deprecatedSinceVersion ? applicationRelation.deprecatedSinceVersion._localId : null,
				applicationRelation.removedInVersion ? applicationRelation.removedInVersion._localId : null,
				applicationRelation.sinceVersion ? applicationRelation.sinceVersion._localId : null,
			])
		}
		await this.db.insertValuesGenerateIds({
			INSERT_INTO: sr = Q_airport____at_airport_slash_airspace.DdlRelation,
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
