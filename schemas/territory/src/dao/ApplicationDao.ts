import {
	IUtils,
	UtilsToken
}                            from "@airport/air-control";
import {
	Inject,
	Service
}                            from "typedi";
import {
	BaseApplicationDao,
	IBaseApplicationDao
}                            from "../generated/baseDaos";
import {ApplicationDaoToken} from "../InjectionTokens";

export interface IApplicationDao
	extends IBaseApplicationDao {

}

@Service(ApplicationDaoToken)
export class ApplicationDao
	extends BaseApplicationDao
	implements IApplicationDao {

	constructor(
		@Inject(UtilsToken)
			utils: IUtils
	) {
		super(utils);
	}

}