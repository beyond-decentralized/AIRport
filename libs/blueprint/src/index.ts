import {SCHEMA as AIRPORT_CODE} from '@airport/airport-code/lib/generated/schema'
import {SCHEMA as HOLDING_PATTERN} from '@airport/holding-pattern/lib/generated/schema'
import {SCHEMA as TRAFFIC_PATTERN} from '@airport/traffic-pattern/lib/generated/schema'
import {SCHEMA as TRAVEL_DOCUMENT_CHECKPOINT} from '@airport/travel-document-checkpoint/lib/generated/schema'

// TODO: remove once used
// import {TERMINAL_DAO} from '@airport/travel-document-checkpoint'

// var temp = TERMINAL_DAO

export const BLUEPRINT = [
	AIRPORT_CODE,
	TRAVEL_DOCUMENT_CHECKPOINT,
	TRAFFIC_PATTERN,
	HOLDING_PATTERN
]
