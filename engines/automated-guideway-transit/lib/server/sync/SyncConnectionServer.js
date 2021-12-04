import { MESSAGE_FROM_TM_DESERIALIZER, MESSAGE_FROM_TM_VERIFIER, MESSAGE_TO_TM_SERIALIZER, SYNC_CONNECTION_SERVER } from '@airport/arrivals-n-departures';
import { container, DI } from '@airport/di';
import { AGT_REPO_TRANS_BLOCK_DAO, AGT_SHARING_MESSAGE_DAO, SYNC_LOG_DAO } from '@airport/guideway';
import { AGTLogger, BLACKLIST, SYNC_CONNECTION_PROCESSOR, SYNC_CONNECTION_VERIFIER, TUNNING_SETTINGS } from '../../tokens';
const log = AGTLogger.add('SyncConnectionServer');
export class SyncConnectionServer {
    async initialize() {
    }
    startProcessing(createServer, portNumberToListenOn, setInterval, intervalFrequencyMillis) {
        // TODO: removed unused depencencies once tested
        container(this).get(AGT_SHARING_MESSAGE_DAO, AGT_REPO_TRANS_BLOCK_DAO, SYNC_LOG_DAO);
        container(this).get(BLACKLIST, MESSAGE_FROM_TM_VERIFIER, MESSAGE_FROM_TM_DESERIALIZER, MESSAGE_TO_TM_SERIALIZER, SYNC_CONNECTION_PROCESSOR, SYNC_CONNECTION_VERIFIER, TUNNING_SETTINGS).then(([ipBlacklist, messageFromTMVerifier, messageFromTMDeserializer, messageToTMSerializer, syncConnectionProcessor, syncConnectionVerifier, tuningSettings]) => {
            createServer((req, res) => {
                const ip = this.getIP(req);
                if (this.connectionBlocked(req, res, ip, ipBlacklist)) {
                    return;
                }
                switch (req.url) {
                    case '/connect':
                        this.handleConnect(req, res, ip, messageFromTMDeserializer, messageFromTMVerifier, messageToTMSerializer, syncConnectionVerifier);
                        break;
                    default:
                        ipBlacklist.blacklist(ip);
                        this.block(res);
                }
            }).listen(portNumberToListenOn);
            // this.jwtTokenProcessorClient.startProcessing();
            // TODO: implement smarter batching, if a batch got kicked off mid-interval.
            // Dont' call next batch until the interval time from the last forced batch kickoff.
            setInterval(() => {
                this.processBatchedConnections(syncConnectionProcessor, syncConnectionVerifier, tuningSettings).then();
            }, tuningSettings.recent.incomingBatchFrequencyMillis);
        });
    }
    async processBatchedConnections(syncConnectionProcessor, syncConnectionVerifier, tuningSettings) {
        // const serverId: ServerId = this.server.id;
        const verifiedMessagesFromTM = await syncConnectionVerifier.verifyPendingClaims(
        // serverId,
        tuningSettings.recent.minMillisSinceLastConnection);
        await syncConnectionProcessor.processConnections(verifiedMessagesFromTM);
        // Close all remaining (valid) connections
        for (const [terminalId, connectionClaim] of verifiedMessagesFromTM.syncConnectionClaimsByTmId) {
            connectionClaim.connectionDataCallback(terminalId, false, null);
        }
    }
    stopProcessing( //
    ) {
    }
    // TODO: implement kicking off a new batch if max records counts are over the
    // configured values.
    handleConnect(req, res, ip, messageFromTMDeserializer, messageFromTMVerifier, messageToTMSerializer, syncConnectionVerifier) {
        this.handleConnection(req, res, (message) => {
            const connectionDataCallback = (terminalId, 
            // token: JwtToken,
            writeHeaders, data) => {
                this.writeToConnection(res, terminalId, writeHeaders, data, messageToTMSerializer);
            };
            let maxSingleRepoChangeLength = Number.MAX_SAFE_INTEGER; //1048576;
            let maxAllRepoChangesLength = Number.MAX_SAFE_INTEGER; //10485760;
            const applicationValidationResult = messageFromTMVerifier.verifyMessage(message, maxAllRepoChangesLength, maxSingleRepoChangeLength);
            const connectionDataError = applicationValidationResult[0];
            if (connectionDataError) {
                log.error(`
	Message from TM validation error:
		Invalid sync message data application:
				Error Code:    {1}
				Evaluation:    {2}
				Data index:    {3}
				`, connectionDataError, applicationValidationResult[1], applicationValidationResult[2]);
                connectionDataCallback(null, false, null);
            }
            const messageFromTM = messageFromTMDeserializer.deserialize(message);
            syncConnectionVerifier.queueConnectionClaim({
                messageFromTM,
                connectionDataCallback,
                loginClaimReceptionTime: new Date().getTime()
            });
        });
    }
    handleInMemoryConnect(messageFromTM, res, syncConnectionVerifier) {
        const connectionDataCallback = (terminalId, 
        // token: JwtToken,
        writeHeaders, data) => {
            this.writeToInMemoryConnection(res, terminalId, writeHeaders, data);
        };
        syncConnectionVerifier.queueConnectionClaim({
            messageFromTM,
            connectionDataCallback,
            loginClaimReceptionTime: new Date().getTime()
        });
    }
    handleConnection(req, res, callback) {
        const body = [];
        let bodyString;
        req.on('error', (err) => {
            // This prints the error message and stack trace to `stderr`.
            console.error(err.stack);
        }).on('data', (chunk) => {
            body.push(chunk);
        }).on('end', () => {
            res.on('error', (err) => {
                // This prints the error message and stack trace to `stderr`.
                console.error(err.stack);
            });
            try {
                bodyString = Buffer.concat(body).toString();
                const message = JSON.parse(bodyString);
                callback(message);
            }
            catch (err) {
                console.error(err.stack);
            }
        });
    }
    writeToConnection(res, terminalId, writeHeaders, data, messageToTMSerializer) {
        if (!terminalId) {
            this.block(res);
        }
        if (writeHeaders) {
            res.writeHead(200, {
            // "Set-Cookie": token + ", HTTP Only, Secure"
            });
            const protocolVersion = 0;
            // protocol version
            res.write('[' + protocolVersion);
        }
        else if (data) {
            res.write(',');
            const serializedMessage = messageToTMSerializer.serializeAMessage(data);
            res.write(JSON.stringify(serializedMessage));
        }
        else {
            res.write(']');
            res.end();
        }
    }
    writeToInMemoryConnection(res, terminalId, writeHeaders, data) {
        if (!terminalId) {
            this.block(res);
        }
        if (writeHeaders) {
            res.writeHead(200, {
            // "Set-Cookie": token + ", HTTP Only, Secure"
            });
            const protocolVersion = 0;
            // protocol version
        }
        else if (data) {
            res.write(data);
        }
        else {
            res.end();
        }
    }
    /*
        private getCookies(
            cookieString: string
        ): { [key: string]: string } {
            const cookieList = {};
            cookieString && cookieString.split(';').forEach(
                cookie => {
                    const cookieKeyValue = cookie.split('=');
                    // cookieList[cookieKeyValue.shift().trim()] =
                    // decodeURI(cookieKeyValue.join('='));
                    cookieList[cookieKeyValue[0]] = cookieKeyValue[1];
                });

            return cookieList;
        }
    */
    connectionBlocked(req, res, ip, ipBlacklist) {
        if (this.blockBlacklisted(ip, res, ipBlacklist)) {
            return true;
        }
        if (req.method !== 'PUT') {
            ipBlacklist.blacklist(ip);
            this.block(res);
            return true;
        }
        return false;
    }
    getIP(req) {
        // https://stackoverflow.com/questions/38621921/best-way-to-get-the-ip-address-of-client-is-req-ip-or-req-connection-remoteaddre
        // req.ip || req.connection.remoteAddress;
        const ip = req.connection.remoteAddress;
        // If the server is behind a proxy
        // ip = request.headers['x-forwarded-for']
        return ip;
    }
    blockBlacklisted(ip, res, ipBlacklist) {
        if (ipBlacklist.isBlacklisted(ip)) {
            this.block(res);
            return true;
        }
        return false;
    }
    block(res) {
        res.statusCode = 555;
        res.end();
    }
}
DI.set(SYNC_CONNECTION_SERVER, SyncConnectionServer);
//# sourceMappingURL=SyncConnectionServer.js.map