"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const air_control_1 = require("@airport/air-control");
const di_1 = require("@airport/di");
const generated_1 = require("../generated/generated");
const diTokens_1 = require("../diTokens");
class SequenceBlockDao extends generated_1.BaseSequenceBlockDao {
    async createNewBlocks(sequenceBlocks) {
        const sb = generated_1.Q.SequenceBlock;
        const reservationMillis = new Date().getTime();
        const newLastReservedIds = sequenceBlocks.map((sequenceBlock) => {
            const sb = generated_1.Q.SequenceBlock;
            const selectMaxLastReservedId = {
                from: [sb],
                select: air_control_1.plus(air_control_1.max(air_control_1.coalesce(sb.lastReservedId, 0)), sequenceBlock.size),
                where: air_control_1.and(sb.sequence.schemaIndex.equals(sequenceBlock.sequence.schemaIndex), sb.sequence.tableIndex.equals(sequenceBlock.sequence.tableIndex), sb.sequence.columnIndex.equals(sequenceBlock.sequence.columnIndex))
            };
            return air_control_1.field(selectMaxLastReservedId);
        });
        const values = sequenceBlocks.map((sequenceBlock, index) => [
            sequenceBlock.sequence.schemaIndex,
            sequenceBlock.sequence.tableIndex,
            sequenceBlock.sequence.columnIndex,
            sequenceBlock.sequenceConsumer.id,
            sequenceBlock.size,
            newLastReservedIds[index],
            reservationMillis
        ]);
        const ids = await this.db.insertValuesGenerateIds({
            insertInto: sb,
            columns: [
                sb.sequence.schemaIndex,
                sb.sequence.tableIndex,
                sb.sequence.columnIndex,
                sb.sequenceConsumer.id,
                sb.size,
                sb.lastReservedId,
                sb.reservationMillis
            ],
            values
        });
        const indexMapById = new Map();
        ids.forEach((id, index) => {
            indexMapById.set(id, index);
        });
        const newSequenceBlocks = await this.db.find.tree({
            from: [sb],
            select: {},
            where: sb.id.in(ids)
        });
        return newSequenceBlocks.sort((seqBlock1, seqBlock2) => indexMapById.get(seqBlock1.id) - indexMapById.get(seqBlock2.id)).map(seqBlock => {
            seqBlock.currentNumber = seqBlock.lastReservedId - seqBlock.size;
            return [seqBlock];
        });
    }
}
exports.SequenceBlockDao = SequenceBlockDao;
di_1.DI.set(diTokens_1.SEQUENCE_BLOCK_DAO, SequenceBlockDao);
//# sourceMappingURL=SequenceBlockDao.js.map