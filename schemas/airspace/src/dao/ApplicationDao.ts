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
	ensureChildJsMap,
	Application_Index,
	Application_Name,
	ApplicationStatus,
	ApplicationVersion_LocalId,
	FullApplication_Name
} from '@airport/ground-control'
import {
	BaseApplicationDao,
	IBaseApplicationDao,
	IApplication,
	Q,
	QDomain,
	QApplication,
	QApplicationCurrentVersion,
	QApplicationVersion
} from '../generated/generated'
import { IAirportDatabase } from '@airport/air-traffic-control'

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

export interface IApplicationDao
	extends IBaseApplicationDao {

	findAllActive(): Promise<IApplication[]>;

	findAllWithJson(): Promise<IApplication[]>;

	findMapByVersionIds(
		applicationVersionIds: ApplicationVersion_LocalId[]
	): Promise<Map<Application_Index, IApplication>>;

	findMaxVersionedMapByApplicationAndDomain_Names(
		applicationDomain_Names: Domain_Name[],
		applicationNames: Application_Name[]
	): Promise<Map<Domain_Name, Map<Application_Name, IApplicationLookupRecord>>>;

	setStatusByIndexes(
		indexes: Application_Index[],
		status: ApplicationStatus
	): Promise<void>;

	findMapByFullNames(
		fullApplication_Names: FullApplication_Name[]
	): Promise<Map<FullApplication_Name, IApplication>>

	findByDomain_NamesAndApplication_Names(
		domainNames: string[],
		applicationNames: string[]
	): Promise<IApplication[]>

	findByIndex(
		index: Application_Index
	): Promise<IApplication>

	insert(
		applications: IApplication[],
		context: IContext
	): Promise<void>

}

@Injected()
export class ApplicationDao
	extends BaseApplicationDao
	implements IApplicationDao {

	@Inject()
	airportDatabase: IAirportDatabase

	async findAllActive()
		: Promise<IApplication[]> {
		let s: QApplication

		return this.db.find.tree({
			SELECT: {},
			FROM: [
				s = Q.Application
			]
		})
	}

	async findAllWithJson()
		: Promise<IApplication[]> {
		let a: QApplication
		let av: QApplicationVersion
		// FIXME: this should be don through currentVersion - verify that it get's populated and switch
		let cv: QApplicationCurrentVersion

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
				a = Q.Application,
				// cv = a.currentVersion.INNER_JOIN(),
				// av = cv.applicationVersion.INNER_JOIN()
				av = a.versions.INNER_JOIN()
			]
		})
	}

	async findMapByVersionIds(
		applicationVersionIds: ApplicationVersion_LocalId[]
	): Promise<Map<ApplicationVersion_LocalId, IApplication>> {

		const applicationMapByIndex: Map<ApplicationVersion_LocalId, IApplication> = new Map()

		let s: QApplication,
			sv: QApplicationVersion
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
				s = Q.Application,
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

	async findMaxIndex(): Promise<Application_Index> {

		const s = Q.Application
		return await this.airportDatabase.findOne.field({
			SELECT: MAX(s.index),
			FROM: [
				s
			]
		})
	}

	async findMaxVersionedMapByApplicationAndDomain_Names(
		applicationDomain_Names: Domain_Name[],
		applicationNames: Application_Name[]
	): Promise<Map<Domain_Name, Map<Application_Name, IApplicationLookupRecord>>> {

		const maxVersionedMapByApplicationAndDomain_Names: Map<Domain_Name, Map<Application_Name, IApplicationLookupRecord>>
			= new Map()

		let sv: QApplicationVersion
		let s: QApplication
		let d: QDomain
		let sMaV
		let sMiV

		const applicationLookupRecords = await this.airportDatabase.find.tree({
			FROM: [
				sMiV = tree({
					FROM: [
						sMaV = tree({
							FROM: [
								s = Q.Application,
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
			ensureChildJsMap(
				maxVersionedMapByApplicationAndDomain_Names, applicationLookupRecord.domain.name)
				.set(applicationLookupRecord.name, applicationLookupRecord)
		}


		return maxVersionedMapByApplicationAndDomain_Names
	}

	async setStatusByIndexes(
		indexes: Application_Index[],
		status: ApplicationStatus
	): Promise<void> {
		let s: QApplication
		await this.db.updateWhere({
			UPDATE: s = Q.Application,
			SET: {
				status
			},
			WHERE: s.index.IN(indexes)
		})
	}

	async findMapByFullNames(
		fullApplication_Names: FullApplication_Name[]
	): Promise<Map<FullApplication_Name, IApplication>> {
		const mapByFullName: Map<FullApplication_Name, IApplication> = new Map()

		let s: QApplication

		const records = await this.db.find.tree({
			SELECT: {},
			FROM: [
				s = Q.Application
			],
			WHERE: s.fullName.IN(fullApplication_Names)
		})

		for (const record of records) {
			mapByFullName.set(record.fullName, record)
		}

		return mapByFullName
	}

	async findByDomain_NamesAndApplication_Names(
		domainNames: string[],
		applicationNames: string[]
	): Promise<IApplication[]> {
		let s: QApplication
		let d: QDomain

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
				s = Q.Application,
				d = s.domain.INNER_JOIN()
			],
			WHERE: AND(
				d.name.IN(domainNames),
				s.name.IN(applicationNames)
			)
		})
	}

	async findByIndex(
		index: Application_Index
	): Promise<IApplication> {
		let a: QApplication;
		let d: QDomain;
		return await this.db.findOne.tree({
			SELECT: {
				...ALL_FIELDS,
				domain: {}
			},
			FROM: [
				a = Q.Application,
				d = a.domain.INNER_JOIN()
			],
			WHERE: a.index.equals(index)
		})
	}

	async insert(
		applications: IApplication[],
		context: IContext
	): Promise<void> {
		let a: QApplication;
		const VALUES = []
		for (const application of applications) {
			VALUES.push([
				application.index, application.domain._localId, application.scope,
				application.fullName, application.name,
				// application.packageName,
				application.status, application.signature
			])
		}
		await this.db.insertValuesGenerateIds({
			INSERT_INTO: a = Q.Application,
			columns: [
				a.index,
				a.domain._localId,
				a.scope,
				a.fullName,
				a.name,
				// a.packageName,
				a.status,
				a.signature
			],
			VALUES
		}, context)
	}
}
