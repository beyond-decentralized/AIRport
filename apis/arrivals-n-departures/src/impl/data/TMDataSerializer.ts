import {Service}               from "typedi";
import {TMDataSerializerToken} from "../../InjectionTokens";

export interface ITMDataSerializer {

}

@Service(TMDataSerializerToken)
export class TMDataSerializer
	implements ITMDataSerializer {

	// FIXME: add data serialization

}