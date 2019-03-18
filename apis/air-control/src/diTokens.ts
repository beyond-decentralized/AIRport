import {
	diToken
}                         from '@airport/di'
import {IAirportDatabase} from './lingo/AirportDatabase'
import {IQMetadataUtils}  from './lingo/utils/QMetadataUtils'
import {IUtils}           from './lingo/utils/Utils'

export const AIRPORT_DATABASE = diToken<IAirportDatabase>()
export const Q_METADATA_UTILS = diToken<IQMetadataUtils>()
export const UTILS            = diToken<IUtils>()
