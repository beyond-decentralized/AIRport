import {Service}               from "typedi";
import {GroundTransportLogger} from "../../../InjectionTokens";
import {IDataToTM}             from "../SyncInUtils";

export interface ISyncInConsistencyChecker {

}

const log = GroundTransportLogger.add("SyncInConsistencyChecker");

@Service(SyncInConsistencyCheckerToken)
export class SyncInConsistencyChecker
	implements ISyncInConsistencyChecker {


	ensureConsistency(
		message: IDataToTM
	) {

	}

	private isRepositoryConsistent(): boolean {

	}

	private areActorsConsistent(
		message: IDataToTM
	): boolean {

	}

	private areSchemasConsistent(): boolean {

	}

}