import { Token } from "typedi/Token";
import { IAirportDatabase } from "./lingo/AirportDatabase";
import { IQMetadataUtils } from "./lingo/utils/QMetadataUtils";
import { IUtils } from "./lingo/utils/Utils";
export declare const AirportDatabaseToken: Token<IAirportDatabase>;
export declare const QMetadataUtilsToken: Token<IQMetadataUtils>;
export declare const UtilsToken: Token<IUtils>;
