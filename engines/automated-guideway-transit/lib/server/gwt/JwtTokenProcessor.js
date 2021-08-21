/*
import { TerminalId } from "../../model/ClientInMessage";
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
                        <TokenTimeoutPeriod>messageIn[1], <TerminalId[]>messageIn[3]);
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
        let fromTerminalId;

        try {
            const existingToken = this.jwt.verify(existingEncodedToken, this.secret, {
                algorithms: ['HS256'],
                issuer: this.applicationName
            });
            fromTerminalId = parseInt(existingToken.sub);
            if (this.checkLastAccessTime) {
                const lastAccessTime = this.lastAccessTimeMap[fromTerminalId];
                if (currentTimeStamp - (tokenTimeoutPeriod * 1000) < lastAccessTime) {
                    return [null, null];
                }
            }
        } catch (error) {
            return [null, null];
        }

        if (this.checkLastAccessTime) {
            this.lastAccessTimeMap[fromTerminalId] = currentTimeStamp;
        } else {
        }

        const newToken = this.issueNewToken(tokenTimeoutPeriod, fromTerminalId);

        return [fromTerminalId, newToken];
    }

    private issueNewTokens(
        tokenTimeoutPeriod: TokenTimeoutPeriod,
        terminalIds: TerminalId[],
    ): JwtPerTokenMessageOut[] {
        return terminalIds.map(
            terminalId => {
                return <JwtPerTokenMessageOut>
                    [terminalId, this.issueNewToken(tokenTimeoutPeriod, terminalId)];
            }
        )
    }

    private issueNewToken(
        tokenTimeoutPeriod: number,
        forTerminalId: number
    ): string {
        return this.jwt.sign({}, this.secret, {
            algorithm: 'HS256',
            expiresIn: tokenTimeoutPeriod,
            issuer: this.applicationName,
            subject: forTerminalId
        });
    }

}
*/ 
//# sourceMappingURL=JwtTokenProcessor.js.map