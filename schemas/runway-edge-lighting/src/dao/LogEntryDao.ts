import {
	IUtils,
	UtilsToken
}                         from "@airport/air-control";
import {
	Inject,
	Service
}                         from "typedi";
import {
	BaseLogEntryDao,
	IBaseLogEntryDao
}                         from "../generated/baseDaos";
import {LogEntryDaoToken} from "../InjectionTokens";

export interface ILogEntryDao
	extends IBaseLogEntryDao {

}

@Service(LogEntryDaoToken)
export class LogEntryDao
	extends BaseLogEntryDao
	implements ILogEntryDao {

	constructor(
		@Inject(UtilsToken)
			utils: IUtils
	) {
		super(utils);
	}

}