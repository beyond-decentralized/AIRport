import { and, Y } from '@airport/air-control'
import { Injected } from '@airport/direction-indicator'
import {
	BaseApplicationVersionDao,
	IBaseApplicationVersionDao,
	IApplicationVersion,
	Q,
	QDomain,
	QApplication,
	QApplicationVersion
} from '../generated/generated'

export interface IApplicationVersionDao
	extends IBaseApplicationVersionDao {

	findAllActiveOrderByApplicationIndexAndId(): Promise<IApplicationVersion[]>

	findByDomainNamesAndApplicationNames(
		domainNames: string[],
		applicationNames: string[]
	): Promise<IApplicationVersion[]>

	insert(
		applicationVersions: IApplicationVersion[]
	): Promise<void>

}

@Injected()
export class ApplicationVersionDao
	extends BaseApplicationVersionDao
	implements IApplicationVersionDao {

	/*
	async findAllLatestForApplicationIndexes(
		applicationIndexes: ApplicationIndex[]
	): Promise<IApplicationVersion[]> {
		let sv: QApplicationVersion

		return await this.db.find.tree({
			from: [
				sv = Q.ApplicationVersion
			],
			select: {},
			where: and(
				sv.id.in(this.idsForMaxVersionSelect()),
				sv.application.index.in(applicationIndexes)
			)
		})
	}
	*/

	async findAllActiveOrderByApplicationIndexAndId(): Promise<IApplicationVersion[]> {
		let sv: QApplicationVersion
		// let s: QApplication

		return await this.db.find.tree({
			from: [
				sv = Q.ApplicationVersion,
				// s = sv.application.innerJoin()
			],
			select: {},
			orderBy: [
				sv.application.index.asc(),
				sv.id.desc()
			]
		})
	}

	async findByDomainNamesAndApplicationNames(
		domainNames: string[],
		applicationNames: string[]
	): Promise<IApplicationVersion[]> {
		let sv: QApplicationVersion
		let s: QApplication
		let d: QDomain

		return await this.db.find.tree({
			select: {
				id: Y,
				integerVersion: Y,
				application: {
					domain: {
						name: Y
					},
					fullName: Y,
					name: Y
				}
			},
			from: [
				sv = Q.ApplicationVersion,
				s = sv.application.innerJoin(),
				d = s.domain.innerJoin()
			],
			where: and(
				d.name.in(domainNames),
				s.name.in(applicationNames)
			)
		})
	}

	/*
	async findMaxVersionedMapByApplicationAndDomainNames(
		applicationDomainNames: DomainName[],
		applicationNames: ApplicationName[]
	): Promise<Map<DomainName, Map<ApplicationName, IApplicationVersion>>> {
		const maxVersionedMapByApplicationAndDomainNames
				  : Map<DomainName, Map<ApplicationName, IApplicationVersion>>
				  = new Map()

		let sv: QApplicationVersion
		let s: QApplication
		let d: QDomain

		const maxApplicationVersions: IApplicationVersion[] = <any>await this.db.find.tree({
			select: {
				integerVersion: Y,
				majorVersion: Y,
				minorVersion: Y,
				patchVersion: Y,
				application: {
					index: Y,
					name: Y,
					domain: {
						id: Y,
						name: Y
					}
				},
				id: Y
			},
			from: [
				sv = Q.ApplicationVersion,
				s = sv.application.innerJoin(),
				d = s.domain.innerJoin()
			],
			where: and(
				sv.id.in(this.idsForMaxVersionSelect()),
				d.name.in(applicationDomainNames),
				s.name.in(applicationNames)
			),
		})

		for (const maxApplicationVersion of maxApplicationVersions) {
			const application = maxApplicationVersion.application
			this.utils.ensureChildJsMap(
				maxVersionedMapByApplicationAndDomainNames, application.domain.name)
				.set(application.name, maxApplicationVersion)
		}


		return maxVersionedMapByApplicationAndDomainNames
	}

	private idsForMaxVersionSelect(): RawFieldQuery<IQNumberField> {
		let svMax
		let sv2: QApplicationVersion

		return field({
			from: [
				svMax = tree({
					from: [
						sv2 = Q.ApplicationVersion
					],
					select: distinct({
						integerVersion: max(sv2.integerVersion),
						id: sv2.id,
						applicationIndex: sv2.application.index
					})
				})
			],
			select: svMax.id
		})
	}
*/
	async insert(
		applicationVersions: IApplicationVersion[]
	): Promise<void> {
		let sv: QApplicationVersion;
		const values = []
		for (const applicationVersion of applicationVersions) {
			values.push([
				applicationVersion.id, applicationVersion.integerVersion,
				applicationVersion.versionString, applicationVersion.majorVersion,
				applicationVersion.minorVersion, applicationVersion.patchVersion,
				applicationVersion.application.index, applicationVersion.jsonApplication
			])
		}
		await this.db.insertValuesGenerateIds({
			insertInto: sv = Q.ApplicationVersion,
			columns: [
				sv.id,
				sv.integerVersion,
				sv.versionString,
				sv.majorVersion,
				sv.minorVersion,
				sv.patchVersion,
				sv.application.index,
				sv.jsonApplication
			],
			values
		})
	}

}
