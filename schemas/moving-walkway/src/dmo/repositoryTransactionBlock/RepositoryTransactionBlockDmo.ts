import {Service}                            from "typedi";
import {
	BaseRepositoryTransactionBlockDmo,
	IBaseRepositoryTransactionBlockDmo
}                                           from "../../generated/generated";
import {RepositoryTransactionBlockDmoToken} from "../../InjectionTokens";

export interface IRepositoryTransactionBlockDmo
	extends IBaseRepositoryTransactionBlockDmo {
}

@Service(RepositoryTransactionBlockDmoToken)
export class RepositoryTransactionBlockDmo
	extends BaseRepositoryTransactionBlockDmo
	implements IRepositoryTransactionBlockDmo {

}