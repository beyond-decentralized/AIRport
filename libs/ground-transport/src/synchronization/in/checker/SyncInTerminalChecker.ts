import {
	TerminalName,
	TerminalSecondId
}                                 from '@airport/arrivals-n-departures'
import {container, DI}                       from '@airport/di'
import {
	CascadeOverwrite,
	ensureChildJsMap
}                                 from '@airport/ground-control'
import {
	ITerminal,
	ITerminalDao,
	IUser,
	TERMINAL_DAO,
	UserId,
	UserUniqueId
}                                 from '@airport/travel-document-checkpoint'
import {SYNC_IN_TERMINAL_CHECKER} from '../../../tokens'
import {IDataToTM}                from '../SyncInUtils'
import {UserCheckResults}         from './SyncInUserChecker'

export interface TerminalCheckResults {
	mapByMessageIndex: ITerminal[];
	consistentMessages: IDataToTM[];
	inconsistentMessages: IDataToTM[];
}

export interface ISyncInTerminalChecker {

}

export class SyncInTerminalChecker
	implements ISyncInTerminalChecker {

	async ensureTerminalsAndGetAsMaps(
		dataMessages: IDataToTM[],
		localTerminal: ITerminal,
		userCheckResults: UserCheckResults
	): Promise<TerminalCheckResults> {
		const terminalDao = await container(this).get(TERMINAL_DAO)

		const remoteTerminalMapByUniqueIds: Map<UserUniqueId,
			Map<TerminalName, Map<TerminalSecondId, ITerminal>>> = new Map()
		const terminalNameSet: Set<TerminalName>               = new Set()
		const terminalSecondIdSet: Set<TerminalSecondId>       = new Set()
		const ownerIdSet: Set<UserId>                          = new Set()
		const mapByMessageIndex: ITerminal[]                   = []

		const consistentMessages: IDataToTM[]   = []
		const inconsistentMessages: IDataToTM[] = []
		// record terminal information
		dataMessages.forEach((
			message,
			index
		) => {
			this.recordTerminalCredentials(message, index, userCheckResults,
				localTerminal, consistentMessages, inconsistentMessages,
				terminalNameSet, terminalSecondIdSet, ownerIdSet,
				remoteTerminalMapByUniqueIds, mapByMessageIndex)
		})


		const terminalMapByIds = await terminalDao.findMapByIds(
			Array.from(ownerIdSet),
			Array.from(terminalNameSet),
			Array.from(terminalSecondIdSet)
		)

		await this.addMissingTerminals(remoteTerminalMapByUniqueIds, terminalMapByIds,
			userCheckResults, terminalDao)

		return {
			mapByMessageIndex,
			consistentMessages,
			inconsistentMessages
		}
	}

	private recordTerminalCredentials(
		message: IDataToTM,
		index,
		userCheckResults: UserCheckResults,
		localTerminal: ITerminal,
		consistentMessages: IDataToTM[],
		inconsistentMessages: IDataToTM[],
		terminalNameSet: Set<TerminalName>,
		terminalSecondIdSet: Set<TerminalSecondId>,
		ownerIdSet: Set<UserId>,
		remoteTerminalMapByUniqueIds: Map<UserUniqueId,
			Map<TerminalName, Map<TerminalSecondId, ITerminal>>>,
		mapByMessageIndex: ITerminal[]
	) {
		let terminal = message.data.terminal
		const userMapForMessageByRemoteUserId
		             = userCheckResults.mapByMessageIndexAndRemoteUserId[index]

		const owner = userMapForMessageByRemoteUserId.get(terminal.owner.id)
		if (!this.areTerminalIdsConsistentInMessageData(
			terminal, localTerminal, owner)) {
			inconsistentMessages.push(message)
			userCheckResults.mapByMessageIndexAndRemoteUserId.splice(index)
			return
		}
		terminal = {
			...terminal,
			owner
		}
		terminalNameSet.add(terminal.name)
		terminalSecondIdSet.add(terminal.secondId)
		ownerIdSet.add(owner.id)

		ensureChildJsMap(
			ensureChildJsMap(remoteTerminalMapByUniqueIds,
				owner.uniqueId),
			terminal.name)
			.set(terminal.secondId, terminal)

		mapByMessageIndex.push(terminal)
		consistentMessages.push(message)
	}

	private areTerminalIdsConsistentInMessageData(
		terminal: ITerminal,
		localTerminal: ITerminal,
		ownerUser: IUser
	): boolean {
		if (localTerminal.owner.uniqueId === ownerUser.uniqueId
			&& localTerminal.name === terminal.name
			&& localTerminal.secondId === terminal.secondId) {
			// Terminal should never receive messages from itself
			return false
		}

		return true
	}

	private async addMissingTerminals(
		remoteTerminalMapByUniqueIds: Map<UserUniqueId,
			Map<TerminalName, Map<TerminalSecondId, ITerminal>>>,
		terminalMapByIds: Map<UserId, Map<TerminalName, Map<TerminalSecondId, ITerminal>>>,
		userCheckResults: UserCheckResults,
		terminalDao: ITerminalDao
	): Promise<void> {
		const userMap                   = userCheckResults.map
		const newTerminals: ITerminal[] = []
		for (const [userUniqueId, remoteTerminalMapByDbUniqueIds] of remoteTerminalMapByUniqueIds) {

			const owner                    = userMap.get(userUniqueId)
			const terminalMapByDbUniqueIds = terminalMapByIds.get(owner.id)

			for (const [name, remoteTerminalMapBySecondId] of remoteTerminalMapByDbUniqueIds) {
				let terminalMapBySecondId: Map<TerminalSecondId, ITerminal>
				if (terminalMapByDbUniqueIds) {
					terminalMapBySecondId = terminalMapByDbUniqueIds.get(name)
				}

				for (const [secondId, remoteTerminal] of remoteTerminalMapBySecondId) {
					let terminal: ITerminal
					if (terminalMapBySecondId) {
						terminal = terminalMapBySecondId.get(secondId)
					}

					if (!terminal) {
						delete remoteTerminal.id
						remoteTerminal.isLocal = false
						newTerminals.push(remoteTerminal)
					} else {
						remoteTerminal.id = terminal.id
					}
				}
			}
		}

		if (newTerminals.length) {
			await terminalDao.bulkCreate(newTerminals,
				CascadeOverwrite.DEFAULT, false)
		}
	}

}

DI.set(SYNC_IN_TERMINAL_CHECKER, SyncInTerminalChecker)
