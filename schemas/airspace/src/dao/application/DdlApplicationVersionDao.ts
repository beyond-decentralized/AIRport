import { AND, Y } from '@airport/tarmaq-query'
import { IContext, Injected } from '@airport/direction-indicator'
import { Application_Name, IApplicationVersion, Domain_Name } from '@airport/ground-control'
import { BaseDdlApplicationVersionDao, IBaseDdlApplicationVersionDao } from '../../generated/baseDaos'
import { QDdlApplication, QDdlApplicationVersion, QDdlDomain } from '../../generated/qInterfaces'
import Q_airport____at_airport_slash_airspace from '../../generated/qApplication'

export interface IDdlApplicationVersionDao
	extends IBaseDdlApplicationVersionDao {

	findAllActiveOrderByApplication_IndexAndId(
		context: IContext
	): Promise<IApplicationVersion[]>

	findByDomain_NamesAndApplication_Names(
		domainNames: string[],
		applicationNames: string[],
		context: IContext
	): Promise<IApplicationVersion[]>

	insert(
		applicationVersions: IApplicationVersion[],
		context: IContext
	): Promise<void>

}

@Injected()
export class DdlApplicationVersionDao
	extends BaseDdlApplicationVersionDao
	implements IDdlApplicationVersionDao {

	/*
	async findAllLatestForApplication_Indexes(
		applicationIndexes: Application_Index[],
		context: IContext
	): Promise<IApplicationVersion[]> {
		let sv: QAppVersion

		return await this.db.find.tree({
			FROM: [
				sv = Q.IApplicationVersion
			],
			SELECT: {},
			WHERE: AND(
				sv._localId.IN(this._localIdsForMaxVersionSelect()),
				sv.application.index.IN(applicationIndexes)
			)
		}, context)
	}
	*/

	async findAllActiveOrderByApplication_IndexAndId(
		context: IContext
	): Promise<IApplicationVersion[]> {
		let av: QDdlApplicationVersion,
			a: QDdlApplication

		return await this.db.find.tree({
			FROM: [
				av = Q_airport____at_airport_slash_airspace.DdlApplicationVersion,
				a = av.application.INNER_JOIN()
			],
			SELECT: {},
			ORDER_BY: [
				a.index.ASC(),
				av._localId.DESC()
			]
		}, context)
	}

	async findByDomain_NamesAndApplication_Names(
		domainNames: Domain_Name[],
		applicationNames: Application_Name[],
		context: IContext
	): Promise<IApplicationVersion[]> {
		let av: QDdlApplicationVersion
		let a: QDdlApplication
		let d: QDdlDomain

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
				av = Q_airport____at_airport_slash_airspace.DdlApplicationVersion,
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
		}, context)
	}

	/*
	async findMaxVersionedMapByApplicationAndDomain_Names(
		applicationDomain_Names: Domain_Name[],
		applicationNames: Application_Name[],
		context: IContext
	): Promise<Map<Domain_Name, Map<Application_Name, IApplicationVersion>>> {
		const maxVersionedMapByApplicationAndDomain_Names
				  : Map<Domain_Name, Map<Application_Name, IApplicationVersion>>
				  = new Map()

		let sv: QAppVersion
		let s: QApp
		let d: QDdlDomain

		const maxApplicationVersions: IApplicationVersion[] = <any>await this.db.find.tree({
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
				sv = Q.IApplicationVersion,
				s = sv.application.INNER_JOIN(),
				d = s.domain.INNER_JOIN()
			],
			WHERE: AND(
				sv._localId.IN(this._localIdsForMaxVersionSelect()),
				d.name.IN(applicationDomain_Names),
				s.name.IN(applicationNames)
			),
		}, context)

		for (const maxApplicationVersion of maxApplicationVersions) {
			const application = maxApplicationVersion.application
			this.utils.ensureChildJsMap(
				maxVersionedMapByApplicationAndDomain_Names, application.domain.name)
				.set(application.name, maxApplicationVersion)
		}


		return maxVersionedMapByApplicationAndDomain_Names
	}

	private idsForMaxVersionSelect(
		context: IContext
	): RawFieldQuery<IQNumberField> {
		let svMax
		let sv2: QAppVersion

		return field({
			FROM: [
				svMax = tree({
					FROM: [
						sv2 = Q.IApplicationVersion
					],
					SELECT: DISTINCT({
						integerVersion: max(sv2.integerVersion),
						_localId: sv2._localId,
						applicationIndex: sv2.application.index
					})
				})
			],
			SELECT: svMax._localId
		}, context)
	}
*/
	async insert(
		applicationVersions: IApplicationVersion[],
		context: IContext
	): Promise<void> {
		let sv: QDdlApplicationVersion;
		const VALUES = []
		for (const applicationVersion of applicationVersions) {
			VALUES.push([
				applicationVersion._localId, applicationVersion.integerVersion,
				applicationVersion.versionString, applicationVersion.majorVersion,
				applicationVersion.minorVersion, applicationVersion.patchVersion,
				applicationVersion.application.index, applicationVersion.jsonApplication,
				applicationVersion.signature
			])
		}
		await this.db.insertValuesGenerateIds({
			INSERT_INTO: sv = Q_airport____at_airport_slash_airspace.DdlApplicationVersion,
			columns: [
				sv._localId,
				sv.integerVersion,
				sv.versionString,
				sv.majorVersion,
				sv.minorVersion,
				sv.patchVersion,
				sv.application.index,
				sv.jsonApplication,
				sv.signature
			],
			VALUES: VALUES
		}, context)
	}

}
