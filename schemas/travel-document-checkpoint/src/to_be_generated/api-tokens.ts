import { lib } from '@airport/direction-indicator'
import { INTER_APP_API_CLIENT } from '@airport/ground-control'
import { IUserApi } from '../api/UserApi'

export const travelDocumentCheckpoint = lib('travel-document-checkpoint')

export const USER_API = travelDocumentCheckpoint.token<IUserApi>('USER_API')

USER_API.setDependencies({
    interAppApiClient: INTER_APP_API_CLIENT
})
