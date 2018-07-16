import {
	IUtils,
	UtilsToken
} from "@airport/air-control";
import {
	Inject,
	Service
} from "typedi";
import {
	BaseSharingMessageRepoTransBlockDao,
	IBaseSharingMessageRepoTransBlockDao,
	SharingMessageRepoTransBlockDaoToken
} from "../..";

export interface ISharingMessageRepoTransBlockDao
	extends IBaseSharingMessageRepoTransBlockDao {

}

@Service(SharingMessageRepoTransBlockDaoToken)
export class SharingMessageRepoTransBlockDao
	extends BaseSharingMessageRepoTransBlockDao
	implements ISharingMessageRepoTransBlockDao {

	constructor(
		@Inject(UtilsToken)
			utils: IUtils
	) {
		super(utils);
	}

}