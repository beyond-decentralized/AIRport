import {
	IUtils,
	UtilsToken
}                                              from "@airport/air-control";
import {Inject}                                from "typedi";
import {Service}                               from "typedi/decorators/Service";
import {
	BaseRepoTransBlockSchemaToChangeDao,
	IBaseRepoTransBlockSchemaToChangeDao
}                                              from "../../generated/generated";
import {RepoTransBlockSchemaToChangeDaoToken} from "../../InjectionTokens";

export interface IRepoTransBlockSchemaToChangeDao
	extends IBaseRepoTransBlockSchemaToChangeDao {

}

@Service(RepoTransBlockSchemaToChangeDaoToken)
export class RepoTransBlockSchemaToChangeDao
	extends BaseRepoTransBlockSchemaToChangeDao {

	constructor(
		@Inject(UtilsToken)
			utils: IUtils
	) {
		super(utils);
	}

}