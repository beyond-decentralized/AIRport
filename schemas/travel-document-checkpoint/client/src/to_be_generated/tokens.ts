import { lib } from '@airport/direction-indicator'
import { IUserApi } from './api/UserApiClient'

export const travelDocumentCheckpoint = lib('travel-document-checkpoint')

export const USER_API = travelDocumentCheckpoint.token<IUserApi>('USER_API')