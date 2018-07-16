import {Service}                 from "typedi";
import {TMDataDeserializerToken} from "../../InjectionTokens";

export interface ITMDataDeserializer {

}

@Service(TMDataDeserializerToken)
export class TMDataDeserializer
	implements ITMDataDeserializer {

	// FIXME: add data deserialization

}