import {
	IUtils,
	UtilsToken
} from "@airport/air-control";
import {
	Inject,
	Service
}                                        from "typedi";
import {
	BaseSynchronizationConflictDao,
	IBaseSynchronizationConflictDao,
}                                        from "../../generated/generated";
import {SynchronizationConflictDaoToken} from "../../InjectionTokens";

export interface ISynchronizationConflictDao
	extends IBaseSynchronizationConflictDao {
}

@Service(SynchronizationConflictDaoToken)
export class SynchronizationConflictDao
	extends BaseSynchronizationConflictDao
	implements ISynchronizationConflictDao {

	constructor(
		@Inject(UtilsToken)
		utils: IUtils
	) {
		super(utils);
	}

}