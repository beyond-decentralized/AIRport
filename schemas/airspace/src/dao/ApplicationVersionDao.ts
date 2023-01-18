import { AND, Y } from '@airport/tarmaq-query'
import { IContext, Injected } from '@airport/direction-indicator'
import {
	BaseApplicationVersionDao,
	IBaseApplicationVersionDao,
	QDomain,
	QApplication,
	QApplicationVersion
} from '../generated/generated'
import Q from '../generated/qApplication'
import { Application_Name, DbApplicationVersion, Domain_Name } from '@airport/ground-control'

export interface IApplicationVersionDao
	extends IBaseApplicationVersionDao {

	findAllActiveOrderByApplication_IndexAndId(): Promise<DbApplicationVersion[]>

	findByDomain_NamesAndApplication_Names(
		domainNames: string[],
		applicationNames: string[]
	): Promise<DbApplicationVersion[]>

	insert(
		applicationVersions: DbApplicationVersion[],
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
	): Promise<DbApplicationVersion[]> {
		let sv: QAppVersion

		return await this.db.find.tree({
			FROM: [
				sv = Q.ApplicationVersion
			],
			SELECT: {},
			WHERE: AND(
				sv._localId.IN(this._localIdsForMaxVersionSelect()),
				sv.application.index.IN(applicationIndexes)
			)
		})
	}
	*/

	async findAllActiveOrderByApplication_IndexAndId(): Promise<DbApplicationVersion[]> {
		let av: QApplicationVersion,
			a: QApplication

		return await this.db.find.tree({
			FROM: [
				av = Q.ApplicationVersion,
				a = av.application.INNER_JOIN()
			],
			SELECT: {},
			ORDER_BY: [
				a.index.ASC(),
				av._localId.DESC()
			]
		})
	}

	async findByDomain_NamesAndApplication_Names(
		domainNames: Domain_Name[],
		applicationNames: Application_Name[]
	): Promise<DbApplicationVersion[]> {
		let av: QApplicationVersion
		let a: QApplication
		let d: QDomain

		return await this.db.find.tree({
			SELECT: {
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
			FROM: [
				av = Q.ApplicationVersion,
				a = av.application.INNER_JOIN(),
				d = a.domain.INNER_JOIN()
			],
			WHERE: AND(
				d.name.IN(domainNames),
				a.name.IN(applicationNames)
			),
			ORDER_BY: [
				d.name.DESC(),
				a.name.DESC()
			]
		})
	}

	/*
	async findMaxVersionedMapByApplicationAndDomain_Names(
		applicationDomain_Names: Domain_Name[],
		applicationNames: Application_Name[]
	): Promise<Map<Domain_Name, Map<Application_Name, DbApplicationVersion>>> {
		const maxVersionedMapByApplicationAndDomain_Names
				  : Map<Domain_Name, Map<Application_Name, DbApplicationVersion>>
				  = new Map()

		let sv: QAppVersion
		let s: QApp
		let d: QDomain

		const maxApplicationVersions: DbApplicationVersion[] = <any>await this.db.find.tree({
			SELECT: {
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
			FROM: [
				sv = Q.ApplicationVersion,
				s = sv.application.INNER_JOIN(),
				d = s.domain.INNER_JOIN()
			],
			WHERE: AND(
				sv._localId.IN(this._localIdsForMaxVersionSelect()),
				d.name.IN(applicationDomain_Names),
				s.name.IN(applicationNames)
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
		let sv2: QAppVersion

		return field({
			FROM: [
				svMax = tree({
					FROM: [
						sv2 = Q.ApplicationVersion
					],
					SELECT: DISTINCT({
						integerVersion: max(sv2.integerVersion),
						_localId: sv2._localId,
						applicationIndex: sv2.application.index
					})
				})
			],
			SELECT: svMax._localId
		})
	}
*/
	async insert(
		applicationVersions: DbApplicationVersion[],
		context: IContext
	): Promise<void> {
		let sv: QApplicationVersion;
		const VALUES = []
		for (const applicationVersion of applicationVersions) {
			VALUES.push([
				applicationVersion._localId, applicationVersion.integerVersion,
				applicationVersion.versionString, applicationVersion.majorVersion,
				applicationVersion.minorVersion, applicationVersion.patchVersion,
				applicationVersion.application.index, applicationVersion.jsonApplication
			])
		}
		await this.db.insertValuesGenerateIds({
			INSERT_INTO: sv = Q.ApplicationVersion,
			columns: [
				sv._localId,
				sv.integerVersion,
				sv.versionString,
				sv.majorVersion,
				sv.minorVersion,
				sv.patchVersion,
				sv.application.index,
				sv.jsonApplication
			],
			VALUES: VALUES
		}, context)
	}

}
