import {
	ALL_FIELDS,
	AND,
	MAX,
	tree,
	Y
} from '@airport/tarmaq-query'
import { IContext, Inject, Injected } from '@airport/direction-indicator'
import {
	DbDomain_Name,
	DbApplication_Index,
	DbApplication_Name,
	ApplicationStatus,
	DbApplicationVersion_LocalId,
	DbApplication_FullName,
	IDatastructureUtils,
	DbApplication
} from '@airport/ground-control'
import { IAirportDatabase } from '@airport/air-traffic-control'
import { DdlApplication } from '../ddl/application/DdlApplication'
import { BaseDdlApplicationDao, IBaseDdlApplicationDao } from '../generated/baseDaos'
import { QDdlApplication, QDdlApplicationCurrentVersion, QDdlApplicationVersion, QDdlDomain } from '../generated/qInterfaces'
import Q_airport____at_airport_slash_airspace from '../generated/qApplication'

export interface DbApplicationLookupRecord {
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

export interface IDbApplicationDao
	extends IBaseDdlApplicationDao {

	findAllActive(): Promise<DbApplication[]>;

	findAllWithJson(): Promise<DbApplication[]>;

	findMapByVersionIds(
		applicationVersionIds: DbApplicationVersion_LocalId[]
	): Promise<Map<DbApplication_Index, DbApplication>>;

	findMaxVersionedMapByApplicationAndDomain_Names(
		applicationDomain_Names: DbDomain_Name[],
		applicationNames: DbApplication_Name[]
	): Promise<Map<DbDomain_Name, Map<DbApplication_Name, DbApplicationLookupRecord>>>;

	setStatusByIndexes(
		indexes: DbApplication_Index[],
		status: ApplicationStatus
	): Promise<void>;

	findMapByFullNames(
		fullDbApplication_Names: DbApplication_FullName[]
	): Promise<Map<DbApplication_FullName, DbApplication>>

	findByDomain_NamesAndDbApplication_Names(
		domainNames: string[],
		applicationNames: string[]
	): Promise<DbApplication[]>

	findOneByDomain_NameAndDbApplication_Name(
		domainName: string,
		applicationName: string
	): Promise<DbApplication>

	findByIndex(
		index: DbApplication_Index
	): Promise<DbApplication>

	insert(
		applications: DbApplication[],
		context: IContext
	): Promise<void>

}

@Injected()
export class DbApplicationDao
	extends BaseDdlApplicationDao
	implements IDbApplicationDao {

	@Inject()
	airportDatabase: IAirportDatabase

	@Inject()
	datastructureUtils: IDatastructureUtils

	async findAllActive()
		: Promise<DbApplication[]> {
		let s: QDdlApplication

		return this.db.find.tree({
			SELECT: {},
			FROM: [
				s = Q_airport____at_airport_slash_airspace.Application
			]
		})
	}

	async findAllWithJson()
		: Promise<DbApplication[]> {
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
				a = Q_airport____at_airport_slash_airspace.Application,
				// cv = a.currentVersion.INNER_JOIN(),
				// av = cv.applicationVersion.INNER_JOIN()
				av = a.versions.INNER_JOIN()
			]
		})
	}

	async findMapByVersionIds(
		applicationVersionIds: DbApplicationVersion_LocalId[]
	): Promise<Map<DbApplicationVersion_LocalId, DbApplication>> {

		const applicationMapByIndex: Map<DbApplicationVersion_LocalId, DbApplication> = new Map()

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
				s = Q_airport____at_airport_slash_airspace.Application,
				sv = s.versions.INNER_JOIN()
			],
			WHERE: sv._localId.IN(applicationVersionIds)
		})

		for (const application of applications) {
			for (const applicationVersion of application.versions) {
				applicationMapByIndex.set(applicationVersion._localId, application)
			}
		}

		return applicationMapByIndex
	}

	async findMaxIndex(): Promise<DbApplication_Index> {

		const s = Q_airport____at_airport_slash_airspace.Application
		return await this.airportDatabase.findOne.field({
			SELECT: MAX(s.index),
			FROM: [
				s
			]
		})
	}

	async findMaxVersionedMapByApplicationAndDomain_Names(
		applicationDomain_Names: DbDomain_Name[],
		applicationNames: DbApplication_Name[]
	): Promise<Map<DbDomain_Name, Map<DbApplication_Name, DbApplicationLookupRecord>>> {

		const maxVersionedMapByApplicationAndDomain_Names: Map<DbDomain_Name, Map<DbApplication_Name, DbApplicationLookupRecord>>
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
								s = Q_airport____at_airport_slash_airspace.Application,
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
		})

		for (const applicationLookupRecord of applicationLookupRecords) {
			this.datastructureUtils.ensureChildJsMap(
				maxVersionedMapByApplicationAndDomain_Names, applicationLookupRecord.domain.name)
				.set(applicationLookupRecord.name, applicationLookupRecord)
		}


		return maxVersionedMapByApplicationAndDomain_Names
	}

	async setStatusByIndexes(
		indexes: DbApplication_Index[],
		status: ApplicationStatus
	): Promise<void> {
		let s: QDdlApplication
		await this.db.updateWhere({
			UPDATE: s = Q_airport____at_airport_slash_airspace.Application,
			SET: {
				status
			},
			WHERE: s.index.IN(indexes)
		})
	}

	async findMapByFullNames(
		fullDbApplication_Names: DbApplication_FullName[]
	): Promise<Map<DbApplication_FullName, DbApplication>> {
		const mapByFullName: Map<DbApplication_FullName, DbApplication> = new Map()

		let s: QDdlApplication

		const records = await this.db.find.tree({
			SELECT: {},
			FROM: [
				s = Q_airport____at_airport_slash_airspace.Application
			],
			WHERE: s.fullName.IN(fullDbApplication_Names)
		})

		for (const record of records) {
			mapByFullName.set(record.fullName, record)
		}

		return mapByFullName
	}

	async findByDomain_NamesAndDbApplication_Names(
		domainNames: string[],
		applicationNames: string[]
	): Promise<DbApplication[]> {
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
				s = Q_airport____at_airport_slash_airspace.Application,
				d = s.domain.INNER_JOIN()
			],
			WHERE: AND(
				d.name.IN(domainNames),
				s.name.IN(applicationNames)
			)
		})
	}

	async findOneByDomain_NameAndDbApplication_Name(
		domainName: string,
		applicationName: string
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
				s = Q_airport____at_airport_slash_airspace.Application,
				d = s.domain.INNER_JOIN()
			],
			WHERE: AND(
				d.name.equals(domainName),
				s.name.equals(applicationName)
			)
		})
	}

	async findByIndex(
		index: DbApplication_Index
	): Promise<DbApplication> {
		let a: QDdlApplication;
		let d: QDdlDomain;
		return await this.db.findOne.tree({
			SELECT: {
				...ALL_FIELDS,
				domain: {}
			},
			FROM: [
				a = Q_airport____at_airport_slash_airspace.Application,
				d = a.domain.INNER_JOIN()
			],
			WHERE: a.index.equals(index)
		})
	}

	async insert(
		applications: DbApplication[],
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
			INSERT_INTO: a = Q_airport____at_airport_slash_airspace.Application,
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
