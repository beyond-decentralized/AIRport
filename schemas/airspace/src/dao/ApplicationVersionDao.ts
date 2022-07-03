import { and, Y } from '@airport/air-traffic-control'
import { IContext, Injected } from '@airport/direction-indicator'
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

	findAllActiveOrderByApplication_IndexAndId(): Promise<IApplicationVersion[]>

	findByDomain_NamesAndApplication_Names(
		domainNames: string[],
		applicationNames: string[]
	): Promise<IApplicationVersion[]>

	insert(
		applicationVersions: IApplicationVersion[],
		context: IContext
	): Promise<void>

}

@Injected()
export class ApplicationVersionDao
	extends BaseApplicationVersionDao
	implements IApplicationVersionDao {

	/*
	async findAllLatestForApplication_Indexes(
		applicationIndexes: Application_Index[]
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

	async findAllActiveOrderByApplication_IndexAndId(): Promise<IApplicationVersion[]> {
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

	async findByDomain_NamesAndApplication_Names(
		domainNames: string[],
		applicationNames: string[]
	): Promise<IApplicationVersion[]> {
		let sv: QApplicationVersion
		let s: QApplication
		let d: QDomain

		return await this.db.find.tree({
			select: {
				_localId: Y,
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
	async findMaxVersionedMapByApplicationAndDomain_Names(
		applicationDomain_Names: Domain_Name[],
		applicationNames: Application_Name[]
	): Promise<Map<Domain_Name, Map<Application_Name, IApplicationVersion>>> {
		const maxVersionedMapByApplicationAndDomain_Names
				  : Map<Domain_Name, Map<Application_Name, IApplicationVersion>>
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
						_localId: Y,
						name: Y
					}
				},
				_localId: Y
			},
			from: [
				sv = Q.ApplicationVersion,
				s = sv.application.innerJoin(),
				d = s.domain.innerJoin()
			],
			where: and(
				sv._localId.in(this.idsForMaxVersionSelect()),
				d.name.in(applicationDomain_Names),
				s.name.in(applicationNames)
			),
		})

		for (const maxApplicationVersion of maxApplicationVersions) {
			const application = maxApplicationVersion.application
			this.utils.ensureChildJsMap(
				maxVersionedMapByApplicationAndDomain_Names, application.domain.name)
				.set(application.name, maxApplicationVersion)
		}


		return maxVersionedMapByApplicationAndDomain_Names
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
						_localId: sv2._localId,
						applicationIndex: sv2.application.index
					})
				})
			],
			select: svMax._localId
		})
	}
*/
	async insert(
		applicationVersions: IApplicationVersion[],
		context: IContext
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
		}, context)
	}

}
