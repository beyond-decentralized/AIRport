import {IShard, ShardId} from "@airport/airport-code";
import {
	DatabaseHash,
	DatabaseId,
	DatabaseKey,
	DatabaseOriginalShardId,
	DatabaseSyncLogState,
	getDatabaseKey,
	IDatabase,
	IDatabaseDao,
	IDatabaseRepositoryVerificationStageDao,
	IDatabaseVerificationStageDao,
	InsertDatabaseRepositoryVerificationStage,
	InsertDatabaseSyncLog,
	InsertDatabaseSyncLogVerificationStage,
	InsertDatabaseVerificationStage,
	InsertSyncRecord,
	IServer,
	RepositoryId,
	RepositoryOriginalShardId,
	SyncRecordAddDatetime
} from "@airport/guideway";
import {IBlacklist} from "../clientConnection/Blacklist";
import {
	ClientInMessage,
	DatabaseInfo,
	DatabaseSyncAck,
	PendingLoginClaim,
	RepositoryUpdateRequest,
	VerifiedClientPollMessages
} from "../model/ClientInMessage";
import {ConnectionDataCallback} from "../model/ClientOutMessage";
import {ServerErrorType} from "../model/ServerErrorType";
import {IErrorLogger} from "./common/ErrorLogger";
import {ArchivingStatus} from "@airport/guideway/lib/ddl/syncronization/ArchivingStatus";
import {InsertSyncRecordWOShardIds} from "@airport/guideway/lib/dao/SyncRecordDao";

export interface IPollLoginVerifier {

	blacklist: IBlacklist<string>;

	queueLoginClaim(
		pendingLoginClaim: PendingLoginClaim,
	): void;

	verifyPendingClaims(
		serverId: number,
		minMillisSinceLastConnection: number
	): Promise<VerifiedClientPollMessages>;

}

export class PollLoginVerifier
	implements IPollLoginVerifier {

	pendingLoginClaims: PendingLoginClaim[] = [];

	private runId = 0;

	constructor(
		public blacklist: IBlacklist<string>,
		private databaseDao: IDatabaseDao,
		private dbRepoVerificationStageDao: IDatabaseRepositoryVerificationStageDao,
		private dbVerificationStageDao: IDatabaseVerificationStageDao,
		private errorLogger: IErrorLogger,
		private server: IServer,
		private shard: IShard,
	) {
	}

	queueLoginClaim(
		pendingLoginClaim: PendingLoginClaim,
	): void {
		this.pendingLoginClaims.push(pendingLoginClaim);
	}

	/**
	 * Verify pending connection claims.
	 *
	 * Conserns:
	 *
	 * 1) How to handle valid user connections when a DDOS attack is randomly using their Database
	 * Original Shard Id and Database Id:
	 *
	 * a) When multiple login requests for the same Database credentials are detected, deny the
	 * request before it is recorded into the Database Repository staging table.
	 *
	 * b) Record a single record into a Database staging table only for databases where multiple
	 * requests per database are present.  Then find the correct database request via the provided
	 * hash and disallow the remaining ones.
	 *
	 * Implementing the second option, since a the priority is to have the server still syncing (in
	 * the presence of a DDOS attack).
	 *
	 * @param {number} serverId
	 * @param {number} minMillisSinceLastConnection
	 * @returns {Promise<VerifiedClientPollMessages>}
	 */
	async verifyPendingClaims(
		serverId: number,
		minMillisSinceLastConnection: number
	): Promise<VerifiedClientPollMessages> {
		this.runId++;
		const databaseSyncLogVerificationStageInserts: InsertDatabaseSyncLogVerificationStage[] = [];
		let syncRecordInserts: InsertSyncRecord[] = new Map();
		const syncRecordInsertMapForDbs: Map<ShardId, InsertSyncRecordWOShardIds[]> = new Map();
		const databaseSyncLogInserts: InsertDatabaseSyncLog[] = [];
		const databaseKeys: Set<DatabaseKey> = new Set();
		const connectionDataCallbackMapByDatabaseKey: Map<DatabaseKey, ConnectionDataCallback>
			= new Map();
		let syncRecordAddDatetime: SyncRecordAddDatetime = new Date().getTime();

		const currentLoginClaims = this.pendingLoginClaims;
		this.pendingLoginClaims = [];

		// If there are no records to be processed
		if (!currentLoginClaims.length) {
			return [databaseSyncLogVerificationStageInserts, syncRecordInsertMap, databaseSyncLogInserts,
				databaseKeys, connectionDataCallbackMapByDatabaseKey, syncRecordAddDatetime];
		}

		const pendingLoginClaimsMap: Map<DatabaseKey, PendingLoginClaim> = new Map();
		const repositoryVerificationRecordMap: Map<DatabaseKey, InsertDatabaseRepositoryVerificationStage[]>
			= new Map();
		await this.checkForDuplicatesAndInitializeDataStructures(
			currentLoginClaims,
			pendingLoginClaimsMap,
			repositoryVerificationRecordMap
		);

		// At this point we are guaranteed that in the present batch there are no duplicate
		// database requests

		let repositoryVerificationRecords: InsertDatabaseRepositoryVerificationStage[] = [];
		// build a flat array of RepositoryVerification records
		for (const repositoryVerificationRecordsForDatabase
			of repositoryVerificationRecordMap.values()) {
			repositoryVerificationRecords
				= repositoryVerificationRecords.concat(repositoryVerificationRecordsForDatabase);
		}
		// Record all incoming sync requests in a staging table
		await this.dbRepoVerificationStageDao.insertValues(repositoryVerificationRecords);

		// Join to Databases and DatabaseRepositories to verify that the incoming
		// records exist
		const loginVerificationRecords: Map<DatabaseHash, IDatabase> =
			await this.databaseDao.findDatabaseRepositoryVerificationRecords(
				this.shard.id, this.server.id, this.runId);

		syncRecordAddDatetime = new Date().getTime();

		const earliestAllowedLastConnectionDatetime
			= syncRecordAddDatetime - minMillisSinceLastConnection;
		VERIFICATION_RECORD:
			// For every verified database record
			for (const [databaseKey, database] of loginVerificationRecords) {
				const pendingLoginClaim = pendingLoginClaimsMap.get(databaseKey);
				const connectionDataCallback = pendingLoginClaim[1];
				const message: ClientInMessage = pendingLoginClaim[0];
				const databaseInfo: DatabaseInfo = message[1];
				const incomingDatabaseHash: DatabaseHash = databaseInfo[2];

				// If the secret hashes don't match (probably a hack or an attack)
				if (incomingDatabaseHash !== database.hash) {
					this.errorLogger.logError(
						ServerErrorType.INCOMING_DATABASE_HASH_DOES_NOT_MATCH,
						message[1],
						null
					);
					connectionDataCallback(null, false, null);
					continue VERIFICATION_RECORD;
				}

				// If the server connected too soon (probably a hack or an attack)
				if (database.lastPollConnectionDatetime > earliestAllowedLastConnectionDatetime) {
					this.errorLogger.logError(
						ServerErrorType.SYNC_CLIENT_CONNECTED_TOO_SOON,
						message[1],
						null
					);
					connectionDataCallback(null, false, null);
					continue VERIFICATION_RECORD;
				}

				// If the database got moved to a different shard (due to shard splitting)
				if (database.currentShard.id != this.shard.id) {
					// Forward the request to that shard
					const shardAddress = database.currentShard.address;
					connectionDataCallback(null, false, null, shardAddress, message);
					continue VERIFICATION_RECORD;
				}

				// Map out repositories by their original shard and repository id
				const databaseRepositoryMap: Map<RepositoryOriginalShardId, Map<RepositoryId, ShardId>> = new Map();
				for (const databaseRepository of database.databaseRepositories) {
					const originalShardId = databaseRepository.repository.originalShard.id;
					let dbRepoMapForOrigShard = databaseRepositoryMap.get(originalShardId);
					if (!dbRepoMapForOrigShard) {
						dbRepoMapForOrigShard = new Map();
						databaseRepositoryMap.set(originalShardId, dbRepoMapForOrigShard);
					}
					dbRepoMapForOrigShard.set(databaseRepository.repository.id, databaseRepository.repository.shard.id);
				}

				const repositoryUpdateRequests: RepositoryUpdateRequest[] = message[2];
				const syncRecordInsertsForDatabase: InsertSyncRecord[] = [];
				const syncRecordInsertMapForDatabase: Map<ShardId, InsertSyncRecordWOShardIds[]> = new Map();
				// Go though all repository update requests
				for (const repositoryUpdateRequest of repositoryUpdateRequests) {
					const claimedRepoOrigSharId = repositoryUpdateRequest[0];
					const claimedRepositoryId = repositoryUpdateRequest[1];
					const dbRepoForOrigShardMap = databaseRepositoryMap.get(claimedRepoOrigSharId);
					// If OriginalShardId for a given incoming repository update request is not found
					// then it's not a valid request
					if (!dbRepoForOrigShardMap) {
						this.errorLogger.logError(
							ServerErrorType.INCOMING_REPOSITORY_ORIGINAL_SHARD_ID_NOT_FOUND,
							databaseInfo,
							[claimedRepoOrigSharId, claimedRepositoryId]
						);
						connectionDataCallback(null, false, null);
						continue VERIFICATION_RECORD;
					}
					// If RepositoryId for a given incoming repository update request is not found
					// then it's not a valid request
					const currentShardId = dbRepoForOrigShardMap.get(claimedRepositoryId);
					if (!currentShardId) {
						this.errorLogger.logError(
							ServerErrorType.INCOMING_REPOSITORY_REPOSITORY_ID_NOT_FOUND,
							databaseInfo,
							[claimedRepoOrigSharId, claimedRepositoryId]
						);
						connectionDataCallback(null, false, null);
						continue VERIFICATION_RECORD;
					}


					if (currentShardId === this.shard.id) {
						syncRecordInsertsForDatabase.push([
							this.shard.id, this.shard.id,
							this.shard.id, claimedRepoOrigSharId, claimedRepositoryId,
							databaseInfo[0], databaseInfo[1],
							database.user.originalShard.id, database.user.id,
							ArchivingStatus.NOT_ARCHIVING, syncRecordAddDatetime,
							true, repositoryUpdateRequest[2]
						]);
					} else {
						let syncRecordInsertsForDb = syncRecordInsertMapForDatabase.get(currentShardId);
						if (!syncRecordInsertsForDb) {
							syncRecordInsertsForDb = [];
							syncRecordInsertMapForDatabase.set(currentShardId, syncRecordInsertsForDb);
						}
						syncRecordInsertsForDb.push([
							claimedRepoOrigSharId, claimedRepositoryId,
							databaseInfo[0], databaseInfo[1],
							database.user.originalShard.id, database.user.id,
							ArchivingStatus.NOT_ARCHIVING, syncRecordAddDatetime,
							true, repositoryUpdateRequest[2]
						])
					}
				}

				// The login claim has been verified, remove it for the Pending Map
				pendingLoginClaimsMap.delete(databaseKey);


				// Find all shards to which we should add the Sync Records,
				// if an affected Repository later get assigned to a Database in
				// a shard that is not in this list, all sync records for that Repository
				// get copied into the new shard.
				// The may be a potential for a Repository to get added to a Database
				// while the current transaction is in progress, in which case the current
				// record may get not get copied to the right shard.  Also, there might
				// be other possible scenarios where the list of sync records are out of
				// sync on any number of shards.  All of these cases get handled via the
				// client side Database reposolution mechanism, which hashes every sync
				// for a given repository with the previous hash.  If the hashes that it
				// receives from the server are different then a re-syncing process is
				// initiated by the Databases that detect sync discrepancies.
				// Hence, current query covers only the happy path.
				syncRecordInserts = syncRecordInserts.concat(syncRecordInsertsForDatabase);

				// At this point only the verification of database sync ACKs is left
				// the database is assumed to be valid and any sync acks it might have
				// affect only itself.  So verification of sync ACKs is passive, a
				// connection is not invalidated if it sends back invalid sync ACKs.
				// NOTE: for ACKs all invalid ACK requests simply get dropped and
				// valid ones get marked as acked

				const databaseOriginalShardId = database.originalShard.id;
				const databaseId = database.id;
				databaseKeys.add(databaseKey);

				const databasesSyncAcks: DatabaseSyncAck[] = message[3];
				// For every incoming database sync ack
				for (const databaseSyncAck of databasesSyncAcks) {
					databaseSyncLogVerificationStageInserts.push([
						this.shard.id, this.server.id, this.runId,
						databaseSyncAck[0], databaseSyncAck[1],
						databaseOriginalShardId, databaseId]);
				}

				for (const repositoryUpdateRequest of repositoryUpdateRequests) {
					syncRecordInsertsForDatabase.push([repositoryUpdateRequest[0], databaseId, database.user.id,
						syncRecordAddDatetime, true, repositoryUpdateRequest[1]]);
				}
				databaseSyncLogInserts.push([databaseId, DatabaseSyncLogState.RECORDS_SENT_TO_DATABASE]);
				connectionDataCallbackMapByDatabaseKey.set(databaseKey, connectionDataCallback);

				connectionDataCallback(databaseId, true, null);
			}

		// For every database that wasn't in the DATABASES table (probably a hack or an attack)
		for (const [databaseKey, pendingLoginClaim] of pendingLoginClaimsMap) {
			const clientInMessage: ClientInMessage = pendingLoginClaim[0];
			this.errorLogger.logError(
				ServerErrorType.INCOMING_DATABASE_RECORD_WASNT_IN_DATABASES_TABLE,
				clientInMessage[1],
				null
			);
			pendingLoginClaim[1](null, false, null);
		}

		// Let update run in background, nothing depends on it being finished
		this.updateLastLoginTimeAndCleanupDbRepoVerificationStage(syncRecordAddDatetime).then();

		return [databaseSyncLogVerificationStageInserts, syncRecordInserts, databaseSyncLogInserts,
			databaseKeys, connectionDataCallbackMapByDatabaseKey, syncRecordAddDatetime];
	}

	private async checkForDuplicatesAndInitializeDataStructures(
		currentLoginClaims: PendingLoginClaim[],
		pendingLoginClaimsMap: Map<DatabaseKey, PendingLoginClaim>,
		repositoryVerificationRecordMap: Map<DatabaseKey, InsertDatabaseRepositoryVerificationStage[]>
	) {
		const databaseKeys: Set<DatabaseKey> = new Set();
		const databaseVerificationStageInserts: InsertDatabaseVerificationStage[] = [];
		const duplicatePendingLoginClaimsMap: Map<DatabaseKey, PendingLoginClaim[]> = new Map();


		// For every batched login claim
		for (const currentLoginClaim of currentLoginClaims) {
			const message: ClientInMessage = currentLoginClaim[0];
			const databaseInfo: DatabaseInfo = message[1];
			const databaseOriginalShardId = databaseInfo[0];
			const databaseId = databaseInfo[1];
			const databaseKey = getDatabaseKey(databaseOriginalShardId, databaseId);
			// If a request from the same database came more than once (probably a hack or an attack)
			// NOTE: These attacks are most likely random, since there is no way for an attacker to know
			// which database id belongs to which user (this is most likely a DDOS attack)
			if (databaseKeys.has(databaseKey)) {
				const previousLoginClaim = pendingLoginClaimsMap.get(databaseKey);
				let duplicatePendingLoginClaimsMapForDatabase: PendingLoginClaim[]
					= duplicatePendingLoginClaimsMap.get(databaseKey);
				if (previousLoginClaim) {
					databaseVerificationStageInserts.push([
						this.server.id, this.runId, this.shard.id,
						databaseOriginalShardId, databaseId
					]);
					duplicatePendingLoginClaimsMapForDatabase = [];
					duplicatePendingLoginClaimsMapForDatabase.push(previousLoginClaim);
					duplicatePendingLoginClaimsMap.set(databaseKey,
						duplicatePendingLoginClaimsMapForDatabase);
					pendingLoginClaimsMap.delete(databaseKey);
					repositoryVerificationRecordMap.delete(databaseKey);
					this.errorLogger.logError(
						ServerErrorType.INCOMING_DATABASE_KEY_APPEARS_MORE_THAN_ONCE_IN_THE_BATCH,
						databaseInfo,
						null
					);
				} else {

				}
				duplicatePendingLoginClaimsMapForDatabase.push(currentLoginClaim);
				continue;
			}

			this.setDbRepositoryVerificationInfo(
				databaseOriginalShardId,
				databaseId,
				databaseKey,
				currentLoginClaim,
				message[2],
				databaseKeys,
				pendingLoginClaimsMap,
				repositoryVerificationRecordMap
			);

		}

		// If there where duplicate requests per database
		if (databaseVerificationStageInserts.length) {
			await this.filterDuplicateRequestsPerDatabase(
				databaseVerificationStageInserts,
				duplicatePendingLoginClaimsMap,
				databaseKeys,
				pendingLoginClaimsMap,
				repositoryVerificationRecordMap
			)
		}
	}

	private setDbRepositoryVerificationInfo(
		databaseOriginalShardId: DatabaseOriginalShardId,
		databaseId: DatabaseId,
		databaseKey: DatabaseKey,
		currentLoginClaim: PendingLoginClaim,
		repositoryUpdateRequests: RepositoryUpdateRequest[],
		databaseKeys: Set<DatabaseKey>,
		pendingLoginClaimsMap: Map<DatabaseKey, PendingLoginClaim>,
		repositoryVerificationRecordMap: Map<DatabaseKey, InsertDatabaseRepositoryVerificationStage[]>
	): void {
		databaseKeys.add(databaseKey);

		const repositoryVerificationRecords: InsertDatabaseRepositoryVerificationStage[] = [];
		// const repositoryData: RepositoryUpdateRequest[] = message[2];
		// If no repository data was sent in to be synced
		if (!repositoryUpdateRequests.length) {
			repositoryVerificationRecords.push([
				this.server.id, this.runId, this.shard.id,
				databaseOriginalShardId, databaseId,
				0, 0
			]);
		}
		// For every repository data record sent in
		for (const repositoryDataRow of repositoryUpdateRequests) {
			repositoryVerificationRecords.push([
				this.server.id, this.runId, this.shard.id,
				databaseOriginalShardId, databaseId,
				repositoryDataRow[0], repositoryDataRow[1]
			]);
		}
		pendingLoginClaimsMap.set(databaseKey, currentLoginClaim);
		repositoryVerificationRecordMap.set(databaseKey, repositoryVerificationRecords);
	}

	private async filterDuplicateRequestsPerDatabase(
		databaseVerificationStageInserts: InsertDatabaseVerificationStage[],
		duplicatePendingLoginClaimsMap: Map<DatabaseKey, PendingLoginClaim[]>,
		databaseKeys: Set<DatabaseKey>,
		pendingLoginClaimsMap: Map<DatabaseKey, PendingLoginClaim>,
		repositoryVerificationRecordMap: Map<DatabaseKey, InsertDatabaseRepositoryVerificationStage[]>
	) {
		await this.dbVerificationStageDao.insertValues(databaseVerificationStageInserts);
		const dbHashMapByDbKey = await this.databaseDao.findDatabaseVerificationRecords(
			this.shard.id, this.server.id, this.runId);
		// For every set of duplicate requests per database
		for (const [databaseKey, duplicateLoginClaimsForDatabase] of duplicatePendingLoginClaimsMap) {
			const databaseHash = dbHashMapByDbKey.get(databaseKey);

			// If no database was found for duplicate requests
			if (!databaseHash) {
				continue;
			}
			duplicatePendingLoginClaimsMap.delete(databaseKey);

			let loginClaimWithMatchingHash: PendingLoginClaim;
			let foundMultipleWithCorrectHash = false;
			let foundClaimsWithIncorrectHash = false;
			// For every duplicate login claim for a given database
			for (const dulplicateLoginClaimForDatabase of duplicateLoginClaimsForDatabase) {
				const claimedDatabaseHash = dulplicateLoginClaimForDatabase[0][1][2];
				// If the claims databaseHash is correct
				if (claimedDatabaseHash === databaseHash) {
					// If there was another duplicate request with a correct login hash
					if (loginClaimWithMatchingHash) {
						foundMultipleWithCorrectHash = true;
						dulplicateLoginClaimForDatabase[1](null, false, null);
						continue;
					}
					loginClaimWithMatchingHash = dulplicateLoginClaimForDatabase;
				} else {
					if (!foundClaimsWithIncorrectHash) {
						this.errorLogger.logError(
							ServerErrorType.DUPLICATE_INCOMING_DATABASE_KEYS_HAVE_WITH_INCORRECT_HASH,
							dulplicateLoginClaimForDatabase[0][1],
							null
						);
					}
					foundClaimsWithIncorrectHash = true;
					dulplicateLoginClaimForDatabase[1](null, false, null);
				}
			}

			if (loginClaimWithMatchingHash) {
				if (foundMultipleWithCorrectHash) {
					this.errorLogger.logError(
						ServerErrorType.MULTIPLE_DUPLICATE_INCOMING_DATABASE_KEYS_HAVE_WITH_CORRECT_HASH,
						loginClaimWithMatchingHash[0][1],
						null
					);
					loginClaimWithMatchingHash[1](null, false, null);
					continue;
				}
				const clientInMessage = loginClaimWithMatchingHash[0];
				this.setDbRepositoryVerificationInfo(
					clientInMessage[1][0],
					clientInMessage[1][1],
					databaseKey,
					loginClaimWithMatchingHash,
					clientInMessage[2],
					databaseKeys,
					pendingLoginClaimsMap,
					repositoryVerificationRecordMap
				);
			}
		}

		// For any remaining duplicate requests (that had no matching database record)
		for (const [databaseKey, loginClaimsForDatabase] of duplicatePendingLoginClaimsMap) {
			this.errorLogger.logError(
				ServerErrorType.DUPLICATE_INCOMING_DATABASE_KEYS_HAVE_NO_MATCHING_DATABASE,
				loginClaimsForDatabase[0][0][1],
				null
			);
			for (const loginClaimForDatabase of loginClaimsForDatabase) {
				loginClaimForDatabase[1](null, false, null);
			}
		}

		// Cleanup the Database Verification Stage records
		// asynchronously - don't block further processing
		this.dbVerificationStageDao.deleteForServerRun(this.shard.id, this.server.id, this.runId)
			.then();
	}

	private async updateLastLoginTimeAndCleanupDbRepoVerificationStage(
		syncRecordAddDatetime: SyncRecordAddDatetime,
	): Promise<void> {
		await this.databaseDao.updateLastPollConnectionDatetime(
			this.shard.id, this.server.id, this.runId, syncRecordAddDatetime).then();
		await this.dbRepoVerificationStageDao
			.deleteForServerRun(this.shard.id, this.server.id, this.runId).then();
	}
}