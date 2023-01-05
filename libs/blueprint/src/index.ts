import { APPLICATION as AIRPORT_CODE } from '@airport/airport-code/dist/definition/application'
import { APPLICATION as HOLDING_PATTERN } from '@airport/holding-pattern/dist/definition/application'
import { APPLICATION as AIRSPACE } from '@airport/airspace/dist/definition/application'
import { APPLICATION as TRAVEL_DOCUMENT_CHECKPOINT } from '@airport/travel-document-checkpoint/dist/definition/application'
import { APPLICATION as LAYOVER } from '@airport/layover/dist/definition/application'
import { APPLICATION as SESSION_STATE } from '@airport/session-state/dist/definition/application'
import { APPLICATION as FLIGHT_RECORDER } from '@airport/flight-recorder/dist/definition/application'
import { APPLICATION as KEYRING } from '@airbridge/keyring/dist/definition/application'

export const BLUEPRINT = [
	AIRPORT_CODE,
	AIRSPACE,
	TRAVEL_DOCUMENT_CHECKPOINT,
	HOLDING_PATTERN,
	LAYOVER,
	SESSION_STATE,
	FLIGHT_RECORDER,
	KEYRING
]
