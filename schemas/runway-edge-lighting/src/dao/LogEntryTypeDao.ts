import {
	IUtils,
	UtilsToken
}                             from "@airport/air-control";
import {
	Inject,
	Service
}                             from "typedi";
import {
	BaseLogEntryTypeDao,
	IBaseLogEntryDao
}                             from "../generated/baseDaos";
import {LogEntryTypeDaoToken} from "../InjectionTokens";

export interface ILogEntryTypeDao
	extends IBaseLogEntryDao {

}

@Service(LogEntryTypeDaoToken)
export class LogEntryTypeDao
	extends BaseLogEntryTypeDao
	implements ILogEntryTypeDao {

	constructor(
		@Inject(UtilsToken)
			utils: IUtils
	) {
		super(utils);
	}

}