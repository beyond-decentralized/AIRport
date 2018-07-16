import {Service}                   from "typedi";
import {TMDataSchemaVerifierToken} from "../../InjectionTokens";

export interface ITMDataSchemaVerifier {

}

@Service(TMDataSchemaVerifierToken)
export class TMDataSchemaVerifier
	implements ITMDataSchemaVerifier {

	// FIXME: add data schema verification

}