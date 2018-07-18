"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const baseDaos_1 = require("../generated/baseDaos");
const qSchema_1 = require("../generated/qSchema");
class ShardDao extends baseDaos_1.BaseShardDao {
    async findShards(shardIds) {
        let s;
        return await this.db.find.tree({
            select: {},
            from: [
                s = qSchema_1.Q.Shard
            ],
            where: s.id.in(shardIds)
        });
    }
    async findAllShards( //
    ) {
        return await this.db.find.tree({
            select: {},
            from: [
                qSchema_1.Q.Shard
            ]
        });
    }
}
exports.ShardDao = ShardDao;
//# sourceMappingURL=ShardDao.js.map