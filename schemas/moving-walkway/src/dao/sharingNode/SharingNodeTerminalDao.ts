import {and}                       from '@airport/air-control'
import {TerminalId}                from '@airport/arrivals-n-departures'
import {DI}                        from '@airport/di'
import {SharingNode_Id}             from '../../ddl/ddl'
import {SHARING_NODE_TERMINAL_DAO} from '../../tokens'
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
		sharingNodeIds: SharingNode_Id[]
	): Promise<Map<SharingNode_Id, ISharingNodeTerminal>>;

}

export class SharingNodeTerminalDao
	extends BaseSharingNodeTerminalDao
	implements ISharingNodeTerminalDao {

	async findBySharingNodeTmMapByTerminalIdAndSharingNodeIds(
		terminalId: TerminalId,
		sharingNodeIds: SharingNode_Id[]
	): Promise<Map<SharingNode_Id, ISharingNodeTerminal>> {
		const sharingNodeTmMapBySharingNodeId: Map<SharingNode_Id, ISharingNodeTerminal> = new Map()

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
