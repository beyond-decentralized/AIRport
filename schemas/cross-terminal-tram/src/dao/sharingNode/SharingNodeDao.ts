import {DI}               from '@airport/di'
import {
	SharingNode_Id,
	SharingNode_IsActive,
	SharingNode_SyncFrequency
}                         from '../../ddl/ddl'
import {SHARING_NODE_DAO} from '../../tokens'
import {
	BaseSharingNodeDao,
	ISharingNode,
	Q,
	QSharingNode
}                         from '../../generated/generated'

export interface ISharingNodeDao {

	findAllGroupedBySyncFrequency( //
	): Promise<Map<SharingNode_SyncFrequency, ISharingNode[]>>;

	updateIsActive(
		sharingNodeIds: SharingNode_Id[],
		isActive: SharingNode_IsActive
	): Promise<void>;

}

export class SharingNodeDao
	extends BaseSharingNodeDao
	implements ISharingNodeDao {

	async findAllGroupedBySyncFrequency( //
	): Promise<Map<SharingNode_SyncFrequency, ISharingNode[]>> {
		const allBySyncFrequency = new Map()

		let sn: QSharingNode
		const sharingNodes: ISharingNode[] = await this.db.find.tree({
			select: {},
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
		sharingNodeIds: SharingNode_Id[],
		isActive: SharingNode_IsActive
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

