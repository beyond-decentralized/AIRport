import { lib } from '@airport/direction-indicator'
import type { UserApi } from '../generated/api/api'

export const travelDocumentCheckpoint = lib('travel-document-checkpoint')

export const USER_API = travelDocumentCheckpoint.token<UserApi>({
    class: null,
    interface: 'UserApi',
    token: 'USER_API'
})
