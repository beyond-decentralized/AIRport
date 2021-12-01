import {SCHEMA as AIRPORT_CODE} from '@airport/airport-code/lib/generated/application'
import {SCHEMA as HOLDING_PATTERN} from '@airport/holding-pattern/lib/generated/application'
import {SCHEMA as AIRSPACE} from '@airport/airspace/lib/generated/application'
import {SCHEMA as TRAVEL_DOCUMENT_CHECKPOINT} from '@airport/travel-document-checkpoint/lib/generated/application'

// TODO: remove once used
// import {TERMINAL_DAO} from '@airport/travel-document-checkpoint'

// var temp = TERMINAL_DAO

export const BLUEPRINT = [
	AIRPORT_CODE,
	TRAVEL_DOCUMENT_CHECKPOINT,
	AIRSPACE,
	HOLDING_PATTERN
]
