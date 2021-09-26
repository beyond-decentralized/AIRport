/*
import { DatabaseId } from "@airport/guideway";

export type ConnectionData = [DatabaseId, ConnectionDataCallback];

export interface CheckTokensCallback {
	(
		checkTokenData: ConnectionData[],
	): void;
}

export interface ConnectionDataCallback {
	(
		databaseId: DatabaseId,
		token: JwtToken,
		data: any,
	): void;
}

export type JwtToken = string;
export type TokenTimeoutPeriod = number;
export type CallbackId = number;
export type JwtPerTokenMessageOut = [DatabaseId, JwtToken];

export type JwtTokenMessageIn =
	[JwtTokenMessageType, TokenTimeoutPeriod, CallbackId, JwtToken[] | DatabaseId[]];

export type JwtTokenMessageOut =
	[CallbackId, JwtPerTokenMessageOut[]];

export enum JwtTokenMessageType {
	CHECK_TOKEN = 'CHECK_TOKEN',
	ISSUE_TOKEN = 'ISSUE_TOKEN',
}
*/
