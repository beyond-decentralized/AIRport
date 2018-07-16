import {Token}            from "typedi/Token";
import {IAirportDatabase} from "./lingo/AirportDatabase";
import {IQMetadataUtils}  from "./lingo/utils/QMetadataUtils";
import {IUtils}           from "./lingo/utils/Utils";

export const AirportDatabaseToken = new Token<IAirportDatabase>();
export const QMetadataUtilsToken = new Token<IQMetadataUtils>();
export const UtilsToken           = new Token<IUtils>();
