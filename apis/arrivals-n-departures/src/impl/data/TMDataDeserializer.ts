import {DI}                   from '@airport/di'
import {TM_DATA_DESERIALIZER} from '../../tokens'

export interface ITMDataDeserializer {

}

export class TMDataDeserializer
	implements ITMDataDeserializer {

	// FIXME: add data deserialization

}

DI.set(TM_DATA_DESERIALIZER, TMDataDeserializer)
