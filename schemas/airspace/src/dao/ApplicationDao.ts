import {
	AIRPORT_DATABASE,
	and,
	max,
	tree,
	Y
} from '@airport/air-control'
import { container, DI } from '@airport/di'
import {
	DomainName,
	ensureChildJsMap,
	JsonApplication,
	ApplicationIndex,
	ApplicationName,
	ApplicationStatus,
	ApplicationVersionId
} from '@airport/ground-control'
import { APPLICATION_DAO } from '../tokens'
import {
	BaseApplicationDao,
	IBaseApplicationDao,
	IApplication,
	Q,
	QDomain,
	QApplication,
	QApplicationVersion
} from '../generated/generated'

export interface IApplicationLookupRecord {
	index: number
	domain: {
		id: number
		name: string
	},
	jsonApplication: JsonApplication
	name: string
	majorVersion: number
	minorVersion: number
	patchVersion: number
}

export interface IApplicationDao
	extends IBaseApplicationDao {

	findAllActive(): Promise<IApplication[]>;

	findMapByVersionIds(
		applicationVersionIds: ApplicationVersionId[]
	): Promise<Map<ApplicationIndex, IApplication>>;

	findMaxVersionedMapByApplicationAndDomainNames(
		applicationDomainNames: DomainName[],
		applicationNames: ApplicationName[]
	): Promise<Map<DomainName, Map<ApplicationName, IApplicationLookupRecord>>>;

	setStatusByIndexes(
		indexes: ApplicationIndex[],
		status: ApplicationStatus
	): Promise<void>;

	findMapByNames(
		applicationNames: ApplicationName[]
	): Promise<Map<ApplicationName, IApplication>>

	findByDomainNamesAndApplicationNames(
		domainNames: string[],
		applicationNames: string[]
	): Promise<IApplication[]>

	findByIndex(
		index: ApplicationIndex
	): Promise<IApplication>

	insert(
		applications: IApplication[]
	): Promise<void>

}

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

	async findMapByVersionIds(
		applicationVersionIds: ApplicationVersionId[]
	): Promise<Map<ApplicationVersionId, IApplication>> {

		const applicationMapByIndex: Map<ApplicationVersionId, IApplication> = new Map()

		let s: QApplication,
			sv: QApplicationVersion
		const applications = await this.db.find.tree({
			select: {
				index: Y,
				domain: {
					id: Y,
					name: Y
				},
				name: Y,
				versions: {
					id: Y,
					majorVersion: Y,
					minorVersion: Y,
					patchVersion: Y
				}
			},
			from: [
				s = Q.Application,
				sv = s.versions.innerJoin()
			],
			where: sv.id.in(applicationVersionIds)
		})

		for (const application of applications) {
			for (const applicationVersion of application.versions) {
				applicationMapByIndex.set(applicationVersion.id, application)
			}
		}

		return applicationMapByIndex
	}

	async findMaxIndex(): Promise<ApplicationIndex> {
		const airDb = await container(this).get(AIRPORT_DATABASE)

		const s = Q.Application
		return await airDb.findOne.field({
			select: max(s.index),
			from: [
				s
			]
		})
	}

	async findMaxVersionedMapByApplicationAndDomainNames(
		applicationDomainNames: DomainName[],
		applicationNames: ApplicationName[]
	): Promise<Map<DomainName, Map<ApplicationName, IApplicationLookupRecord>>> {
		const airDb = await container(this).get(AIRPORT_DATABASE)

		const maxVersionedMapByApplicationAndDomainNames: Map<DomainName, Map<ApplicationName, IApplicationLookupRecord>>
			= new Map()

		let sv: QApplicationVersion
		let s: QApplication
		let d: QDomain
		let sMaV
		let sMiV

		const applicationLookupRecords = await airDb.find.tree({
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
								domainId: d.id,
								domainName: d.name,
								name: s.name,
								jsonApplication: s.jsonApplication,
								majorVersion: max(sv.majorVersion),
								minorVersion: sv.minorVersion,
								patchVersion: sv.patchVersion,
							},
							where: and(
								d.name.in(applicationDomainNames),
								s.name.in(applicationNames)
							),
							groupBy: [
								s.index,
								d.id,
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
						jsonApplication: sMaV.jsonApplication,
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
					id: sMiV.domainId,
					name: sMiV.domainName
				},
				jsonApplication: sMiV.jsonApplication,
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
				maxVersionedMapByApplicationAndDomainNames, applicationLookupRecord.domain.name)
				.set(applicationLookupRecord.name, applicationLookupRecord)
		}


		return maxVersionedMapByApplicationAndDomainNames
	}

	async setStatusByIndexes(
		indexes: ApplicationIndex[],
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

	async findMapByNames(
		applicationNames: ApplicationName[]
	): Promise<Map<ApplicationName, IApplication>> {
		const mapByName: Map<ApplicationName, IApplication> = new Map()

		let s: QApplication

		const records = await this.db.find.tree({
			select: {},
			from: [
				s = Q.Application
			],
			where: s.name.in(applicationNames)
		})

		for (const record of records) {
			mapByName.set(record.name, record)
		}

		return mapByName
	}

	async findByDomainNamesAndApplicationNames(
		domainNames: string[],
		applicationNames: string[]
	): Promise<IApplication[]> {
		let s: QApplication
		let d: QDomain

		return await this.db.find.tree({
			select: {
				index: Y,
				domain: {
					id: Y,
					name: Y
				},
				name: Y
			},
			from: [
				s = Q.Application,
				d = s.domain.innerJoin()
			],
			where: and(
				d.name.in(domainNames),
				s.name.in(applicationNames)
			),
			orderBy: [
				d.name.asc(),
				s.index.asc()
			]
		})
	}

	async findByIndex(
		index: ApplicationIndex
	): Promise<IApplication> {
		let a: QApplication;
		return await this.db.findOne.tree({
			select: {},
			from: [
				a = Q.Application
			],
			where: a.index.equals(index)
		})
	}

	async insert(
		applications: IApplication[]
	): Promise<void> {
		let a: QApplication;
		const values = []
		for (const application of applications) {
			values.push([
				application.index, application.domain.id, application.scope,
				application.name, application.packageName, application.status,
				application.signature, application.jsonApplication
			])
		}
		await this.db.insertValuesGenerateIds({
			insertInto: a = Q.Application,
			columns: [
				a.index,
				a.domain.id,
				a.scope,
				a.name,
				a.packageName,
				a.status,
				a.signature,
				a.jsonApplication
			],
			values
		})
	}
}

DI.set(APPLICATION_DAO, ApplicationDao)
