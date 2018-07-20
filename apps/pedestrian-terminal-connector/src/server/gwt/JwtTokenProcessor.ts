/*
import { DatabaseId } from "../../model/ClientInMessage";
import {
	CallbackId,
	JwtPerTokenMessageOut,
	JwtToken,
	JwtTokenMessageIn,
	JwtTokenMessageType,
	TokenTimeoutPeriod
} from "../../model/JwtTokenMessage";

export interface IJwtTokenProcessor {

	startProcessing(): void;

}

export class JwtTokenProcessor
	implements IJwtTokenProcessor {

	private lastAccessTimeMap: Map<number, number> = new Map();

	constructor(
		private secret: string,
		private applicationName: string,
		private process,
		private jwt,
		private checkLastAccessTime = true
	) {
	}

	startProcessing(): void {
		process.on('message', (
			messageIn: JwtTokenMessageIn
		) => {
			let perTokenMessagesOut: JwtPerTokenMessageOut[];
			switch (<JwtTokenMessageType>messageIn[0]) {
				case JwtTokenMessageType.CHECK_TOKEN:
					perTokenMessagesOut = this.processGwtTokenUpdates(
						<TokenTimeoutPeriod>messageIn[1], <JwtToken[]>messageIn[3]);
					break;
				case JwtTokenMessageType.ISSUE_TOKEN:
					perTokenMessagesOut = this.issueNewTokens(
						<TokenTimeoutPeriod>messageIn[1], <DatabaseId[]>messageIn[3]);
					break;
			}

			this.process.send([<CallbackId>messageIn[2], perTokenMessagesOut]);
		});
	}

	private processGwtTokenUpdates(
		tokenTimeoutPeriod: TokenTimeoutPeriod,
		jwtTokens: JwtToken[]
	): JwtPerTokenMessageOut[] {
		return jwtTokens.map(jwtToken =>
			this.processToken(tokenTimeoutPeriod, jwtToken, new Date().getTime())
		);
	}

	private processToken(
		tokenTimeoutPeriod: TokenTimeoutPeriod,
		existingEncodedToken: JwtToken,
		currentTimeStamp: number,
	): JwtPerTokenMessageOut {
		let fromDatabaseId;

		try {
			const existingToken = this.jwt.verify(existingEncodedToken, this.secret, {
				algorithms: ['HS256'],
				issuer: this.applicationName
			});
			fromDatabaseId = parseInt(existingToken.sub);
			if (this.checkLastAccessTime) {
				const lastAccessTime = this.lastAccessTimeMap[fromDatabaseId];
				if (currentTimeStamp - (tokenTimeoutPeriod * 1000) < lastAccessTime) {
					return [null, null];
				}
			}
		} catch (error) {
			return [null, null];
		}

		if (this.checkLastAccessTime) {
			this.lastAccessTimeMap[fromDatabaseId] = currentTimeStamp;
		} else {
		}

		const newToken = this.issueNewToken(tokenTimeoutPeriod, fromDatabaseId);

		return [fromDatabaseId, newToken];
	}

	private issueNewTokens(
		tokenTimeoutPeriod: TokenTimeoutPeriod,
		databaseIds: DatabaseId[],
	): JwtPerTokenMessageOut[] {
		return databaseIds.map(
			databaseId => {
				return <JwtPerTokenMessageOut>
					[databaseId, this.issueNewToken(tokenTimeoutPeriod, databaseId)];
			}
		)
	}

	private issueNewToken(
		tokenTimeoutPeriod: number,
		forDatabaseId: number
	): string {
		return this.jwt.sign({}, this.secret, {
			algorithm: 'HS256',
			expiresIn: tokenTimeoutPeriod,
			issuer: this.applicationName,
			subject: forDatabaseId
		});
	}

}
*/