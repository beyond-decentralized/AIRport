import { IContext, Injected } from '@airport/direction-indicator'
import {
	DbDomain,
	DbDomain_LocalId,
	DbDomain_Name
} from '@airport/ground-control'
import { BaseDdlDomainDao, IBaseDdlDomainDao } from '../generated/baseDaos'
import Q_airport____at_airport_slash_airspace from '../generated/qApplication'
import { QDdlDomain } from '../generated/qInterfaces'

export interface IDbDomainDao
	extends IBaseDdlDomainDao {

	findByIdIn(
		domainIds: DbDomain_LocalId[],
		context: IContext
	): Promise<DbDomain[]>

	findMapByNameWithNames(
		domainNames: DbDomain_Name[],
		context: IContext
	): Promise<Map<DbDomain_Name, DbDomain>>

	findOneByName(
		domainName: DbDomain_Name,
		context: IContext
	): Promise<DbDomain>

	findByNames(
		domainNames: DbDomain_Name[],
		context: IContext
	): Promise<DbDomain[]>

	findByName(
		domainName: DbDomain_Name,
		context: IContext
	): Promise<DbDomain>

	checkAndInsertIfNeeded(
		domains: DbDomain[],
		context: IContext
	): Promise<void>

	insert(
		domains: DbDomain[],
		context: IContext
	): Promise<void>

}

@Injected()
export class DbDomainDao
	extends BaseDdlDomainDao
	implements IDbDomainDao {

	async findByIdIn(
		domainIds: DbDomain_LocalId[],
		context: IContext
	): Promise<DbDomain[]> {
		let d: QDdlDomain

		return await this.db.find.tree({
			SELECT: {},
			FROM: [
				d = Q_airport____at_airport_slash_airspace.DdlDomain
			],
			WHERE: d._localId.IN(domainIds)
		}, context)
	}

	async findMapByNameWithNames(
		domainNames: DbDomain_Name[],
		context: IContext
	): Promise<Map<DbDomain_Name, DbDomain>> {
		let d: QDdlDomain
		const domains = await this.db.find.tree({
			SELECT: {},
			FROM: [d = Q_airport____at_airport_slash_airspace.DdlDomain],
			WHERE: d.name.IN(domainNames)
		}, context)

		const domainMapByNameWithNames: Map<DbDomain_Name, DbDomain> = new Map()

		for (const domain of domains) {
			domainMapByNameWithNames.set(domain.name, domain)
		}

		return domainMapByNameWithNames
	}

	async findOneByName(
		name: DbDomain_Name,
		context: IContext
	): Promise<DbDomain> {
		let d: QDdlDomain
		return await this.db.findOne.tree({
			SELECT: {},
			FROM: [d = Q_airport____at_airport_slash_airspace.DdlDomain],
			WHERE: d.name.equals(name)
		}, context)
	}

	async findByNames(
		names: DbDomain_Name[],
		context: IContext
	): Promise<DbDomain[]> {
		let d: QDdlDomain
		return await this.db.find.tree({
			SELECT: {},
			FROM: [d = Q_airport____at_airport_slash_airspace.DdlDomain],
			WHERE: d.name.IN(names)
		}, context)
	}

	async findByName(
		name: DbDomain_Name,
		context: IContext
	): Promise<DbDomain> {
		let d: QDdlDomain
		return await this.db.findOne.tree({
			SELECT: {},
			FROM: [d = Q_airport____at_airport_slash_airspace.DdlDomain],
			WHERE: d.name.equals(name)
		}, context)
	}

	async checkAndInsertIfNeeded(
		domains: DbDomain[],
		context: IContext
	): Promise<void> {
		const existingDomains = await this.findByIdIn(
			domains.map(domain => domain._localId),
			context)
		const existingDomainMap: Map<DbDomain_LocalId, DbDomain> = new Map()
		for (const existingDomain of existingDomains) {
			existingDomainMap.set(existingDomain._localId, existingDomain)
		}
		const newDomains: DbDomain[] = []
		for (const domain of domains) {
			if (!existingDomainMap.has(domain._localId)) {
				newDomains.push(domain)
			}
		}
		if (!newDomains.length) {
			return
		}
		let d: QDdlDomain;
		const VALUES = []
		for (const domain of newDomains) {
			VALUES.push([
				domain._localId, domain.name
			])
		}
		await this.db.insertValuesGenerateIds({
			INSERT_INTO: d = Q_airport____at_airport_slash_airspace.DdlDomain,
			columns: [
				d._localId,
				d.name,
			],
			VALUES
		}, context)
	}

	async insert(
		domains: DbDomain[],
		context: IContext
	): Promise<void> {
		let d: QDdlDomain;
		const VALUES = []
		for (const domain of domains) {
			VALUES.push([
				domain.name
			])
		}
		const ids = await this.db.insertValuesGenerateIds({
			INSERT_INTO: d = Q_airport____at_airport_slash_airspace.DdlDomain,
			columns: [
				d.name
			],
			VALUES
		}, context)
		for (let i = 0; i < domains.length; i++) {
			let domain = domains[i]
			domain._localId = ids[i][0]
		}
	}

}
