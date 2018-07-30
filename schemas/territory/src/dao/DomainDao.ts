import {IUtils, UtilsToken} from "@airport/air-control";
import {DomainName} from "@airport/ground-control";
import {Inject, Service} from "typedi";
import {IDomain, Q, QDomain} from "..";
import {BaseDomainDao, IBaseDomainDao} from "../generated/baseDaos";
import {DomainDaoToken} from "../InjectionTokens";

export interface IDomainDao
	extends IBaseDomainDao {

	findMapByNameWithNames(
		domainNames: DomainName[]
	): Promise<Map<DomainName,IDomain>>;

}

@Service(DomainDaoToken)
export class DomainDao
	extends BaseDomainDao
	implements IDomainDao {

	constructor(
		@Inject(UtilsToken)
			utils: IUtils
	) {
		super(utils)
	}

	async findMapByNameWithNames(
		domainNames: DomainName[]
	): Promise<Map<DomainName,IDomain>> {
		let d: QDomain
		const domains = await this.db.find.tree({
			select: {},
			from: [d = Q.Domain],
			where: d.name.in(domainNames)
		})

		const domainMapByNameWithNames: Map<DomainName,IDomain> = new Map()

		for(const domain of domains) {
			domainMapByNameWithNames.set(domain.name, domain)
		}

		return domainMapByNameWithNames
	}

}