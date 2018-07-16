import {
	IUtils,
	UtilsToken
} from "@airport/air-control";
import {
	Inject,
	Service
} from "typedi";
import {
	BaseSynchronizationConflictPendingNotificationDao,
	IBaseSynchronizationConflictPendingNotificationDao
}                                                           from "../../generated/generated";
import {SynchronizationConflictPendingNotificationDaoToken} from "../../InjectionTokens";

export interface ISynchronizationConflictPendingNotificationDao
	extends IBaseSynchronizationConflictPendingNotificationDao {
}

@Service(SynchronizationConflictPendingNotificationDaoToken)
export class SynchronizationConflictPendingNotificationDao
	extends BaseSynchronizationConflictPendingNotificationDao
	implements ISynchronizationConflictPendingNotificationDao {

	constructor(
		@Inject(UtilsToken)
			utils: IUtils
	) {
		super(utils);
	}

}