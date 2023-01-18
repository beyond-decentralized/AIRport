import { IContext, Injected } from '@airport/direction-indicator'
import { ApplicationVersion_LocalId, DbApplicationReference } from '@airport/ground-control'
import {
	BaseApplicationReferenceDao,
	IBaseApplicationReferenceDao,
	QApplicationReference,
} from '../generated/generated'
import Q from '../generated/qApplication'

export interface IApplicationReferenceDao
	extends IBaseApplicationReferenceDao {

	findAllForApplicationVersions(
		applicationVersionIds: ApplicationVersion_LocalId[]
	): Promise<DbApplicationReference[]>

	insert(
		applicationReferences: DbApplicationReference[],
		context: IContext
	): Promise<void>

}

@Injected()
export class ApplicationReferenceDao
	extends BaseApplicationReferenceDao
	implements IApplicationReferenceDao {

	async findAllForApplicationVersions(
		applicationVersionIds: ApplicationVersion_LocalId[]
	): Promise<DbApplicationReference[]> {
		let sr: QApplicationReference

		return await this.db.find.tree({
			SELECT: {},
			FROM: [
				sr = Q.ApplicationReference
			],
			WHERE: sr.ownApplicationVersion._localId.IN(applicationVersionIds)
		})
	}

	async insert(
		applicationReferences: DbApplicationReference[],
		context: IContext
	): Promise<void> {
		let sr: QApplicationReference;
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
			INSERT_INTO: sr = Q.ApplicationReference,
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
