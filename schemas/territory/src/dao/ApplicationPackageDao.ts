import {
	IUtils,
	UtilsToken
}                                  from "@airport/air-control";
import {
	Inject,
	Service
}                                  from "typedi";
import {
	BaseApplicationPackageDao,
	IBaseApplicationDao
}                                  from "../generated/baseDaos";
import {ApplicationPackageDaoToken} from "../InjectionTokens";

export interface IApplicationPackageDao
	extends IBaseApplicationDao {

}

@Service(ApplicationPackageDaoToken)
export class ApplicationPackageDao
	extends BaseApplicationPackageDao
	implements IApplicationPackageDao {

	constructor(
		@Inject(UtilsToken)
			utils: IUtils
	) {
		super(utils);
	}

}