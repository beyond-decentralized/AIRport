import {
	ALL_FIELDS,
	AND,
	MAX,
	tree,
	Y
} from '@airport/tarmaq-query'
import { IContext, Inject, Injected } from '@airport/direction-indicator'
import {
	Domain_Name,
	Application_Index,
	Application_Name,
	ApplicationStatus,
	ApplicationVersion_LocalId,
	Application_FullName,
	IDatastructureUtils,
	IApplication
} from '@airport/ground-control'
import { IAirportDatabase } from '@airport/air-traffic-control'
import { DdlApplication } from '../../ddl/application/DdlApplication'
import { BaseDdlApplicationDao, IBaseDdlApplicationDao } from '../../generated/baseDaos'
import { QDdlApplication, QDdlApplicationCurrentVersion, QDdlApplicationVersion, QDdlDomain } from '../../generated/qInterfaces'
import Q_airport____at_airport_slash_airspace from '../../generated/qApplication'

export interface IApplicationLookupRecord {
	index: number
	domain: {
		_localId: number
		name: string
	},
	name: string
	majorVersion: number
	minorVersion: number
	patchVersion: number
}

export interface IDdlApplicationDao
	extends IBaseDdlApplicationDao {

	findAllActive(
		context: IContext
	): Promise<IApplication[]>;

	findAllWithJson(
		context: IContext
	): Promise<IApplication[]>;

	findMapByVersionIds(
		applicationVersionIds: ApplicationVersion_LocalId[],
		context: IContext
	): Promise<Map<Application_Index, IApplication>>;

	findMaxVersionedMapByApplicationAndDomain_Names(
		applicationDomain_Names: Domain_Name[],
		applicationNames: Application_Name[],
		context: IContext
	): Promise<Map<Domain_Name, Map<Application_Name, IApplicationLookupRecord>>>;

	setStatusByIndexes(
		indexes: Application_Index[],
		status: ApplicationStatus,
		context: IContext
	): Promise<void>;

	findMapByFullNames(
		fullApplication_Names: Application_FullName[],
		context: IContext
	): Promise<Map<Application_FullName, IApplication>>

	findByDomain_NamesAndApplication_Names(
		domainNames: string[],
		applicationNames: string[],
		context: IContext
	): Promise<IApplication[]>

	findOneByDomain_NameAndApplication_Name(
		domainName: string,
		applicationName: string,
		context: IContext
	): Promise<IApplication>

	findByIndex(
		index: Application_Index,
		context: IContext
	): Promise<IApplication>

	insert(
		applications: IApplication[],
		context: IContext
	): Promise<void>

}

@Injected()
export class DdlApplicationDao
	extends BaseDdlApplicationDao
	implements IDdlApplicationDao {

	@Inject()
	airportDatabase: IAirportDatabase

	@Inject()
	datastructureUtils: IDatastructureUtils

	async findAllActive(
		context: IContext
	)
		: Promise<IApplication[]> {
		let s: QDdlApplication

		return this.db.find.tree({
			SELECT: {},
			FROM: [
				s = Q_airport____at_airport_slash_airspace.DdlApplication
			]
		}, context)
	}

	async findAllWithJson(
		context: IContext
	)
		: Promise<IApplication[]> {
		let a: QDdlApplication
		let av: QDdlApplicationVersion
		// FIXME: this should be don through currentVersion - verify that it get's populated and switch
		let cv: QDdlApplicationCurrentVersion

		return this.db.find.tree({
			SELECT: {
				...ALL_FIELDS,
				// currentVersion: {
				// 	applicationVersion: {
				// 		_localId: Y,
				// 		jsonApplication: Y
				// 	}
				// }
				versions: {
					_localId: Y,
					jsonApplication: Y
				}
			},
			FROM: [
				a = Q_airport____at_airport_slash_airspace.DdlApplication,
				// cv = a.currentVersion.INNER_JOIN(),
				// av = cv.applicationVersion.INNER_JOIN()
				av = a.versions.INNER_JOIN()
			]
		}, context)
	}

	async findMapByVersionIds(
		applicationVersionIds: ApplicationVersion_LocalId[],
		context: IContext
	): Promise<Map<ApplicationVersion_LocalId, IApplication>> {

		const applicationMapByIndex: Map<ApplicationVersion_LocalId, IApplication> = new Map()

		let s: QDdlApplication,
			sv: QDdlApplicationVersion
		const applications = await this.db.find.tree({
			SELECT: {
				index: Y,
				domain: {
					_localId: Y,
					name: Y
				},
				name: Y,
				fullName: Y,
				versions: {
					_localId: Y,
					majorVersion: Y,
					minorVersion: Y,
					patchVersion: Y
				}
			},
			FROM: [
				s = Q_airport____at_airport_slash_airspace.DdlApplication,
				sv = s.versions.INNER_JOIN()
			],
			WHERE: sv._localId.IN(applicationVersionIds)
		}, context)

		for (const application of applications) {
			for (const applicationVersion of application.versions) {
				applicationMapByIndex.set(applicationVersion._localId, application)
			}
		}

		return applicationMapByIndex
	}

	async findMaxIndex(
		context: IContext
	): Promise<Application_Index> {

		const s = Q_airport____at_airport_slash_airspace.DdlApplication
		return await this.airportDatabase.findOne.field({
			SELECT: MAX(s.index),
			FROM: [
				s
			]
		}, context)
	}

	async findMaxVersionedMapByApplicationAndDomain_Names(
		applicationDomain_Names: Domain_Name[],
		applicationNames: Application_Name[],
		context: IContext
	): Promise<Map<Domain_Name, Map<Application_Name, IApplicationLookupRecord>>> {

		const maxVersionedMapByApplicationAndDomain_Names: Map<Domain_Name, Map<Application_Name, IApplicationLookupRecord>>
			= new Map()

		let sv: QDdlApplicationVersion
		let s: QDdlApplication
		let d: QDdlDomain
		let sMaV
		let sMiV

		const applicationLookupRecords = await this.airportDatabase.find.tree({
			FROM: [
				sMiV = tree({
					FROM: [
						sMaV = tree({
							FROM: [
								s = Q_airport____at_airport_slash_airspace.DdlApplication,
								sv = s.versions.INNER_JOIN(),
								d = s.domain.INNER_JOIN()
							],
							SELECT: {
								index: s.index,
								domainId: d._localId,
								domainName: d.name,
								name: s.name,
								majorVersion: MAX(sv.majorVersion),
								minorVersion: sv.minorVersion,
								patchVersion: sv.patchVersion,
							},
							WHERE: AND(
								d.name.IN(applicationDomain_Names),
								s.name.IN(applicationNames)
							),
							GROUP_BY: [
								s.index,
								d._localId,
								d.name,
								s.name,
								sv.minorVersion,
								sv.patchVersion,
							]
						})],
					SELECT: {
						index: sMaV.index,
						domainId: sMaV.domainId,
						domainName: sMaV.domainName,
						name: sMaV.name,
						majorVersion: sMaV.majorVersion,
						minorVersion: MAX(sMaV.minorVersion),
						patchVersion: sMaV.patchVersion,
					},
					GROUP_BY: [
						sMaV.index,
						sMaV.domainId,
						sMaV.domainName,
						sMaV.name,
						sMaV.majorVersion,
						sMaV.patchVersion
					]
				})],
			SELECT: {
				index: sMiV.index,
				domain: {
					_localId: sMiV.domainId,
					name: sMiV.domainName
				},
				name: sMiV.name,
				majorVersion: sMiV.majorVersion,
				minorVersion: sMiV.minorVersion,
				patchVersion: MAX(sMiV.patchVersion),
			},
			GROUP_BY: [
				sMiV.index,
				sMiV.domainId,
				sMiV.domainName,
				sMiV.name,
				sMiV.majorVersion,
				sMiV.minorVersion
			]
		}, context)

		for (const applicationLookupRecord of applicationLookupRecords) {
			this.datastructureUtils.ensureChildJsMap(
				maxVersionedMapByApplicationAndDomain_Names, applicationLookupRecord.domain.name)
				.set(applicationLookupRecord.name, applicationLookupRecord)
		}


		return maxVersionedMapByApplicationAndDomain_Names
	}

	async setStatusByIndexes(
		indexes: Application_Index[],
		status: ApplicationStatus,
		context: IContext
	): Promise<void> {
		let s: QDdlApplication
		await this.db.updateWhere({
			UPDATE: s = Q_airport____at_airport_slash_airspace.DdlApplication,
			SET: {
				status
			},
			WHERE: s.index.IN(indexes)
		}, context)
	}

	async findMapByFullNames(
		fullApplication_Names: Application_FullName[],
		context: IContext
	): Promise<Map<Application_FullName, IApplication>> {
		const mapByFullName: Map<Application_FullName, IApplication> = new Map()

		let s: QDdlApplication

		const records = await this.db.find.tree({
			SELECT: {},
			FROM: [
				s = Q_airport____at_airport_slash_airspace.DdlApplication
			],
			WHERE: s.fullName.IN(fullApplication_Names)
		}, context)

		for (const record of records) {
			mapByFullName.set(record.fullName, record)
		}

		return mapByFullName
	}

	async findByDomain_NamesAndApplication_Names(
		domainNames: string[],
		applicationNames: string[],
		context: IContext
	): Promise<IApplication[]> {
		let s: QDdlApplication
		let d: QDdlDomain

		return await this.db.find.tree({
			SELECT: {
				index: Y,
				domain: {
					_localId: Y,
					name: Y
				},
				fullName: Y,
				name: Y
			},
			FROM: [
				s = Q_airport____at_airport_slash_airspace.DdlApplication,
				d = s.domain.INNER_JOIN()
			],
			WHERE: AND(
				d.name.IN(domainNames),
				s.name.IN(applicationNames)
			)
		}, context)
	}

	async findOneByDomain_NameAndApplication_Name(
		domainName: string,
		applicationName: string,
		context: IContext
	): Promise<DdlApplication> {
		let s: QDdlApplication
		let d: QDdlDomain

		return await this.db.findOne.tree({
			SELECT: {
				domain: {
					name: Y
				},
				fullName: Y,
				index: Y,
				name: Y
			},
			FROM: [
				s = Q_airport____at_airport_slash_airspace.DdlApplication,
				d = s.domain.INNER_JOIN()
			],
			WHERE: AND(
				d.name.equals(domainName),
				s.name.equals(applicationName)
			)
		}, context)
	}

	async findByIndex(
		index: Application_Index,
		context: IContext
	): Promise<IApplication> {
		let a: QDdlApplication;
		let d: QDdlDomain;
		return await this.db.findOne.tree({
			SELECT: {
				...ALL_FIELDS,
				domain: {}
			},
			FROM: [
				a = Q_airport____at_airport_slash_airspace.DdlApplication,
				d = a.domain.INNER_JOIN()
			],
			WHERE: a.index.equals(index)
		}, context)
	}

	async insert(
		applications: IApplication[],
		context: IContext
	): Promise<void> {
		let a: QDdlApplication;
		const VALUES = []
		for (const application of applications) {
			VALUES.push([
				application.index, application.domain._localId, application.scope,
				application.fullName, application.name,
				// application.packageName,
				application.status, application.publicSigningKey
			])
		}
		await this.db.insertValuesGenerateIds({
			INSERT_INTO: a = Q_airport____at_airport_slash_airspace.DdlApplication,
			columns: [
				a.index,
				a.domain._localId,
				a.scope,
				a.fullName,
				a.name,
				// a.packageName,
				a.status,
				a.publicSigningKey
			],
			VALUES
		}, context)
	}
}
