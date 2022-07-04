import { IContext, Injected } from '@airport/direction-indicator'
import {
	Domain_LocalId,
	Domain_Name
} from '@airport/ground-control'
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
		domainIds: Domain_LocalId[]
	): Promise<IDomain[]>

	findMapByNameWithNames(
		domainNames: Domain_Name[]
	): Promise<Map<Domain_Name, IDomain>>

	findOneByName(
		domainName: Domain_Name
	): Promise<IDomain>

	findByNames(
		domainNames: Domain_Name[]
	): Promise<IDomain[]>

	findByName(
		domainName: Domain_Name
	): Promise<IDomain>

	checkAndInsertIfNeeded(
		domains: IDomain[],
		context: IContext
	): Promise<void>

	insert(
		domains: IDomain[]
	): Promise<void>

}

@Injected()
export class DomainDao
	extends BaseDomainDao
	implements IDomainDao {

	async findByIdIn(
		domainIds: Domain_LocalId[]
	): Promise<IDomain[]> {
		let d: QDomain

		return await this.db.find.tree({
			select: {},
			from: [
				d = Q.Domain
			],
			where: d._localId.in(domainIds)
		})
	}

	async findMapByNameWithNames(
		domainNames: Domain_Name[]
	): Promise<Map<Domain_Name, IDomain>> {
		let d: QDomain
		const domains = await this.db.find.tree({
			select: {},
			from: [d = Q.Domain],
			where: d.name.in(domainNames)
		})

		const domainMapByNameWithNames: Map<Domain_Name, IDomain> = new Map()

		for (const domain of domains) {
			domainMapByNameWithNames.set(domain.name, domain)
		}

		return domainMapByNameWithNames
	}

	async findOneByName(
		name: Domain_Name
	): Promise<IDomain> {
		let d: QDomain
		return await this.db.findOne.tree({
			select: {},
			from: [d = Q.Domain],
			where: d.name.equals(name)
		})
	}

	async findByNames(
		names: Domain_Name[]
	): Promise<IDomain[]> {
		let d: QDomain
		return await this.db.find.tree({
			select: {},
			from: [d = Q.Domain],
			where: d.name.in(names)
		})
	}

	async findByName(
		name: Domain_Name
	): Promise<IDomain> {
		let d: QDomain
		return await this.db.findOne.tree({
			select: {},
			from: [d = Q.Domain],
			where: d.name.equals(name)
		})
	}

	async checkAndInsertIfNeeded(
		domains: IDomain[],
		context: IContext
	): Promise<void> {
		const existingDomains = await this.findByIdIn(domains.map(domain => domain._localId))
		const existingDomainMap: Map<Domain_LocalId, IDomain> = new Map()
		for (const existingDomain of existingDomains) {
			existingDomainMap.set(existingDomain._localId, existingDomain)
		}
		const newDomains: IDomain[] = []
		for (const domain of domains) {
			if (!existingDomainMap.has(domain._localId)) {
				newDomains.push(domain)
			}
		}
		if (!newDomains.length) {
			return
		}
		let d: QDomain;
		const values = []
		for (const domain of newDomains) {
			values.push([
				domain._localId, domain.name
			])
		}
		await this.db.insertValuesGenerateIds({
			insertInto: d = Q.Domain,
			columns: [
				d._localId,
				d.name,
			],
			values
		}, context)
	}

	async insert(
		domains: IDomain[]
	): Promise<void> {
		let d: QDomain;
		const values = []
		for (const domain of domains) {
			values.push([
				domain.name
			])
		}
		const ids = await this.db.insertValuesGenerateIds({
			insertInto: d = Q.Domain,
			columns: [
				d.name
			],
			values
		})
		for (let i = 0; i < domains.length; i++) {
			let domain = domains[i]
			domain._localId = ids[i][0]
		}
	}

}
