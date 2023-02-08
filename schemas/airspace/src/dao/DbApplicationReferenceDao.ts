import { IContext, Injected } from '@airport/direction-indicator'
import { DbApplicationVersion_LocalId, DbApplicationReference } from '@airport/ground-control'
import { BaseDdlApplicationReferenceDao, IBaseDdlApplicationReferenceDao } from '../generated/baseDaos'
import Q_airport____at_airport_slash_airspace from '../generated/qApplication'
import { QDdlApplicationReference } from '../generated/qInterfaces'

export interface IDbApplicationReferenceDao
	extends IBaseDdlApplicationReferenceDao {

	findAllForApplicationVersions(
		applicationVersionIds: DbApplicationVersion_LocalId[]
	): Promise<DbApplicationReference[]>

	insert(
		applicationReferences: DbApplicationReference[],
		context: IContext
	): Promise<void>

}

@Injected()
export class DbApplicationReferenceDao
	extends BaseDdlApplicationReferenceDao
	implements IDbApplicationReferenceDao {

	async findAllForApplicationVersions(
		applicationVersionIds: DbApplicationVersion_LocalId[]
	): Promise<DbApplicationReference[]> {
		let sr: QDdlApplicationReference

		return await this.db.find.tree({
			SELECT: {},
			FROM: [
				sr = Q_airport____at_airport_slash_airspace.DdlApplicationReference
			],
			WHERE: sr.ownApplicationVersion._localId.IN(applicationVersionIds)
		})
	}

	async insert(
		applicationReferences: DbApplicationReference[],
		context: IContext
	): Promise<void> {
		let sr: QDdlApplicationReference;
		const VALUES = []
		for (const applicationReference of applicationReferences) {
			VALUES.push([
				applicationReference.ownApplicationVersion._localId,
				applicationReference.referencedApplicationVersion._localId,
				applicationReference.index,
				applicationReference.deprecatedSinceVersion ? applicationReference.deprecatedSinceVersion._localId : null,
				applicationReference.removedInVersion ? applicationReference.removedInVersion._localId : null,
				applicationReference.sinceVersion ? applicationReference.sinceVersion._localId : null,
			])
		}
		await this.db.insertValuesGenerateIds({
			INSERT_INTO: sr = Q_airport____at_airport_slash_airspace.DdlApplicationReference,
			columns: [
				sr.ownApplicationVersion._localId,
				sr.referencedApplicationVersion._localId,
				sr.index,
				sr.deprecatedSinceVersion._localId,
				sr.removedInVersion._localId,
				sr.sinceVersion._localId
			],
			VALUES
		}, context)
	}

}
