import { lib } from '@airport/direction-indicator'
import type { IUserApi } from '../api/UserApi'

export const travelDocumentCheckpoint = lib('travel-document-checkpoint')

export const USER_API = travelDocumentCheckpoint.token<IUserApi>({
    class: null,
    interface: 'IUserApi',
    token: 'USER_API'
})
