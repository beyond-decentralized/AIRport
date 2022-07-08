import { lib } from '@airport/direction-indicator'
import type { UserAccountApi } from '../generated/api/api'

export const travelDocumentCheckpoint = lib('travel-document-checkpoint')

export const USER_ACCOUNT_API = travelDocumentCheckpoint.token<UserAccountApi>({
    class: null,
    interface: 'UserAccountApi',
    token: 'USER_ACCOUNT_API'
})
