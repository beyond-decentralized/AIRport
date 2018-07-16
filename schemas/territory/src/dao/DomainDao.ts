import {
	IUtils,
	UtilsToken
}                       from "@airport/air-control";
import {
	Inject,
	Service
}                       from "typedi";
import {
	BaseDomainDao,
	IBaseDomainDao
}                       from "../generated/baseDaos";
import {DomainDaoToken} from "../InjectionTokens";

export interface IDomainDao
	extends IBaseDomainDao {

}

@Service(DomainDaoToken)
export class DomainDao
	extends BaseDomainDao
	implements IDomainDao {

	constructor(
		@Inject(UtilsToken)
			utils: IUtils
	) {
		super(utils);
	}

}