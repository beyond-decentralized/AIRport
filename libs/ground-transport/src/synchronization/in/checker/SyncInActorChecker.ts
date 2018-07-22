import {
	IUtils,
	UtilsToken
}                                from "@airport/air-control";
import {
	ActorDaoToken,
	ActorId,
	ActorRandomId,
	IActor,
	IActorDao,
	ITerminalDao,
	TerminalDaoToken,
	TerminalId,
	TerminalName,
	TerminalSecondId,
	UserUniqueId
}                                from "@airport/holding-pattern";
import {
	Inject,
	Service
}                                from "typedi";
import {SyncInActorCheckerToken} from "../../../InjectionTokens";
import {
	IDataToTM,
	RemoteActorId
}                                from "../SyncInUtils";
import {TerminalCheckResults}    from "./SyncInTerminalChecker";
import {UserCheckResults}        from "./SyncInUserChecker";

export interface ActorCheckResults {
	actorMap: Map<ActorRandomId, Map<UserUniqueId,
		Map<TerminalName, Map<TerminalSecondId, Map<UserUniqueId, IActor>>>>>;
	actorMapById: Map<ActorId, IActor>;
	consistentMessages: IDataToTM[];
	inconsistentMessages: IDataToTM[];
}

export interface ISyncInActorChecker {

	ensureActorsAndGetAsMaps(
		dataMessages: IDataToTM[],
		actorMap: Map<UserUniqueId, Map<TerminalName,
			Map<TerminalSecondId, Map<UserUniqueId, IActor>>>>,
		actorMapById: Map<ActorId, IActor>,
		userCheckResults: UserCheckResults,
		terminalCheckResults: TerminalCheckResults
	): Promise<ActorCheckResults>;

}

@Service(SyncInActorCheckerToken)
export class SyncInActorChecker
	implements ISyncInActorChecker {

	constructor(
		@Inject(ActorDaoToken)
		private actorDao: IActorDao,
		@Inject(TerminalDaoToken)
		private terminalDao: ITerminalDao,
		@Inject(UtilsToken)
		private utils: IUtils,
	) {
	}

	async ensureActorsAndGetAsMaps(
		dataMessages: IDataToTM[],
		actorMap: Map<UserUniqueId, Map<TerminalName,
			Map<TerminalSecondId, Map<UserUniqueId, IActor>>>>,
		actorMapById: Map<ActorId, IActor>,
		userCheckResults: UserCheckResults,
		terminalCheckResults: TerminalCheckResults
	): Promise<ActorCheckResults> {
		const actorRandomIdSet: Set<ActorRandomId> = new Set();
		const userUniqueIdsSet: Set<UserUniqueId> = new Set();
		const terminalNameSet: Set<TerminalName> = new Set();
		const terminalSecondIdSet: Set<TerminalSecondId> = new Set();
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
			terminalNameSet.add(data.terminal.name);
			terminalSecondIdSet.add(data.terminal.secondId);
			ownerUniqueIdSet.add(data.terminal.owner.uniqueId);

			consistentMessages.push(message);

			for (const actor of data.actors) {
				actorRandomIdSet.add(actor.randomId);
				userUniqueIdsSet.add(actor.user.uniqueId);
			}
		}

		const terminalMapByGlobalIds = await this.terminalDao.findMapByGlobalIds(
			Array.from(ownerUniqueIdSet),
			Array.from(terminalNameSet),
			Array.from(terminalSecondIdSet)
		);


		const terminalIdSet: Set<TerminalId> = new Set();
		for (const message of dataMessages) {
			const terminal = message.data.terminal;
			const terminalId = terminalMapByGlobalIds
				.get(terminal.owner.uniqueId)
				.get(terminal.name).get(terminal.secondId).id;
			terminalIdSet.add(terminalId);
		}

		// NOTE: remote actors should not contain terminal info, it should be populated here
		// this is because a given RTB is always generated in one and only one terminal

		await this.actorDao.findMapsWithDetailsByGlobalIds(
			Array.from(actorRandomIdSet),
			Array.from(userUniqueIdsSet),
			Array.from(terminalIdSet),
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
			Map<TerminalName, Map<TerminalSecondId, Map<UserUniqueId, IActor>>>>>,
		dataMessages: IDataToTM[]
	): void {
		for (const message of dataMessages) {
			const messageActorMapByRemoteId: Map<RemoteActorId, IActor> = new Map();
			const updatedActors: IActor[] = [];
			for (const actor of message.data.actors) {
				const localActor: IActor = actorMap
					.get(actor.randomId)
					.get(actor.user.uniqueId)
					.get(actor.terminal.name)
					.get(actor.terminal.secondId)
					.get(actor.terminal.owner.uniqueId);
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
		actorMap: Map<ActorRandomId, Map<UserUniqueId, Map<TerminalName,
			Map<TerminalSecondId, Map<UserUniqueId, ActorId>>>>>
	): IActor[] {
		const newActorMap: Map<ActorRandomId, Map<UserUniqueId, Map<TerminalName,
			Map<TerminalSecondId, Map<UserUniqueId, IActor>>>>> = new Map();

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
				const actorsForTerminalName = actorsForUserUniqueId.get(actor.terminal.name);
				if (!actorsForTerminalName) {
					this.addActorToMap(actor, newActorMap);
					this.addActorToMap(actor, actorMap);
					break;
				}
				const actorsForTerminalSecondId
					= actorsForTerminalName.get(actor.terminal.secondId);
				if (!actorsForTerminalSecondId) {
					this.addActorToMap(actor, newActorMap);
					this.addActorToMap(actor, actorMap);
					break;
				}
				const existingActor = actorsForTerminalSecondId.get(actor.terminal.owner.uniqueId);
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
				for (const [terminalName, actorsForTerminalName] of actorsForUserUniqueId) {
					for (const [terminalSecondId, actorsForTerminalSecondId]
						of actorsForTerminalName) {
						for (const [terminalOwnerUniqueId, actor] of actorsForTerminalSecondId) {
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
		actorMap: Map<ActorRandomId, Map<UserUniqueId, Map<TerminalName,
			Map<TerminalSecondId, Map<UserUniqueId, IActor>>>>>
	): void {
		this.utils.ensureChildJsMap(
			this.utils.ensureChildJsMap(
				this.utils.ensureChildJsMap(
					this.utils.ensureChildJsMap(actorMap, actor.randomId),
					actor.user.uniqueId),
				actor.terminal.name),
			actor.terminal.secondId).set(actor.terminal.owner.uniqueId, actor);
	}

}
