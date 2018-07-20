import {Inject, Service}            from "typedi";
import {SyncInDatabaseCheckerToken} from "../../../../../apps/terminal/src/InjectionTokens";
import {
	DatabaseDaoToken,
	DatabaseName,
	DatabaseSecondId,
	IDatabase,
	IDatabaseDao,
	IUser,
	UserId,
	UserUniqueId
}                                   from "@airport/holding-pattern";
import {IUtils, UtilsToken}         from "@airport/air-control";
import {IDataToTM}                  from "../SyncInUtils";
import {UserCheckResults}           from "./SyncInUserChecker";

export interface DatabaseCheckResults {
	mapByMessageIndex: IDatabase[];
	consistentMessages: IDataToTM[];
	inconsistentMessages: IDataToTM[];
}

export interface ISyncInDatabaseChecker {

}

@Service(SyncInDatabaseCheckerToken)
export class SyncInDatabaseChecker
	implements ISyncInDatabaseChecker {

	constructor(
		@Inject(DatabaseDaoToken)
		private databaseDao: IDatabaseDao,
		@Inject(UtilsToken)
		private utils: IUtils,
	) {
	}

	async ensureDatabasesAndGetAsMaps(
		dataMessages: IDataToTM[],
		localDatabase: IDatabase,
		userCheckResults: UserCheckResults
	): Promise<DatabaseCheckResults> {
		const remoteDatabaseMapByUniqueIds: Map<UserUniqueId,
			Map<DatabaseName, Map<DatabaseSecondId, IDatabase>>> = new Map();
		const databaseNameSet: Set<DatabaseName> = new Set();
		const databaseSecondIdSet: Set<DatabaseSecondId> = new Set();
		const ownerIdSet: Set<UserId> = new Set();
		const mapByMessageIndex: IDatabase[] = [];

		const consistentMessages: IDataToTM[] = [];
		const inconsistentMessages: IDataToTM[] = [];
		// record database information
		dataMessages.forEach((
			message,
			index
		) => {
			this.recordDatabaseInformation(message, index, userCheckResults,
				localDatabase, consistentMessages, inconsistentMessages,
				databaseNameSet, databaseSecondIdSet, ownerIdSet,
				remoteDatabaseMapByUniqueIds, mapByMessageIndex);
		});


		const databaseMapByIds = await this.databaseDao.findMapByIds(
			Array.from(ownerIdSet),
			Array.from(databaseNameSet),
			Array.from(databaseSecondIdSet)
		);

		await this.addMissingDatabases(remoteDatabaseMapByUniqueIds, databaseMapByIds,
			userCheckResults);

		return {
			mapByMessageIndex,
			consistentMessages,
			inconsistentMessages
		};
	}

	private recordDatabaseInformation(
		message: IDataToTM,
		index,
		userCheckResults: UserCheckResults,
		localDatabase: IDatabase,
		consistentMessages: IDataToTM[],
		inconsistentMessages: IDataToTM[],
		databaseNameSet: Set<DatabaseName>,
		databaseSecondIdSet: Set<DatabaseSecondId>,
		ownerIdSet: Set<UserId>,
		remoteDatabaseMapByUniqueIds: Map<UserUniqueId,
			Map<DatabaseName, Map<DatabaseSecondId, IDatabase>>>,
		mapByMessageIndex: IDatabase[]
	) {
		let database = message.data.database;
		const userMapForMessageByRemoteUserId
			= userCheckResults.mapByMessageIndexAndRemoteUserId[index];

		const owner = userMapForMessageByRemoteUserId.get(database.owner.id);
		if (!this.areDatabaseIdsConsistentInMessageData(
			database, localDatabase, owner)) {
			inconsistentMessages.push(message);
			userCheckResults.mapByMessageIndexAndRemoteUserId.splice(index);
			return;
		}
		database = {
			...database,
			owner
		};
		databaseNameSet.add(database.name);
		databaseSecondIdSet.add(database.secondId);
		ownerIdSet.add(owner.id);

		this.utils.ensureChildJsMap(
			this.utils.ensureChildJsMap(remoteDatabaseMapByUniqueIds,
				owner.uniqueId),
			database.name)
			.set(database.secondId, database);

		mapByMessageIndex.push(database);
		consistentMessages.push(message);
	}

	private areDatabaseIdsConsistentInMessageData(
		database: IDatabase,
		localDatabase: IDatabase,
		ownerUser: IUser
	): boolean {
		if (localDatabase.owner.uniqueId === ownerUser.uniqueId
			&& localDatabase.name === database.name
			&& localDatabase.secondId === database.secondId) {
			// Database should never receive messages from itself
			return false;
		}

		return true;
	}

	private async addMissingDatabases(
		remoteDatabaseMapByUniqueIds: Map<UserUniqueId,
			Map<DatabaseName, Map<DatabaseSecondId, IDatabase>>>,
		databaseMapByIds: Map<UserId, Map<DatabaseName, Map<DatabaseSecondId, IDatabase>>>,
		userCheckResults: UserCheckResults
	): Promise<void> {
		const userMap = userCheckResults.map;
		const newDatabases: IDatabase[] = [];
		for (const [userUniqueId, remoteDatabaseMapByDbUniqueIds] of remoteDatabaseMapByUniqueIds) {

			const owner = userMap.get(userUniqueId);
			const databaseMapByDbUniqueIds = databaseMapByIds.get(owner.id);

			for (const [name, remoteDatabaseMapBySecondId] of remoteDatabaseMapByDbUniqueIds) {
				let databaseMapBySecondId: Map<DatabaseSecondId, IDatabase>;
				if (databaseMapByDbUniqueIds) {
					databaseMapBySecondId = databaseMapByDbUniqueIds.get(name);
				}

				for (const [secondId, remoteDatabase] of remoteDatabaseMapBySecondId) {
					let database: IDatabase;
					if (databaseMapBySecondId) {
						database = databaseMapBySecondId.get(secondId);
					}

					if (!database) {
						delete remoteDatabase.id;
						remoteDatabase.isLocal = false;
						newDatabases.push(remoteDatabase);
					} else {
						remoteDatabase.id = database.id;
					}
				}
			}
		}

		if (newDatabases.length) {
			await this.databaseDao.bulkCreate(newDatabases, false, false);
		}
	}

}