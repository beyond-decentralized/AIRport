import {DI}               from '@airport/di'
import {
	SharingNodeId,
	SharingNodeIsActive,
	SharingNodeSyncFrequency
}                         from '../../ddl/ddl'
import {SHARING_NODE_DAO} from '../../diTokens'
import {
	BaseSharingNodeDao,
	ISharingNode,
	Q,
	QSharingNode
}                         from '../../generated/generated'

export interface ISharingNodeDao {

	findAllGroupedBySyncFrequency( //
	): Promise<Map<SharingNodeSyncFrequency, ISharingNode[]>>;

	updateIsActive(
		sharingNodeIds: SharingNodeId[],
		isActive: SharingNodeIsActive
	): Promise<void>;

}

export class SharingNodeDao
	extends BaseSharingNodeDao
	implements ISharingNodeDao {

	async findAllGroupedBySyncFrequency( //
	): Promise<Map<SharingNodeSyncFrequency, ISharingNode[]>> {
		const allBySyncFrequency = new Map()

		let sn: QSharingNode
		const sharingNodes: ISharingNode[] = await this.db.find.tree({
			select: {
				...this.db.duo.getAllFieldsSelect()
			},
			from: [
				sn = Q.SharingNode
			],
			orderBy: [
				sn.syncFrequency.asc()
			]
		})

		let lastSyncFrequency
		let currentSyncFrequencyNodes = []
		if (sharingNodes.length) {
			lastSyncFrequency = sharingNodes[0].syncFrequency
		}
		for (const sharingNode of sharingNodes) {
			if (sharingNode.syncFrequency != lastSyncFrequency) {
				allBySyncFrequency.set(lastSyncFrequency, currentSyncFrequencyNodes)
				lastSyncFrequency         = sharingNode.syncFrequency
				currentSyncFrequencyNodes = []
			}
			currentSyncFrequencyNodes.push(sharingNode)
		}

		if (lastSyncFrequency) {
			allBySyncFrequency.set(lastSyncFrequency, currentSyncFrequencyNodes)
		}

		return allBySyncFrequency
	}

	async updateIsActive(
		sharingNodeIds: SharingNodeId[],
		isActive: SharingNodeIsActive
	): Promise<void> {
		let sn: QSharingNode
		await this.db.updateWhere({
			update: sn = Q.SharingNode,
			set: {
				isActive: isActive
			},
			where: sn.id.in(sharingNodeIds)
		})
	}

}

DI.set(SHARING_NODE_DAO, SharingNodeDao)

