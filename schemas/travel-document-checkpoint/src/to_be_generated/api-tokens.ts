import { INTER_APP_API_CLIENT } from '@airport/direction-indicator'
import { UserAccountApi } from '../generated/api/api'
import { travelDocumentCheckpoint, USER_ACCOUNT_API } from './common-tokens'

travelDocumentCheckpoint.autopilot = true
USER_ACCOUNT_API.setClass(UserAccountApi)
USER_ACCOUNT_API.setDependencies({
    interAppApiClient: INTER_APP_API_CLIENT
})
