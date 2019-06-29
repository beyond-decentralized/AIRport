"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const airport_code_1 = require("@airport/airport-code");
const check_in_1 = require("@airport/check-in");
const di_1 = require("@airport/di");
const ground_control_1 = require("@airport/ground-control");
class SequenceGenerator {
    constructor() {
        this.sequences = [];
        this.sequenceBlocks = [];
    }
    exists(dbEntity) {
        const generatedColumns = dbEntity.columns.filter(dbColumn => dbColumn.isGenerated);
        if (!generatedColumns.length) {
            return true;
        }
        const schemaSequences = this.sequences[dbEntity.schemaVersion.schema.index];
        if (!schemaSequences) {
            return false;
        }
        const tableSequences = schemaSequences[dbEntity.index];
        if (!tableSequences) {
            return false;
        }
        return generatedColumns.every(dbColumn => !!tableSequences[dbColumn.index]);
    }
    async init(sequences) {
        if (!sequences) {
            sequences = await (await di_1.DI.get(airport_code_1.SEQUENCE_DAO)).findAll();
        }
        this.addSequences(sequences);
        check_in_1.setSeqGen(this);
    }
    async generateSequenceNumbers(dbColumns, numSequencesNeeded) {
        const numSequencesNeededFromNewBlocks = new Map();
        const sequentialNumbersForColumn = new Map();
        const sequenceBlocksToCreate = new Map();
        const allSequenceBlocks = new Map();
        const sequentialNumbers = [];
        dbColumns.forEach((dbColumn, index) => {
            const numColumnSequencesNeeded = numSequencesNeeded[index];
            const columnNumbers = ground_control_1.ensureChildArray(sequentialNumbers, index);
            sequentialNumbersForColumn.set(dbColumn, columnNumbers);
            let { numNewSequencesNeeded, sequenceBlock } = this.getNumNewSequencesNeeded(dbColumn, numColumnSequencesNeeded);
            allSequenceBlocks.set(dbColumn, sequenceBlock);
            let maxAvailableNumbers = sequenceBlock.lastReservedId - sequenceBlock.currentNumber;
            if (maxAvailableNumbers > numColumnSequencesNeeded) {
                maxAvailableNumbers = numColumnSequencesNeeded;
            }
            for (let i = 0; i < maxAvailableNumbers; i++) {
                columnNumbers.push(++sequenceBlock.currentNumber);
            }
            if (numNewSequencesNeeded) {
                sequenceBlock.size = numNewSequencesNeeded;
                sequenceBlocksToCreate.set(dbColumn, sequenceBlock);
                numSequencesNeededFromNewBlocks.set(dbColumn, numColumnSequencesNeeded - maxAvailableNumbers);
            }
        });
        if (sequenceBlocksToCreate.size) {
            const columnsForCreatedBlocks = [];
            const newBlocksToCreate = [];
            for (const [dbColumn, newBlock] of sequenceBlocksToCreate) {
                columnsForCreatedBlocks.push(dbColumn);
                newBlocksToCreate.push(newBlock);
            }
            const newBlocks = await (await di_1.DI.get(airport_code_1.SEQUENCE_BLOCK_DAO)).createNewBlocks(newBlocksToCreate);
            newBlocks.forEach((newBlocksForColumn, index) => {
                const dbColumn = columnsForCreatedBlocks[index];
                const columnNumbers = sequentialNumbersForColumn.get(dbColumn);
                let numSequencesNeeded = numSequencesNeededFromNewBlocks.get(dbColumn);
                let lastBlock = null;
                newBlocksForColumn.some((newBlockForColumn) => {
                    lastBlock = newBlockForColumn;
                    while (numSequencesNeeded > 0
                        && newBlockForColumn.currentNumber <= newBlockForColumn.lastReservedId) {
                        columnNumbers.push(newBlockForColumn.currentNumber);
                        newBlockForColumn.currentNumber++;
                        numSequencesNeeded--;
                    }
                    if (numSequencesNeeded === 0) {
                        return true;
                    }
                });
                const dbEntity = dbColumn.propertyColumns[0].property.entity;
                ground_control_1.ensureChildArray(ground_control_1.ensureChildArray(this.sequenceBlocks, dbEntity.schemaVersion.schema.index), dbEntity.index)[dbColumn.index] = lastBlock;
            });
        }
        return sequentialNumbers;
    }
    addSequences(sequences) {
        for (const sequence of sequences) {
            ground_control_1.ensureChildArray(ground_control_1.ensureChildArray(this.sequences, sequence.schemaIndex), sequence.tableIndex)[sequence.columnIndex] = sequence;
        }
    }
    getNumNewSequencesNeeded(dbColumn, numSequencesNeeded) {
        const dbEntity = dbColumn.propertyColumns[0].property.entity;
        const sequenceBlock = ground_control_1.ensureChildArray(ground_control_1.ensureChildArray(this.sequenceBlocks, dbEntity.schemaVersion.schema.index), dbEntity.index)[dbColumn.index];
        const sequence = this.sequences[dbEntity.schemaVersion.schema.index][dbEntity.index][dbColumn.index];
        let numNewSequencesNeeded = 0;
        if (!sequenceBlock) {
            numNewSequencesNeeded = sequence.incrementBy + numSequencesNeeded;
            return {
                numNewSequencesNeeded,
                sequenceBlock: {
                    currentNumber: 0,
                    lastReservedId: 0,
                    sequence,
                    size: 0
                }
            };
        }
        if (sequenceBlock.currentNumber + numSequencesNeeded > sequenceBlock.lastReservedId) {
            numNewSequencesNeeded
                = sequenceBlock.currentNumber + numSequencesNeeded
                    - sequenceBlock.lastReservedId + sequence.incrementBy;
        }
        return {
            numNewSequencesNeeded,
            sequenceBlock
        };
    }
}
exports.SequenceGenerator = SequenceGenerator;
di_1.DI.set(check_in_1.SEQUENCE_GENERATOR, SequenceGenerator);
//# sourceMappingURL=SequenceGenerator.js.map