import {
	IUtils,
	UtilsToken
}                              from "@airport/air-control";
import {
	Inject,
	Service
}                              from "typedi";
import {
	BaseLogEntryValueDao,
	IBaseLogEntryValueDao
}                              from "../generated/baseDaos";
import {LogEntryValueDaoToken} from "../InjectionTokens";

export interface ILogEntryValueDao
	extends IBaseLogEntryValueDao {

}

@Service(LogEntryValueDaoToken)
export class LogEntryValueDao
	extends BaseLogEntryValueDao
	implements ILogEntryValueDao {

	constructor(
		@Inject(UtilsToken)
			utils: IUtils
	) {
		super(utils);
	}

}