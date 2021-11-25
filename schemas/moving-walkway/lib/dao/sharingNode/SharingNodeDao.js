import { DI } from '@airport/di';
import { SHARING_NODE_DAO } from '../../tokens';
import { BaseSharingNodeDao, Q } from '../../generated/generated';
export class SharingNodeDao extends BaseSharingNodeDao {
    async findAllGroupedBySyncFrequency( //
    ) {
        const allBySyncFrequency = new Map();
        let sn;
        const sharingNodes = await this.db.find.tree({
            select: {},
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
    async updateIsActive(sharingNodeIds, isActive) {
        let sn;
        await this.db.updateWhere({
            update: sn = Q.SharingNode,
            set: {
                isActive: isActive
            },
            where: sn.id.in(sharingNodeIds)
        });
    }
}
DI.set(SHARING_NODE_DAO, SharingNodeDao);
//# sourceMappingURL=SharingNodeDao.js.map