import {and}                       from '@airport/air-control'
import {TerminalId}                from '@airport/arrivals-n-departures'
import {DI}                        from '@airport/di'
import {SharingNodeId}             from '../../ddl/ddl'
import {SHARING_NODE_TERMINAL_DAO} from '../../diTokens'
import {
	BaseSharingNodeTerminalDao,
	IBaseSharingNodeTerminalDao,
	ISharingNodeTerminal,
	Q,
	QSharingNodeTerminal
}                                  from '../../generated/generated'

export interface ISharingNodeTerminalDao
	extends IBaseSharingNodeTerminalDao {

	findBySharingNodeTmMapByTerminalIdAndSharingNodeIds(
		terminalId: TerminalId,
		sharingNodeIds: SharingNodeId[]
	): Promise<Map<SharingNodeId, ISharingNodeTerminal>>;

}

export class SharingNodeTerminalDao
	extends BaseSharingNodeTerminalDao
	implements ISharingNodeTerminalDao {

	async findBySharingNodeTmMapByTerminalIdAndSharingNodeIds(
		terminalId: TerminalId,
		sharingNodeIds: SharingNodeId[]
	): Promise<Map<SharingNodeId, ISharingNodeTerminal>> {
		const sharingNodeTmMapBySharingNodeId: Map<SharingNodeId, ISharingNodeTerminal> = new Map()

		let snd: QSharingNodeTerminal
		const sharingNodeTerminals = await this.db.find.tree({
			select: {},
			from: [snd = Q.SharingNodeTerminal],
			where: and(
				snd.terminal.id.equals(terminalId),
				snd.sharingNode.id.in(sharingNodeIds)
			)
		})

		for (const sharingNodeTerminal of sharingNodeTerminals) {
			sharingNodeTmMapBySharingNodeId.set(sharingNodeTerminal.sharingNode.id, sharingNodeTerminal)
		}

		return sharingNodeTmMapBySharingNodeId
	}

}

DI.set(SHARING_NODE_TERMINAL_DAO, SharingNodeTerminalDao)
