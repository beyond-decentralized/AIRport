import {Service}                                 from "typedi";
import {SyncInConsistencyCheckerToken, Terminal} from "../../../../../apps/terminal/src/InjectionTokens";
import {Logger}                                  from "@airport/approach-lighting-system/lib/Logger";
import {IDataToTM}                               from "../SyncInUtils";

export interface ISyncInConsistencyChecker {

}

const log = new Logger(Terminal, "SyncInConsistencyChecker");

@Service(SyncInConsistencyCheckerToken)
export class SyncInConsistencyChecker
	implements ISyncInConsistencyChecker {


	ensureConsistency(

		message: IDataToTM
	) {

	}

	private isRepositoryConsistent(

	): boolean {

	}

	private areActorsConsistent(
		message: IDataToTM
	): boolean {

	}

	private areSchemasConsistent(

	): boolean {

	}

}