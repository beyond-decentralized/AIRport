"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const air_control_1 = require("@airport/air-control");
const di_1 = require("@airport/di");
const diTokens_1 = require("../diTokens");
const generated_1 = require("../generated/generated");
class SequenceBlockDao extends generated_1.BaseSequenceBlockDao {
    async createNewBlocks(sequenceBlocks) {
        let reservationMillis = new Date().getTime();
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
            sequenceBlock.size,
            newLastReservedIds[index],
            reservationMillis++
        ]);
        let sb = generated_1.Q.SequenceBlock;
        const allIds = await this.db.insertValuesGenerateIds({
            insertInto: sb,
            columns: [
                sb.sequence.schemaIndex,
                sb.sequence.tableIndex,
                sb.sequence.columnIndex,
                sb.size,
                sb.lastReservedId,
                sb.reservationMillis
            ],
            values
        });
        const indexMapById = new Map();
        sb = generated_1.Q.SequenceBlock;
        const sbI = sb;
        const dbEntity = sb.__driver__.dbEntity;
        const idDbColumns = dbEntity.idColumns;
        const whereClauseFragments = [];
        allIds.forEach((ids, index) => {
            const entityWhereClauseFragments = [];
            sbI.__driver__.idColumns.forEach((idQColumn, idColumnIndex) => {
                if (idDbColumns[idColumnIndex].name === 'reservationMillis') {
                    indexMapById.set(ids[idColumnIndex], index);
                }
                entityWhereClauseFragments.push(idQColumn.equals(ids[idColumnIndex]));
            });
            whereClauseFragments.push(air_control_1.and(...entityWhereClauseFragments));
        });
        const newSequenceBlocks = await this.db.find.tree({
            from: [sb],
            select: {},
            where: air_control_1.or(...whereClauseFragments)
        });
        return newSequenceBlocks.sort((seqBlock1, seqBlock2) => indexMapById.get(seqBlock1.reservationMillis)
            - indexMapById.get(seqBlock2.reservationMillis)).map(seqBlock => {
            seqBlock.currentNumber = seqBlock.lastReservedId - seqBlock.size;
            return [seqBlock];
        });
    }
}
exports.SequenceBlockDao = SequenceBlockDao;
di_1.DI.set(diTokens_1.SEQUENCE_BLOCK_DAO, SequenceBlockDao);
//# sourceMappingURL=SequenceBlockDao.js.map