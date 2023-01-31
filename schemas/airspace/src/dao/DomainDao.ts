import { IContext, Injected } from '@airport/direction-indicator'
import {
	DbDomain,
	DbDomain_LocalId,
	DbDomain_Name
} from '@airport/ground-control'
import {
	BaseDdlDomainDao,
	IBaseDdlDomainDao,
	QDdlDomain
} from '../generated/generated'
import Q from '../generated/qApplication'

export interface IDomainDao
	extends IBaseDdlDomainDao {

	findByIdIn(
		domainIds: DbDomain_LocalId[]
	): Promise<DbDomain[]>

	findMapByNameWithNames(
		domainNames: DbDomain_Name[]
	): Promise<Map<DbDomain_Name, DbDomain>>

	findOneByName(
		domainName: DbDomain_Name
	): Promise<DbDomain>

	findByNames(
		domainNames: DbDomain_Name[]
	): Promise<DbDomain[]>

	findByName(
		domainName: DbDomain_Name
	): Promise<DbDomain>

	checkAndInsertIfNeeded(
		domains: DbDomain[],
		context: IContext
	): Promise<void>

	insert(
		domains: DbDomain[]
	): Promise<void>

}

@Injected()
export class DomainDao
	extends BaseDdlDomainDao
	implements IDomainDao {

	async findByIdIn(
		domainIds: DbDomain_LocalId[]
	): Promise<DbDomain[]> {
		let d: QDdlDomain

		return await this.db.find.tree({
			SELECT: {},
			FROM: [
				d = Q.Domain
			],
			WHERE: d._localId.IN(domainIds)
		})
	}

	async findMapByNameWithNames(
		domainNames: DbDomain_Name[]
	): Promise<Map<DbDomain_Name, DbDomain>> {
		let d: QDdlDomain
		const domains = await this.db.find.tree({
			SELECT: {},
			FROM: [d = Q.Domain],
			WHERE: d.name.IN(domainNames)
		})

		const domainMapByNameWithNames: Map<DbDomain_Name, DbDomain> = new Map()

		for (const domain of domains) {
			domainMapByNameWithNames.set(domain.name, domain)
		}

		return domainMapByNameWithNames
	}

	async findOneByName(
		name: DbDomain_Name
	): Promise<DbDomain> {
		let d: QDdlDomain
		return await this.db.findOne.tree({
			SELECT: {},
			FROM: [d = Q.Domain],
			WHERE: d.name.equals(name)
		})
	}

	async findByNames(
		names: DbDomain_Name[]
	): Promise<DbDomain[]> {
		let d: QDdlDomain
		return await this.db.find.tree({
			SELECT: {},
			FROM: [d = Q.Domain],
			WHERE: d.name.IN(names)
		})
	}

	async findByName(
		name: DbDomain_Name
	): Promise<DbDomain> {
		let d: QDdlDomain
		return await this.db.findOne.tree({
			SELECT: {},
			FROM: [d = Q.Domain],
			WHERE: d.name.equals(name)
		})
	}

	async checkAndInsertIfNeeded(
		domains: DbDomain[],
		context: IContext
	): Promise<void> {
		const existingDomains = await this.findByIdIn(domains.map(domain => domain._localId))
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
			INSERT_INTO: d = Q.Domain,
			columns: [
				d._localId,
				d.name,
			],
			VALUES
		}, context)
	}

	async insert(
		domains: DbDomain[]
	): Promise<void> {
		let d: QDdlDomain;
		const VALUES = []
		for (const domain of domains) {
			VALUES.push([
				domain.name
			])
		}
		const ids = await this.db.insertValuesGenerateIds({
			INSERT_INTO: d = Q.Domain,
			columns: [
				d.name
			],
			VALUES
		})
		for (let i = 0; i < domains.length; i++) {
			let domain = domains[i]
			domain._localId = ids[i][0]
		}
	}

}
