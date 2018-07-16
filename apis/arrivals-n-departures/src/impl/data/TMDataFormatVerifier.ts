import {Service}                   from "typedi";
import {TMDataFormatVerifierToken} from "../../InjectionTokens";

export interface ITMDataFormatVerifier {

}

@Service(TMDataFormatVerifierToken)
export class TMDataFormatVerifier
	implements ITMDataFormatVerifier {

	// FIXME: add data format verification
}