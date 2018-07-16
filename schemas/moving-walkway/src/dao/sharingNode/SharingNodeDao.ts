import {
	IUtils,
	UtilsToken
}                            from "@airport/air-control";
import {
	Inject,
	Service
}                            from "typedi";
import {
	SharingNodeId,
	SharingNodeIsActive,
	SharingNodeSyncFrequency
}                            from "../../ddl/ddl";
import {
	BaseSharingNodeDao,
	ISharingNode,
	Q,
	QSharingNode
}                            from "../../generated/generated";
import {SharingNodeDaoToken} from "../../InjectionTokens";

export interface ISharingNodeDao {

	findAllGroupedBySyncFrequency( //
	): Promise<Map<SharingNodeSyncFrequency, ISharingNode[]>>;

	updateIsActive(
		sharingNodeIds: SharingNodeId[],
		isActive: SharingNodeIsActive
	): Promise<void>;

}

@Service(SharingNodeDaoToken)
export class SharingNodeDao
	extends BaseSharingNodeDao
	implements ISharingNodeDao {

	constructor(
		@Inject(UtilsToken)
			utils: IUtils
	) {
		super(utils);
	}

	async findAllGroupedBySyncFrequency( //
	): Promise<Map<SharingNodeSyncFrequency, ISharingNode[]>> {
		const allBySyncFrequency = new Map();

		let sn: QSharingNode;
		const sharingNodes: ISharingNode[] = await this.db.find.tree({
			select: {
				...this.db.dmo.getAllFieldsSelect()
			},
			from: [
				sn = Q.SharingNode
			],
			orderBy: [
				sn.syncFrequency.asc()
			]
		});

		let lastSyncFrequency;
		let currentSyncFrequencyNodes = [];
		if (sharingNodes.length) {
			lastSyncFrequency = sharingNodes[0].syncFrequency;
		}
		for (const sharingNode of sharingNodes) {
			if (sharingNode.syncFrequency != lastSyncFrequency) {
				allBySyncFrequency.set(lastSyncFrequency, currentSyncFrequencyNodes);
				lastSyncFrequency = sharingNode.syncFrequency;
				currentSyncFrequencyNodes = [];
			}
			currentSyncFrequencyNodes.push(sharingNode);
		}

		if (lastSyncFrequency) {
			allBySyncFrequency.set(lastSyncFrequency, currentSyncFrequencyNodes);
		}

		return allBySyncFrequency;
	}

	async updateIsActive(
		sharingNodeIds: SharingNodeId[],
		isActive: SharingNodeIsActive
	): Promise<void> {
		let sn: QSharingNode;
		await this.db.updateWhere({
			update: sn = Q.SharingNode,
			set: {
				isActive: isActive
			},
			where: sn.id.in(sharingNodeIds)
		});
	}


}