import {
	ALL_FIELDS,
	and,
	max,
	tree,
	Y
} from '@airport/tarmaq-query'
import { IContext, Injected } from '@airport/direction-indicator'
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

	async findAllActive()
		: Promise<IApplication[]> {
		let s: QApplication

		return this.db.find.tree({
			select: {},
			from: [
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
			select: {
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
			from: [
				a = Q.Application,
				// cv = a.currentVersion.innerJoin(),
				// av = cv.applicationVersion.innerJoin()
				av = a.versions.innerJoin()
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
			select: {
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
			from: [
				s = Q.Application,
				sv = s.versions.innerJoin()
			],
			where: sv._localId.in(applicationVersionIds)
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
			select: max(s.index),
			from: [
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
			from: [
				sMiV = tree({
					from: [
						sMaV = tree({
							from: [
								s = Q.Application,
								sv = s.versions.innerJoin(),
								d = s.domain.innerJoin()
							],
							select: {
								index: s.index,
								domainId: d._localId,
								domainName: d.name,
								name: s.name,
								majorVersion: max(sv.majorVersion),
								minorVersion: sv.minorVersion,
								patchVersion: sv.patchVersion,
							},
							where: and(
								d.name.in(applicationDomain_Names),
								s.name.in(applicationNames)
							),
							groupBy: [
								s.index,
								d._localId,
								d.name,
								s.name,
								sv.minorVersion,
								sv.patchVersion,
							]
						})],
					select: {
						index: sMaV.index,
						domainId: sMaV.domainId,
						domainName: sMaV.domainName,
						name: sMaV.name,
						majorVersion: sMaV.majorVersion,
						minorVersion: max(sMaV.minorVersion),
						patchVersion: sMaV.patchVersion,
					},
					groupBy: [
						sMaV.index,
						sMaV.domainId,
						sMaV.domainName,
						sMaV.name,
						sMaV.majorVersion,
						sMaV.patchVersion
					]
				})],
			select: {
				index: sMiV.index,
				domain: {
					_localId: sMiV.domainId,
					name: sMiV.domainName
				},
				name: sMiV.name,
				majorVersion: sMiV.majorVersion,
				minorVersion: sMiV.minorVersion,
				patchVersion: max(sMiV.patchVersion),
			},
			groupBy: [
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
			update: s = Q.Application,
			set: {
				status
			},
			where: s.index.in(indexes)
		})
	}

	async findMapByFullNames(
		fullApplication_Names: FullApplication_Name[]
	): Promise<Map<FullApplication_Name, IApplication>> {
		const mapByFullName: Map<FullApplication_Name, IApplication> = new Map()

		let s: QApplication

		const records = await this.db.find.tree({
			select: {},
			from: [
				s = Q.Application
			],
			where: s.fullName.in(fullApplication_Names)
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
			select: {
				index: Y,
				domain: {
					_localId: Y,
					name: Y
				},
				fullName: Y,
				name: Y
			},
			from: [
				s = Q.Application,
				d = s.domain.innerJoin()
			],
			where: and(
				d.name.in(domainNames),
				s.name.in(applicationNames)
			)
		})
	}

	async findByIndex(
		index: Application_Index
	): Promise<IApplication> {
		let a: QApplication;
		let d: QDomain;
		return await this.db.findOne.tree({
			select: {
				...ALL_FIELDS,
				domain: {}
			},
			from: [
				a = Q.Application,
				d = a.domain.innerJoin()
			],
			where: a.index.equals(index)
		})
	}

	async insert(
		applications: IApplication[],
		context: IContext
	): Promise<void> {
		let a: QApplication;
		const values = []
		for (const application of applications) {
			values.push([
				application.index, application.domain._localId, application.scope,
				application.fullName, application.name,
				// application.packageName,
				application.status, application.signature
			])
		}
		await this.db.insertValuesGenerateIds({
			insertInto: a = Q.Application,
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
			values
		}, context)
	}
}
