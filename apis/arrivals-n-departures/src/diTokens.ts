import {diToken}                    from '@airport/di'
import {ITMDataDeserializer}        from "./impl/data/TMDataDeserializer";
import {ITMDataFormatVerifier}      from "./impl/data/TMDataFormatVerifier";
import {ITMDataSchemaVerifier}      from "./impl/data/TMDataSchemaVerifier";
import {ITMDataSerializer}          from "./impl/data/TMDataSerializer";
import {IMessageFromTMDeserializer} from "./impl/message/deserializer/MessageFromTMDeserializer";
import {IMessageToTMDeserializer}   from "./impl/message/deserializer/MessageToTMDeserializer";
import {IMessageFromTMSerializer}   from "./impl/message/serializer/MessageFromTMSerializer";
import {IMessageToTMSerializer}     from "./impl/message/serializer/MessageToTMSerializer";
import {IMessageFromTMVerifier}     from "./impl/message/verifier/MessageFromTMVerifier";
import {IMessageToTMVerifier}       from "./impl/message/verifier/MessageToTMVerifier";
import {ISyncConnectionServer}      from "./lingo/SyncConnectionServer";

export const MESSAGE_FROM_TM_DESERIALIZER = diToken<IMessageFromTMDeserializer>();
export const MESSAGE_FROM_TM_SERIALIZER = diToken<IMessageFromTMSerializer>();
export const MESSAGE_FROM_TM_VERIFIER   = diToken<IMessageFromTMVerifier>();
export const MESSAGE_TO_TM_DESERIALIZER = diToken<IMessageToTMDeserializer>();
export const MESSAGE_TO_TM_SERIALIZER   = diToken<IMessageToTMSerializer>();
export const MESSAGE_TO_TM_VERIFIER     = diToken<IMessageToTMVerifier>();
export const SYNC_CONNECTION_SERVER     = diToken<ISyncConnectionServer<any, any, any, any>>();
export const TM_DATA_SERIALIZER         = diToken<ITMDataSerializer>();
export const TM_DATA_DESERIALIZER       = diToken<ITMDataDeserializer>();
export const TM_DATA_FORMAT_VERIFIER    = diToken<ITMDataFormatVerifier>();
export const TM_DATA_SCHEMA_VERIFIER    = diToken<ITMDataSchemaVerifier>();