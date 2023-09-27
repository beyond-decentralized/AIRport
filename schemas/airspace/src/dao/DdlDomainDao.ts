import { IContext, Injected } from '@airport/direction-indicator'
import {
	IDomain,
	Domain_LocalId,
	Domain_Name
} from '@airport/ground-control'
import { BaseDdlDomainDao, IBaseDdlDomainDao } from '../generated/baseDaos'
import Q_airport____at_airport_slash_airspace from '../generated/qApplication'
import { QDdlDomain } from '../generated/qInterfaces'

export interface IDdlDomainDao
	extends IBaseDdlDomainDao {

	findByIdIn(
		domainIds: Domain_LocalId[],
		context: IContext
	): Promise<IDomain[]>

	findMapByNameWithNames(
		domainNames: Domain_Name[],
		context: IContext
	): Promise<Map<Domain_Name, IDomain>>

	findOneByName(
		domainName: Domain_Name,
		context: IContext
	): Promise<IDomain>

	findByNames(
		domainNames: Domain_Name[],
		context: IContext
	): Promise<IDomain[]>

	findByName(
		domainName: Domain_Name,
		context: IContext
	): Promise<IDomain>

	checkAndInsertIfNeeded(
		domains: IDomain[],
		context: IContext
	): Promise<void>

	insert(
		domains: IDomain[],
		context: IContext
	): Promise<void>

}

@Injected()
export class DdlDomainDao
	extends BaseDdlDomainDao
	implements IDdlDomainDao {

	async findByIdIn(
		domainIds: Domain_LocalId[],
		context: IContext
	): Promise<IDomain[]> {
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
		domainNames: Domain_Name[],
		context: IContext
	): Promise<Map<Domain_Name, IDomain>> {
		let d: QDdlDomain
		const domains = await this.db.find.tree({
			SELECT: {},
			FROM: [d = Q_airport____at_airport_slash_airspace.DdlDomain],
			WHERE: d.name.IN(domainNames)
		}, context)

		const domainMapByNameWithNames: Map<Domain_Name, IDomain> = new Map()

		for (const domain of domains) {
			domainMapByNameWithNames.set(domain.name, domain)
		}

		return domainMapByNameWithNames
	}

	async findOneByName(
		name: Domain_Name,
		context: IContext
	): Promise<IDomain> {
		let d: QDdlDomain
		return await this.db.findOne.tree({
			SELECT: {},
			FROM: [d = Q_airport____at_airport_slash_airspace.DdlDomain],
			WHERE: d.name.equals(name)
		}, context)
	}

	async findByNames(
		names: Domain_Name[],
		context: IContext
	): Promise<IDomain[]> {
		let d: QDdlDomain
		return await this.db.find.tree({
			SELECT: {},
			FROM: [d = Q_airport____at_airport_slash_airspace.DdlDomain],
			WHERE: d.name.IN(names)
		}, context)
	}

	async findByName(
		name: Domain_Name,
		context: IContext
	): Promise<IDomain> {
		let d: QDdlDomain
		return await this.db.findOne.tree({
			SELECT: {},
			FROM: [d = Q_airport____at_airport_slash_airspace.DdlDomain],
			WHERE: d.name.equals(name)
		}, context)
	}

	async checkAndInsertIfNeeded(
		domains: IDomain[],
		context: IContext
	): Promise<void> {
		const existingDomains = await this.findByIdIn(
			domains.map(domain => domain._localId),
			context)
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
		domains: IDomain[],
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
