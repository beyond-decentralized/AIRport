import {
	IUtils,
	UtilsToken
}                                              from "@airport/air-control";
import {Inject}                                from "typedi";
import {Service}                               from "typedi/decorators/Service";
import {
	BaseRepoTransBlockSchemasToChangeDao,
	IBaseRepoTransBlockSchemasToChangeDao
}                                              from "../../generated/generated";
import {RepoTransBlockSchemasToChangeDaoToken} from "../../InjectionTokens";

export interface IRepoTransBlockSchemasToChangeDao
	extends IBaseRepoTransBlockSchemasToChangeDao {

}

@Service(RepoTransBlockSchemasToChangeDaoToken)
export class RepoTransBlockSchemasToChangeDao
	extends BaseRepoTransBlockSchemasToChangeDao {

	constructor(
		@Inject(UtilsToken)
			utils: IUtils
	) {
		super(utils);
	}

}