import {
	IUtils,
	UtilsToken
} from "@airport/air-control";
import {
	Inject,
	Service
} from "typedi";
import {
	BaseSynchronizationConflictValuesDao,
	IBaseSynchronizationConflictValuesDao
}                                              from "../../generated/generated";
import {SynchronizationConflictValuesDaoToken} from "../../InjectionTokens";

export interface ISynchronizationConflictValuesDao
	extends IBaseSynchronizationConflictValuesDao {
}

@Service(SynchronizationConflictValuesDaoToken)
export class SynchronizationConflictValuesDao
	extends BaseSynchronizationConflictValuesDao
	implements ISynchronizationConflictValuesDao {

	constructor(
		@Inject(UtilsToken)
			utils: IUtils
	) {
		super(utils);
	}

}