import {system}                     from '@airport/di'
import {ITMDataDeserializer}        from './impl/data/TMDataDeserializer'
import {ITMDataFormatVerifier}      from './impl/data/TMDataFormatVerifier'
import {ITMDataSchemaVerifier}      from './impl/data/TMDataSchemaVerifier'
import {ITMDataSerializer}          from './impl/data/TMDataSerializer'
import {IMessageFromTMDeserializer} from './impl/message/deserializer/MessageFromTMDeserializer'
import {IMessageToTMDeserializer}   from './impl/message/deserializer/MessageToTMDeserializer'
import {IMessageFromTMSerializer}   from './impl/message/serializer/MessageFromTMSerializer'
import {IMessageToTMSerializer}     from './impl/message/serializer/MessageToTMSerializer'
import {IMessageFromTMVerifier}     from './impl/message/verifier/MessageFromTMVerifier'
import {IMessageToTMVerifier}       from './impl/message/verifier/MessageToTMVerifier'
import {ISyncConnectionServer}      from './lingo/SyncConnectionServer'

const arrivalsNDepartures = system('airport').lib('arrivals-n-departures')

export const MESSAGE_FROM_TM_DESERIALIZER = arrivalsNDepartures.token<IMessageFromTMDeserializer>('IMessageFromTMDeserializer')
export const MESSAGE_FROM_TM_SERIALIZER   = arrivalsNDepartures.token<IMessageFromTMSerializer>('IMessageFromTMSerializer')
export const MESSAGE_FROM_TM_VERIFIER     = arrivalsNDepartures.token<IMessageFromTMVerifier>('IMessageFromTMVerifier')
export const MESSAGE_TO_TM_DESERIALIZER   = arrivalsNDepartures.token<IMessageToTMDeserializer>('IMessageToTMDeserializer')
export const MESSAGE_TO_TM_SERIALIZER     = arrivalsNDepartures.token<IMessageToTMSerializer>('IMessageToTMSerializer')
export const MESSAGE_TO_TM_VERIFIER       = arrivalsNDepartures.token<IMessageToTMVerifier>('IMessageToTMVerifier')
export const SYNC_CONNECTION_SERVER       = arrivalsNDepartures.token<ISyncConnectionServer<any, any, any, any>>('ISyncConnectionServer')
export const TM_DATA_SERIALIZER           = arrivalsNDepartures.token<ITMDataSerializer>('ITMDataSerializer')
export const TM_DATA_DESERIALIZER         = arrivalsNDepartures.token<ITMDataDeserializer>('ITMDataDeserializer')
export const TM_DATA_FORMAT_VERIFIER      = arrivalsNDepartures.token<ITMDataFormatVerifier>('ITMDataFormatVerifier')
export const TM_DATA_SCHEMA_VERIFIER      = arrivalsNDepartures.token<ITMDataSchemaVerifier>('ITMDataSchemaVerifier')
