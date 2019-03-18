import {DI}                 from '@airport/di'
import {TM_DATA_SERIALIZER} from '../../diTokens'

export interface ITMDataSerializer {

}

export class TMDataSerializer
	implements ITMDataSerializer {

	// FIXME: add data serialization

}

DI.set(TM_DATA_SERIALIZER, TMDataSerializer)
