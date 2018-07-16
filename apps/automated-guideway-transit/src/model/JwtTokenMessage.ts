/*
import { TerminalId } from "@airport/arrivals-n-departures";

export type ConnectionData = [TerminalId, ConnectionDataCallback];

export interface CheckTokensCallback {
	(
		checkTokenData: ConnectionData[],
	): void;
}

export interface ConnectionDataCallback {
	(
		terminalId: TerminalId,
		token: JwtToken,
		data: any,
	): void;
}

export type JwtToken = string;
export type TokenTimeoutPeriod = number;
export type CallbackId = number;
export type JwtPerTokenMessageOut = [TerminalId, JwtToken];

export type JwtTokenMessageIn =
	[JwtTokenMessageType, TokenTimeoutPeriod, CallbackId, JwtToken[] | TerminalId[]];

export type JwtTokenMessageOut =
	[CallbackId, JwtPerTokenMessageOut[]];

export enum JwtTokenMessageType {
	CHECK_TOKEN,
	ISSUE_TOKEN,
}
*/
