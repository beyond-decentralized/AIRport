import { INTER_APP_API_CLIENT } from '@airport/direction-indicator'
import { SessionStateApi } from '../generated/api/api'
import { SESSION_STATE_API, sessionState } from './common-tokens'

sessionState.autopilot = true
SESSION_STATE_API.setClass(SessionStateApi)
SESSION_STATE_API.setDependencies({
    interAppApiClient: INTER_APP_API_CLIENT
})
