import { lib } from '@airport/direction-indicator'
import { IUserApi } from './wrappers/UserApiClient'

export const travelDocumentCheckpoint = lib('travel-document-checkpoint')

export const USER_API = travelDocumentCheckpoint.token<IUserApi>({
    class: null,
    interface: 'IUserApi',
    token: 'USER_API'
})