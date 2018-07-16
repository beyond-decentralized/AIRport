import {IUtils}             from "@airport/air-control";
import {IAirportDatabase}   from "@airport/air-control/lib/index";
import {
	AirportDatabaseToken,
	UtilsToken
}                           from "@airport/air-control/lib/InjectionTokens";
import {Inject}             from "typedi/decorators/Inject";
import {Service}            from "typedi/decorators/Service";
import {BaseRepositoryDao}  from "../../generated/baseDaos";
import {RepositoryDaoToken} from "../../InjectionTokens";

export interface IRepositoryDao {

}

@Service(RepositoryDaoToken)
export class RepositoryDao
	extends BaseRepositoryDao
	implements IRepositoryDao {

	constructor(
		@Inject(AirportDatabaseToken)
		private airportDb: IAirportDatabase,
		@Inject(UtilsToken)
			utils: IUtils
	) {
		super(utils);
	}

}