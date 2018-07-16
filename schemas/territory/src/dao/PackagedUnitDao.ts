import {
	IUtils,
	UtilsToken
}                             from "@airport/air-control";
import {
	Inject,
	Service
}                             from "typedi";
import {
	BasePackagedUnitDao,
	IBasePackagedUnitDao
}                             from "../generated/generated";
import {PackagedUnitDaoToken} from "../InjectionTokens";

export interface IPackagedUnitDao
	extends IBasePackagedUnitDao {

}

@Service(PackagedUnitDaoToken)
export class PackagedUnitDao
	extends BasePackagedUnitDao
	implements IPackagedUnitDao {

	constructor(
		@Inject(UtilsToken)
			utils: IUtils
	) {
		super(utils);
	}

}