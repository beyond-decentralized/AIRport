import {
	IUtils,
	UtilsToken
}                        from "@airport/air-control";
import {
	Inject,
	Service
}                        from "typedi";
import {
	BasePackageDao,
	IBasePackageDao
}                        from "../generated/baseDaos";
import {PackageDaoToken} from "../InjectionTokens";

export interface IPackageDao
	extends IBasePackageDao {

}

@Service(PackageDaoToken)
export class PackageDao
	extends BasePackageDao
	implements IPackageDao {

	constructor(
		@Inject(UtilsToken)
			utils: IUtils
	) {
		super(utils);
	}

}