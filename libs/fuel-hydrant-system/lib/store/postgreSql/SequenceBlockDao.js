"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const di_1 = require("@airport/di");
const ground_control_1 = require("@airport/ground-control");
const terminal_map_1 = require("@airport/terminal-map");
class SequenceBlockDao {
    async createNewBlocks(sequenceBlocks) {
        const latestSchemaVersionsBySchemaIndexes = (await di_1.DI.get(terminal_map_1.TERMINAL_STORE)).getLatestSchemaVersionsBySchemaIndexes();
        const reservationMillis = new Date().getTime();
        const allNewBlocks = [];
        for (const sequenceBlock of sequenceBlocks) {
            const sequence = sequenceBlock.sequence;
            const schemaVersion = latestSchemaVersionsBySchemaIndexes[sequence.schemaIndex];
            const schemaName = schemaVersion.schema.name;
            const entity = schemaVersion.entities[sequence.tableIndex];
            const tableName = entity.name;
            const column = entity.columns[sequence.columnIndex];
            const columnName = column.name;
            const numSequencesBlocksToCreate = Math.ceil(sequenceBlock.size / sequence.incrementBy);
            const blocksForSequence = [];
            for (let i = 0; i < numSequencesBlocksToCreate; i++) {
                const result = await (await di_1.DI.get(ground_control_1.STORE_DRIVER)).findNative(`SELECT NEXTVAL('"${schemaName}".${tableName}_${columnName}_SEQUENCE')`, []);
                const nextval = result[0];
                const newSequenceBlock = {
                    sequence,
                    currentNumber: nextval - sequence.incrementBy,
                    lastReservedId: nextval,
                    size: sequence.incrementBy,
                    reservationMillis
                };
                blocksForSequence.push(newSequenceBlock);
            }
            allNewBlocks.push(blocksForSequence);
        }
        return allNewBlocks;
    }
}
exports.SequenceBlockDao = SequenceBlockDao;
// DI.set(SEQUENCE_BLOCK_DAO, SequenceBlockDao)
//# sourceMappingURL=SequenceBlockDao.js.map