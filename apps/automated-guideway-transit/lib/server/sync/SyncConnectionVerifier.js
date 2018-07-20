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
const guideway_1 = require("@airport/guideway");
const Inject_1 = require("typedi/decorators/Inject");
const Service_1 = require("typedi/decorators/Service");
const InjectionTokens_1 = require("../../InjectionTokens");
const ServerErrorType_1 = require("../../model/ServerErrorType");
const log = InjectionTokens_1.AGTLogger.add('SyncConnectionVerifier');
let SyncConnectionVerifier = class SyncConnectionVerifier {
    constructor(blacklist, terminalDao, terminalRepositoryDao, agtSharingMessageDao, errorLogger) {
        this.blacklist = blacklist;
        this.terminalDao = terminalDao;
        this.terminalRepositoryDao = terminalRepositoryDao;
        this.agtSharingMessageDao = agtSharingMessageDao;
        this.errorLogger = errorLogger;
        this.pendingConnectionClaims = [];
    }
    queueConnectionClaim(pendingConnectionClaim) {
        this.pendingConnectionClaims.push(pendingConnectionClaim);
    }
    /**
     * Verify pending connection claims.
     *
     * Concerns:
     *
     * 1) How to handle valid user connections when a DDOS attack is randomly using their Terminal
     * Original Shard Id and Terminal Id:
     *
     * a) When multiple Connection requests for the same Terminal credentials are detected, deny the
     * request before it is recorded into the Terminal Repository staging table.
     *
     * b) Then find the correct terminal request via the provided hash and disallow the remaining
     * ones.
     *
     * Implementing the second option, since a the priority is to have the server still syncing (in
     * the presence of a DDOS attack).
     *
     *
     * @param {number} serverId
     * @param {number} minMillisSinceLastConnection
     * @returns {Promise<VerifiedClientPollMessages>}
     */
    async verifyPendingClaims(
    // serverId: ServerId,
    minMillisSinceLastConnection) {
        const currentConnectionClaims = this.pendingConnectionClaims;
        this.pendingConnectionClaims = [];
        // If there are no records to be processed
        if (!currentConnectionClaims.length) {
            return {
                terminalIds: new Set(),
                repositoryIds: new Set(),
                agtSharingMessageIds: new Set(),
                syncConnectionClaimsByTmId: new Map()
            };
        }
        const earliestAllowedLastConnectionDatetime = new Date().getTime() - minMillisSinceLastConnection;
        const verifiedMessagesFromTM = await this.verifyTerminalsAndGetResourceIds(currentConnectionClaims, earliestAllowedLastConnectionDatetime);
        // At this point we are guaranteed that in the present batch there are no duplicate
        // terminal requests
        return verifiedMessagesFromTM;
    }
    async verifyTerminalsAndGetResourceIds(currentConnectionClaims, earliestAllowedLastConnectionDatetime) {
        const terminalIds = new Set();
        const repositoryIds = new Set();
        const agtSharingMessageIds = new Set();
        const syncConnectionClaimsByTmId = new Map();
        const terminalIdSet = new Set();
        const duplicatePendingConnectionClaimsMap = new Map();
        // For every batched Connection claim
        for (const currentConnectionClaim of currentConnectionClaims) {
            const message = currentConnectionClaim.messageFromTM;
            const terminalCredentials = message.terminalCredentials;
            const terminalId = terminalCredentials.terminalId;
            // If a request from the same terminal came more than once (probably a hack or an attack)
            // NOTE: Thes
            // e attacks are most likely random, since there is no way for an attacker to know
            // which terminal id belongs to which user (this is most likely a DDOS attack)
            if (terminalIdSet.has(terminalId)) {
                const previousConnectionClaim = syncConnectionClaimsByTmId.get(terminalId);
                let duplicatePendingConnectionClaimsMapForTerminal = duplicatePendingConnectionClaimsMap.get(terminalId);
                // If the happy path claim map still has a record in it
                if (previousConnectionClaim) {
                    duplicatePendingConnectionClaimsMapForTerminal = [];
                    duplicatePendingConnectionClaimsMapForTerminal.push(previousConnectionClaim);
                    duplicatePendingConnectionClaimsMap.set(terminalId, duplicatePendingConnectionClaimsMapForTerminal);
                    syncConnectionClaimsByTmId.delete(terminalId);
                    this.errorLogger.logError(log, ServerErrorType_1.ServerErrorType.INCOMING_DATABASE_KEY_APPEARS_MORE_THAN_ONCE_IN_THE_BATCH, terminalCredentials, null);
                }
                duplicatePendingConnectionClaimsMapForTerminal.push(currentConnectionClaim);
                continue;
            }
            terminalIdSet.add(terminalId);
        }
        const terminalCredentialMapById = await this.terminalDao.findTerminalVerificationRecords(Array.from(terminalIdSet));
        // For every Connection claim with no duplicates
        for (const [terminalId, pendingConnectionClaim] of syncConnectionClaimsByTmId) {
            const message = pendingConnectionClaim.messageFromTM;
            const incomingTerminalCredentials = message.terminalCredentials;
            const terminalData = this.verifyTerminalInfo(terminalId, incomingTerminalCredentials, pendingConnectionClaim, terminalCredentialMapById);
            if (!terminalData) {
                syncConnectionClaimsByTmId.delete(terminalId);
                continue;
            }
            if (!this.finishTerminalVerification(earliestAllowedLastConnectionDatetime, terminalId, pendingConnectionClaim, terminalData[1], repositoryIds, agtSharingMessageIds, syncConnectionClaimsByTmId)) {
                syncConnectionClaimsByTmId.delete(terminalId);
                terminalIds.add(terminalId);
            }
        }
        // If there where duplicate requests per terminal
        if (duplicatePendingConnectionClaimsMap.size) {
            await this.filterDuplicateRequestsPerTerminal(duplicatePendingConnectionClaimsMap, terminalIdSet, repositoryIds, agtSharingMessageIds, terminalCredentialMapById, syncConnectionClaimsByTmId, earliestAllowedLastConnectionDatetime);
        }
        return {
            terminalIds,
            repositoryIds,
            agtSharingMessageIds,
            syncConnectionClaimsByTmId
        };
    }
    verifyTerminalInfo(terminalId, incomingTerminalCredentials, pendingConnectionClaim, terminalInfoMapById) {
        const terminalData = terminalInfoMapById.get(terminalId);
        if (!terminalData) {
            this.errorLogger.logError(log, ServerErrorType_1.ServerErrorType.INCOMING_DATABASE_RECORD_WASNT_IN_DATABASES_TABLE, incomingTerminalCredentials, null);
            pendingConnectionClaim.connectionDataCallback(null, false, null);
            return null;
        }
        if (incomingTerminalCredentials.terminalPassword !== terminalData[0]) {
            // Terminal password does not match (probably a hack or an attack)
            this.errorLogger.logError(log, ServerErrorType_1.ServerErrorType.INCOMING_DATABASE_HASH_DOES_NOT_MATCH, incomingTerminalCredentials, null);
            pendingConnectionClaim.connectionDataCallback(null, false, null);
            return null;
        }
        return terminalData;
    }
    finishTerminalVerification(earliestAllowedLastConnectionDatetime, terminalId, pendingConnectionClaim, lastConnectionDatetime, repositoryIdSet, agtSharingMessageIdSet, pendingConnectionClaimsMap) {
        const message = pendingConnectionClaim.messageFromTM;
        // If the server connected too soon (probably a hack or an attack)
        if (lastConnectionDatetime > earliestAllowedLastConnectionDatetime) {
            this.errorLogger.logError(log, ServerErrorType_1.ServerErrorType.SYNC_CLIENT_CONNECTED_TOO_SOON, message.terminalCredentials, null);
            pendingConnectionClaim.connectionDataCallback(null, false, null);
            return false;
        }
        for (const repositoryUpdateRequest of message.repositoryUpdateRequests) {
            repositoryIdSet.add(repositoryUpdateRequest.agtRepositoryId);
        }
        const sharingMessageIdSetForClaim = new Set();
        for (const agtSharingMessageId of message.terminalSyncAcks) {
            if (sharingMessageIdSetForClaim.has(agtSharingMessageId)) {
                this.errorLogger.logError(log, ServerErrorType_1.ServerErrorType.INCOMING_DATABASE_SYNC_LOG_KEY_APPEARS_MORE_THAN_ONCE_IN_A_REQUEST, message.terminalCredentials, agtSharingMessageId);
                pendingConnectionClaimsMap.delete(terminalId);
                pendingConnectionClaim.connectionDataCallback(null, false, null);
                return false;
            }
            sharingMessageIdSetForClaim.add(agtSharingMessageId);
        }
        sharingMessageIdSetForClaim.forEach(agtSharingMessageIdSet.add, agtSharingMessageIdSet);
        return true;
    }
    async filterDuplicateRequestsPerTerminal(duplicatePendingConnectionClaimsMap, verifiedTerminalIdSet, repositoryIdSet, agtSharingMessageIdSet, terminalInfoMapById, pendingConnectionClaimsMap, earliestAllowedLastConnectionDatetime) {
        // For every set of duplicate requests per terminal
        for (const [terminalId, duplicateConnectionClaimsForTerminal] of duplicatePendingConnectionClaimsMap) {
            const terminalData = terminalInfoMapById.get(terminalId);
            // If no terminal was found for duplicate requests
            if (!terminalData) {
                continue;
            }
            duplicatePendingConnectionClaimsMap.delete(terminalId);
            let connectionClaimWithMatchingHash;
            let foundMultipleWithCorrectHash = false;
            let foundClaimsWithIncorrectHash = false;
            // For every duplicate Connection claim for a given terminal
            for (const duplicateConnectionClaimForTerminal of duplicateConnectionClaimsForTerminal) {
                const claimedTerminalPassword = duplicateConnectionClaimForTerminal.messageFromTM.terminalCredentials.terminalPassword;
                // If the claims terminalPassword is correct
                if (claimedTerminalPassword === terminalData[0]) {
                    // If there was another duplicate request with a correct Connection hash
                    if (connectionClaimWithMatchingHash) {
                        foundMultipleWithCorrectHash = true;
                        // Logged below
                        duplicateConnectionClaimForTerminal[1](null, false, null);
                        continue;
                    }
                    connectionClaimWithMatchingHash = duplicateConnectionClaimForTerminal;
                }
                else {
                    if (!foundClaimsWithIncorrectHash) {
                        this.errorLogger.logError(log, ServerErrorType_1.ServerErrorType.DUPLICATE_INCOMING_DATABASE_KEYS_HAVE_INCORRECT_HASH, duplicateConnectionClaimForTerminal.messageFromTM.terminalCredentials, null);
                    }
                    foundClaimsWithIncorrectHash = true;
                    duplicateConnectionClaimForTerminal.connectionDataCallback(null, false, null);
                }
            }
            if (connectionClaimWithMatchingHash) {
                if (foundMultipleWithCorrectHash) {
                    this.errorLogger.logError(log, ServerErrorType_1.ServerErrorType.MULTIPLE_DUPLICATE_INCOMING_DATABASE_KEYS_HAVE_CORRECT_HASH, connectionClaimWithMatchingHash.messageFromTM.terminalCredentials, null);
                    connectionClaimWithMatchingHash.connectionDataCallback(null, false, null);
                    continue;
                }
                if (this.finishTerminalVerification(earliestAllowedLastConnectionDatetime, terminalId, connectionClaimWithMatchingHash, terminalData[1], repositoryIdSet, agtSharingMessageIdSet, pendingConnectionClaimsMap)) {
                    // This is a valid connection
                    pendingConnectionClaimsMap.set(terminalId, connectionClaimWithMatchingHash);
                    verifiedTerminalIdSet.add(terminalId);
                }
            }
        }
        // For any remaining duplicate requests (that had no matching terminal record)
        for (const connectionClaimsForTerminal of duplicatePendingConnectionClaimsMap.values()) {
            this.errorLogger.logError(log, ServerErrorType_1.ServerErrorType.DUPLICATE_INCOMING_DATABASE_KEYS_HAVE_NO_MATCHING_DATABASE, connectionClaimsForTerminal[0].messageFromTM.terminalCredentials, null);
            for (const ConnectionClaimForTerminal of connectionClaimsForTerminal) {
                ConnectionClaimForTerminal.connectionDataCallback(null, false, null);
            }
        }
    }
};
SyncConnectionVerifier = __decorate([
    Service_1.Service(InjectionTokens_1.SyncConnectionVerifierToken),
    __param(0, Inject_1.Inject(InjectionTokens_1.BlacklistToken)),
    __param(1, Inject_1.Inject(guideway_1.TerminalDaoToken)),
    __param(2, Inject_1.Inject(guideway_1.TerminalRepositoryDaoToken)),
    __param(3, Inject_1.Inject(guideway_1.AgtSharingMessageDaoToken)),
    __param(4, Inject_1.Inject(InjectionTokens_1.ErrorLoggerToken)),
    __metadata("design:paramtypes", [Object, Object, Object, Object, Object])
], SyncConnectionVerifier);
exports.SyncConnectionVerifier = SyncConnectionVerifier;
//# sourceMappingURL=SyncConnectionVerifier.js.map