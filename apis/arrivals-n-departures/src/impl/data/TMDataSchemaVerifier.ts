import {DI}                      from '@airport/di'
import {TM_DATA_SCHEMA_VERIFIER} from '../../tokens'

export interface ITMDataSchemaVerifier {

}

export class TMDataSchemaVerifier
	implements ITMDataSchemaVerifier {

	// FIXME: add data schema verification

}

DI.set(TM_DATA_SCHEMA_VERIFIER, TMDataSchemaVerifier)
