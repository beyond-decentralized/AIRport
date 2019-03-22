"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const di_1 = require("@airport/di");
const diTokens_1 = require("../../diTokens");
const generated_1 = require("../../generated/generated");
class SharingNodeDao extends generated_1.BaseSharingNodeDao {
    async findAllGroupedBySyncFrequency( //
    ) {
        const allBySyncFrequency = new Map();
        let sn;
        const sharingNodes = await this.db.find.tree({
            select: {
                ...this.db.dmo.getAllFieldsSelect()
            },
            from: [
                sn = generated_1.Q.SharingNode
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
            update: sn = generated_1.Q.SharingNode,
            set: {
                isActive: isActive
            },
            where: sn.id.in(sharingNodeIds)
        });
    }
}
exports.SharingNodeDao = SharingNodeDao;
di_1.DI.set(diTokens_1.SHARING_NODE_DAO, SharingNodeDao);
//# sourceMappingURL=SharingNodeDao.js.map