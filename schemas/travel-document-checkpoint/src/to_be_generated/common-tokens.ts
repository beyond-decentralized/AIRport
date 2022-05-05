import { lib } from '@airport/direction-indicator'
import { IUserApi, UserApi } from '../api/UserApi'

export const travelDocumentCheckpoint = lib('travel-document-checkpoint')

export const USER_API = travelDocumentCheckpoint.token<IUserApi>({
    class: UserApi,
    interface: 'IUserApi',
    token: 'USER_API'
})
