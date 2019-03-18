import {DI}                      from '@airport/di'
import {TM_DATA_FORMAT_VERIFIER} from '../../diTokens'

export interface ITMDataFormatVerifier {

}

export class TMDataFormatVerifier
	implements ITMDataFormatVerifier {

	// FIXME: add data format verification
}

DI.set(TM_DATA_FORMAT_VERIFIER, TMDataFormatVerifier)
