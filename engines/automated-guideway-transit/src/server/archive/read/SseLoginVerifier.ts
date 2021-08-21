/*
import {
	TerminalPassword,
	TerminalId,
	ConnectionDataCallback,
	IBlacklist,
	VerifiedClientSseMessages
}                                  from "@airport/ground-control";
import {
	ITerminal,
	ITerminalDao
}                                  from "@airport/guideway";

export interface ISseLoginVerifier {

	blacklist: IBlacklist<string>;

	queueLoginClaim(
		pendingLoginClaim: TerminalPassword,
	): void;

	verifyPendingClaims(
		serverId: number,
		minMillisSinceLastConnection: number
	): Promise<VerifiedClientSseMessages>;

}

export class SseLoginVerifier
	implements ISseLoginVerifier {

	pendingLoginClaims: TerminalPassword[] = [];

	constructor(
		public blacklist: IBlacklist<string>,
		private terminalDao: ITerminalDao,
	) {
	}

	queueLoginClaim(
		pendingLoginClaim: TerminalPassword,
	): void {
		this.pendingLoginClaims.push(pendingLoginClaim);
	}

	async verifyPendingClaims(
		serverId: number,
		minMillisSinceLastConnection: number
	): Promise<VerifiedClientSseMessages> {
		const terminalIds: TerminalId[]                                                         = [],
		      connectionDataCallbackMapByTerminalId: Map<TerminalId, ConnectionDataCallback> = new Map();

		const currentLoginClaims = this.pendingLoginClaims;
		this.pendingLoginClaims  = [];

		const pendingLoginClaimsMap: Map<TerminalPassword, TerminalId> = new Map();

		const loginVerificationRecords: Map<TerminalPassword, ITerminal> =
			      await this.terminalDao.findSseLoginVerificationRecords(currentLoginClaims);

		const verifiedTerminalIds: TerminalId[] = [];

		const earliestAllowedLastConnectionDatetime = new Date().getTime() - minMillisSinceLastConnection;
		for (const [terminalPassword, terminal] of loginVerificationRecords) {
			const pendingLoginClaim      = pendingLoginClaimsMap.get(terminalPassword);
			const connectionDataCallback = pendingLoginClaim[1];
			if (terminal.lastSseConnectionDatetime > earliestAllowedLastConnectionDatetime) {
				connectionDataCallback(null, false, null);
				continue;
			}
			pendingLoginClaimsMap.delete(terminalPassword);
			const terminalId = terminal.id;
			verifiedTerminalIds.push(terminalId);

			terminalIds.push(terminalId);
			connectionDataCallbackMapByTerminalId.set(terminalId, connectionDataCallback);

			connectionDataCallback(terminalId, true, null);
		}
		for (const [terminalPassword, pendingLoginClaim] of pendingLoginClaimsMap) {
			pendingLoginClaim[1](null, false, null);
		}
		// Let update run in background, nothing depends on it being finished
		this.terminalDao.updateLastSseConnectionDatetime(verifiedTerminalIds).then();

		return [terminalIds, connectionDataCallbackMapByTerminalId];
	}
}*/
