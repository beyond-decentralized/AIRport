"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const arrivals_n_departures_1 = require("@airport/arrivals-n-departures");
const guideway_1 = require("@airport/guideway");
const typedi_1 = require("typedi");
const InjectionTokens_1 = require("../../InjectionTokens");
const log = InjectionTokens_1.AGTLogger.add('SyncConnectionServer');
let SyncConnectionServer = class SyncConnectionServer {
    constructor(ipBlacklist, agtSharingMessageDao, messageFromTMVerifier, messageFromTMDeserializer, messageToTMSerializer, syncConnectionProcessor, syncConnectionVerifier, 
    // private server: IServer,
    agtRepositoryTransactionBlockDao, syncLogDao, tuningSettings) {
        this.ipBlacklist = ipBlacklist;
        this.agtSharingMessageDao = agtSharingMessageDao;
        this.messageFromTMVerifier = messageFromTMVerifier;
        this.messageFromTMDeserializer = messageFromTMDeserializer;
        this.messageToTMSerializer = messageToTMSerializer;
        this.syncConnectionProcessor = syncConnectionProcessor;
        this.syncConnectionVerifier = syncConnectionVerifier;
        this.agtRepositoryTransactionBlockDao = agtRepositoryTransactionBlockDao;
        this.syncLogDao = syncLogDao;
        this.tuningSettings = tuningSettings;
    }
    async initialize() {
    }
    startProcessing(createServer, portNumberToListenOn, setInterval, intervalFrequencyMillis) {
        createServer((req, res) => {
            const ip = this.getIP(req);
            if (this.connectionBlocked(req, res, ip)) {
                return;
            }
            switch (req.url) {
                case '/connect':
                    this.handleConnect(req, res, ip);
                    break;
                default:
                    this.ipBlacklist.blacklist(ip);
                    this.block(res);
            }
        }).listen(portNumberToListenOn);
        // this.jwtTokenProcessorClient.startProcessing();
        // TODO: implement smarter batching, if a batch got kicked off mid-interval.
        // Dont' call next batch until the interval time from the last forced batch kickoff.
        setInterval(() => {
            this.processBatchedConnections().then();
        }, this.tuningSettings.recent.incomingBatchFrequencyMillis);
    }
    async processBatchedConnections( //
    ) {
        // const serverId: ServerId = this.server.id;
        const verifiedMessagesFromTM = await this.syncConnectionVerifier.verifyPendingClaims(
        // serverId,
        this.tuningSettings.recent.minMillisSinceLastConnection);
        await this.syncConnectionProcessor.processConnections(verifiedMessagesFromTM);
        // Close all remaining (valid) connections
        for (const [terminalId, connectionClaim] of verifiedMessagesFromTM.syncConnectionClaimsByTmId) {
            connectionClaim.connectionDataCallback(terminalId, false, null);
        }
    }
    stopProcessing( //
    ) {
    }
    // TODO: implement kicking off a new batch if max records counts are over the configured values.
    handleConnect(req, res, ip) {
        this.handleConnection(req, res, (message) => {
            const connectionDataCallback = (terminalId, 
            // token: JwtToken,
            writeHeaders, data) => {
                this.writeToConnection(res, terminalId, writeHeaders, data);
            };
            let maxSingleRepoChangeLength = Number.MAX_SAFE_INTEGER; //1048576;
            let maxAllRepoChangesLength = Number.MAX_SAFE_INTEGER; //10485760;
            const schemaValidationResult = this.messageFromTMVerifier.verifyMessage(message, maxAllRepoChangesLength, maxSingleRepoChangeLength);
            const connectionDataError = schemaValidationResult[0];
            if (connectionDataError) {
                log.error(`
	Message from TM validation error:
		Invalid sync message data schema:
				Error Code:    {1}
				Evaluation:    {2}
				Data index:    {3}
				`, connectionDataError, schemaValidationResult[1], schemaValidationResult[2]);
                connectionDataCallback(null, false, null);
            }
            const messageFromTM = this.messageFromTMDeserializer.deserialize(message);
            this.syncConnectionVerifier.queueConnectionClaim({
                messageFromTM,
                connectionDataCallback,
                loginClaimReceptionTime: new Date().getTime()
            });
        });
    }
    handleInMemoryConnect(messageFromTM, res) {
        const connectionDataCallback = (terminalId, 
        // token: JwtToken,
        writeHeaders, data) => {
            this.writeToInMemoryConnection(res, terminalId, writeHeaders, data);
        };
        this.syncConnectionVerifier.queueConnectionClaim({
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
    writeToConnection(res, terminalId, writeHeaders, data) {
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
            const serializedMessage = this.messageToTMSerializer.serializeAMessage(data);
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
    connectionBlocked(req, res, ip) {
        if (this.blockBlacklisted(ip, res)) {
            return true;
        }
        if (req.method !== 'PUT') {
            this.ipBlacklist.blacklist(ip);
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
    blockBlacklisted(ip, res) {
        if (this.ipBlacklist.isBlacklisted(ip)) {
            this.block(res);
            return true;
        }
        return false;
    }
    block(res) {
        res.statusCode = 555;
        res.end();
    }
};
SyncConnectionServer = __decorate([
    typedi_1.Service(arrivals_n_departures_1.SyncConnectionServerToken),
    __param(0, typedi_1.Inject(InjectionTokens_1.BlacklistToken)),
    __param(1, typedi_1.Inject(guideway_1.AgtSharingMessageDaoToken)),
    __param(2, typedi_1.Inject(arrivals_n_departures_1.MessageFromTMVerifierToken)),
    __param(3, typedi_1.Inject(arrivals_n_departures_1.MessageFromTMDeserializerToken)),
    __param(4, typedi_1.Inject(arrivals_n_departures_1.MessageToTMSerializerToken)),
    __param(5, typedi_1.Inject(InjectionTokens_1.SyncConnectionProcessorToken)),
    __param(6, typedi_1.Inject(InjectionTokens_1.SyncConnectionVerifierToken)),
    __param(7, typedi_1.Inject(guideway_1.AgtRepositoryTransactionBlockDaoToken)),
    __param(8, typedi_1.Inject(guideway_1.SyncLogDaoToken)),
    __param(9, typedi_1.Inject(InjectionTokens_1.TunningSettingsToken)),
    __metadata("design:paramtypes", [Object, Object, Object, Object, Object, Object, Object, Object, Object, Object])
], SyncConnectionServer);
exports.SyncConnectionServer = SyncConnectionServer;
//# sourceMappingURL=SyncConnectionServer.js.map