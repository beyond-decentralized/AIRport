import {Inject, Service}          from "typedi";
import {SyncInActorCheckerToken}  from "../../../../../apps/terminal/src/InjectionTokens";
import {
	ActorDaoToken,
	ActorId,
	ActorRandomId,
	DatabaseDaoToken,
	DatabaseId,
	DatabaseName,
	DatabaseSecondId,
	IActor,
	IActorDao,
	IDatabaseDao,
	UserUniqueId
}                                 from "@airport/holding-pattern";
import {IDataToTM, RemoteActorId} from "../SyncInUtils";
import {IUtils, UtilsToken}       from "@airport/air-control";
import {UserCheckResults}         from "./SyncInUserChecker";
import {DatabaseCheckResults}     from "./SyncInDatabaseChecker";

export interface ActorCheckResults {
	actorMap: Map<ActorRandomId, Map<UserUniqueId,
		Map<DatabaseName, Map<DatabaseSecondId, Map<UserUniqueId, IActor>>>>>;
	actorMapById: Map<ActorId, IActor>;
	consistentMessages: IDataToTM[];
	inconsistentMessages: IDataToTM[];
}

export interface ISyncInActorChecker {

	ensureActorsAndGetAsMaps(
		dataMessages: IDataToTM[],
		actorMap: Map<UserUniqueId, Map<DatabaseName,
			Map<DatabaseSecondId, Map<UserUniqueId, IActor>>>>,
		actorMapById: Map<ActorId, IActor>,
		userCheckResults: UserCheckResults,
		databaseCheckResults: DatabaseCheckResults
	): Promise<ActorCheckResults>;

}

@Service(SyncInActorCheckerToken)
export class SyncInActorChecker
	implements ISyncInActorChecker {

	constructor(
		@Inject(ActorDaoToken)
		private actorDao: IActorDao,
		@Inject(DatabaseDaoToken)
		private databaseDao: IDatabaseDao,
		@Inject(UtilsToken)
		private utils: IUtils,
	) {
	}

	async ensureActorsAndGetAsMaps(
		dataMessages: IDataToTM[],
		actorMap: Map<UserUniqueId, Map<DatabaseName,
			Map<DatabaseSecondId, Map<UserUniqueId, IActor>>>>,
		actorMapById: Map<ActorId, IActor>,
		userCheckResults: UserCheckResults,
		databaseCheckResults: DatabaseCheckResults
	): Promise<ActorCheckResults> {
		const actorRandomIdSet: Set<ActorRandomId> = new Set();
		const userUniqueIdsSet: Set<UserUniqueId> = new Set();
		const databaseNameSet: Set<DatabaseName> = new Set();
		const databaseSecondIdSet: Set<DatabaseSecondId> = new Set();
		const ownerUniqueIdSet: Set<UserUniqueId> = new Set();

		const consistentMessages: IDataToTM[] = [];
		const inconsistentMessages: IDataToTM[] = [];
		// split messages by repository and record actor information
		for (const message of dataMessages) {
			if (!this.areActorIdsConsistentInMessage(message)) {
				inconsistentMessages.push(message);
				continue;
			}
			const data = message.data;
			databaseNameSet.add(data.database.name);
			databaseSecondIdSet.add(data.database.secondId);
			ownerUniqueIdSet.add(data.database.owner.uniqueId);

			consistentMessages.push(message);

			for (const actor of data.actors) {
				actorRandomIdSet.add(actor.randomId);
				userUniqueIdsSet.add(actor.user.uniqueId);
			}
		}

		const databaseMapByGlobalIds = await this.databaseDao.findMapByGlobalIds(
			Array.from(ownerUniqueIdSet),
			Array.from(databaseNameSet),
			Array.from(databaseSecondIdSet)
		);


		const databaseIdSet: Set<DatabaseId> = new Set();
		for (const message of dataMessages) {
			const database = message.data.database;
			const databaseId = databaseMapByGlobalIds
				.get(database.owner.uniqueId)
				.get(database.name).get(database.secondId).id;
			databaseIdSet.add(databaseId);
		}

		// NOTE: remote actors should not contain database info, it should be populated here
		// this is because a given RTB is always generated in one and only one database

		await this.actorDao.findMapsWithDetailsByGlobalIds(
			Array.from(actorRandomIdSet),
			Array.from(userUniqueIdsSet),
			Array.from(databaseIdSet),
			actorMap,
			actorMapById);

		const newActors: IActor[] = this.getNewActors(consistentMessages, actorMap);
		await this.actorDao.bulkCreate(newActors, false, false);

		for (const newActor of newActors) {
			actorMapById.set(newActor.id, newActor);
		}

		this.updateActorIdsInMessages(actorMap, consistentMessages);

		return {
			actorMap,
			actorMapById,
			consistentMessages,
			inconsistentMessages
		};
	}

	private areActorIdsConsistentInMessage(
		message: IDataToTM
	): boolean {
		const actorIdSet: Set<ActorId> = new Set();
		const usedActorIdSet: Set<ActorId> = new Set();
		for (const actor of message.data.actors) {
			actorIdSet.add(actor.id);
		}

		const data = message.data;
		for (const repoTransHistory of data.repoTransHistories) {
			const transactionRemoteActorId = repoTransHistory.actor.id;
			if (!actorIdSet.has(transactionRemoteActorId)) {
				return false;
			}
			usedActorIdSet.add(transactionRemoteActorId);
			for (const operationHistory of repoTransHistory.operationHistory) {
				for (const recordHistory of operationHistory.recordHistory) {
					const recordRemoteActorId = recordHistory.actor.id;
					if (!actorIdSet.has(recordRemoteActorId)) {
						return false;
					}
					usedActorIdSet.add(recordRemoteActorId);
				}
			}
		}

		return actorIdSet.size === usedActorIdSet.size;
	}

	private updateActorIdsInMessages(
		actorMap: Map<ActorRandomId, Map<UserUniqueId,
			Map<DatabaseName, Map<DatabaseSecondId, Map<UserUniqueId, IActor>>>>>,
		dataMessages: IDataToTM[]
	): void {
		for (const message of dataMessages) {
			const messageActorMapByRemoteId: Map<RemoteActorId, IActor> = new Map();
			const updatedActors: IActor[] = [];
			for (const actor of message.data.actors) {
				const localActor: IActor = actorMap
					.get(actor.randomId)
					.get(actor.user.uniqueId)
					.get(actor.database.name)
					.get(actor.database.secondId)
					.get(actor.database.owner.uniqueId);
				updatedActors.push(localActor);
				messageActorMapByRemoteId.set(actor.id, localActor);
			}
			const data = message.data;
			data.actors = updatedActors;
			for (const repoTransHistory of data.repoTransHistories) {
				const transactionRemoteActorId = repoTransHistory.actor.id;
				const transactionLocalActor = messageActorMapByRemoteId.get(transactionRemoteActorId);
				repoTransHistory.actor.id = transactionLocalActor.id;
				for (const operationHistory of repoTransHistory.operationHistory) {
					for (const recordHistory of operationHistory.recordHistory) {
						const recordRemoteActorId = recordHistory.actor.id;
						const recordLocalActor = messageActorMapByRemoteId.get(recordRemoteActorId);
						recordHistory.actor.id = recordLocalActor.id;
					}
				}
			}
		}
	}

	private getNewActors(
		dataMessages: IDataToTM[],
		actorMap: Map<ActorRandomId, Map<UserUniqueId, Map<DatabaseName,
			Map<DatabaseSecondId, Map<UserUniqueId, ActorId>>>>>
	): IActor[] {
		const newActorMap: Map<ActorRandomId, Map<UserUniqueId, Map<DatabaseName,
			Map<DatabaseSecondId, Map<UserUniqueId, IActor>>>>> = new Map();

		// split messages by repository
		for (const message of dataMessages) {
			for (let actor of message.data.actors) {
				actor = {
					id: undefined,
					...actor,
				};
				const actorsForRandomId = actorMap.get(actor.randomId);
				if (!actorsForRandomId) {
					this.addActorToMap(actor, newActorMap);
					this.addActorToMap(actor, actorMap);
					break;
				}
				const actorsForUserUniqueId = actorsForRandomId.get(actor.user.uniqueId);
				if (!actorsForUserUniqueId) {
					this.addActorToMap(actor, newActorMap);
					this.addActorToMap(actor, actorMap);
					break;
				}
				const actorsForDatabaseName = actorsForUserUniqueId.get(actor.database.name);
				if (!actorsForDatabaseName) {
					this.addActorToMap(actor, newActorMap);
					this.addActorToMap(actor, actorMap);
					break;
				}
				const actorsForDatabaseSecondId
					= actorsForDatabaseName.get(actor.database.secondId);
				if (!actorsForDatabaseSecondId) {
					this.addActorToMap(actor, newActorMap);
					this.addActorToMap(actor, actorMap);
					break;
				}
				const existingActor = actorsForDatabaseSecondId.get(actor.database.owner.uniqueId);
				if (!existingActor) {
					this.addActorToMap(actor, newActorMap);
					this.addActorToMap(actor, actorMap);
					break;
				}
			}
		}

		const newActors: IActor[] = [];
		for (const [actorRandomId, actorsForRandomId] of newActorMap) {
			for (const [userUniqueId, actorsForUserUniqueId] of actorsForRandomId) {
				for (const [databaseName, actorsForDatabaseName] of actorsForUserUniqueId) {
					for (const [databaseSecondId, actorsForDatabaseSecondId]
						of actorsForDatabaseName) {
						for (const [databaseOwnerUniqueId, actor] of actorsForDatabaseSecondId) {
							newActors.push(actor);
						}
					}
				}
			}
		}

		return newActors;
	}

	private addActorToMap(
		actor: IActor,
		actorMap: Map<ActorRandomId, Map<UserUniqueId, Map<DatabaseName,
			Map<DatabaseSecondId, Map<UserUniqueId, IActor>>>>>
	): void {
		this.utils.ensureChildJsMap(
			this.utils.ensureChildJsMap(
				this.utils.ensureChildJsMap(
					this.utils.ensureChildJsMap(actorMap, actor.randomId),
					actor.user.uniqueId),
				actor.database.name),
			actor.database.secondId).set(actor.database.owner.uniqueId, actor);
	}

}
