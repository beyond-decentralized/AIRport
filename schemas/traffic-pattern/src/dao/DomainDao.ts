import { DI } from '@airport/di'
import {
	DomainId,
	DomainName
} from '@airport/ground-control'
import { DOMAIN_DAO } from '../tokens'
import {
	BaseDomainDao,
	IBaseDomainDao,
	IDomain,
	Q,
	QDomain
} from '../generated/generated'

export interface IDomainDao
	extends IBaseDomainDao {

	findByIdIn(
		domainIds: DomainId[]
	): Promise<IDomain[]>

	findMapByNameWithNames(
		domainNames: DomainName[]
	): Promise<Map<DomainName, IDomain>>

	findOneByName(
		domainName: DomainName
	): Promise<IDomain>

	findByNames(
		domainNames: DomainName[]
	): Promise<IDomain[]>

	checkAndInsertIfNeeded(
		domains: IDomain[]
	): Promise<void>

}

export class DomainDao
	extends BaseDomainDao
	implements IDomainDao {

	async findByIdIn(
		domainIds: DomainId[]
	): Promise<IDomain[]> {
		let d: QDomain

		return await this.db.find.tree({
			select: {},
			from: [
				d = Q.Domain
			],
			where: d.id.in(domainIds)
		})
	}

	async findMapByNameWithNames(
		domainNames: DomainName[]
	): Promise<Map<DomainName, IDomain>> {
		let d: QDomain
		const domains = await this.db.find.tree({
			select: {},
			from: [d = Q.Domain],
			where: d.name.in(domainNames)
		})

		const domainMapByNameWithNames: Map<DomainName, IDomain> = new Map()

		for (const domain of domains) {
			domainMapByNameWithNames.set(domain.name, domain)
		}

		return domainMapByNameWithNames
	}

	async findOneByName(
		name: DomainName
	): Promise<IDomain> {
		let d: QDomain
		return await this.db.findOne.tree({
			select: {},
			from: [d = Q.Domain],
			where: d.name.equals(name)
		})
	}

	async findByNames(
		names: DomainName[]
	): Promise<IDomain[]> {
		let d: QDomain
		return await this.db.find.tree({
			select: {},
			from: [d = Q.Domain],
			where: d.name.in(names)
		})
	}

	async checkAndInsertIfNeeded(
		domains: IDomain[]
	): Promise<void> {
		const existingDomains = await this.findByIdIn(domains.map(domain => domain.id))
		const existingDomainMap: Map<DomainId, IDomain> = new Map()
		for (const existingDomain of existingDomains) {
			existingDomainMap.set(existingDomain.id, existingDomain)
		}
		const newDomains: IDomain[] = []
		for (const domain of domains) {
			if (!existingDomainMap.has(domain.id)) {
				newDomains.push(domain)
			}
		}
		let d: QDomain;
		const values = []
		for (const domain of newDomains) {
			values.push([
				domain.id, domain.name
			])
		}
		await this.db.insertValuesGenerateIds({
			insertInto: d = Q.Domain,
			columns: [
				d.id,
				d.name,
			],
			values
		})
	}

}

DI.set(DOMAIN_DAO, DomainDao)
