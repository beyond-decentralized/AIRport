"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const air_control_1 = require("@airport/air-control");
const airport_code_1 = require("@airport/airport-code");
const di_1 = require("@airport/di");
const diTokens_1 = require("../diTokens");
class SequenceGenerator {
    constructor() {
        this.sequences = [];
        this.sequenceBlocks = [];
        this.sequenceBlockDao = di_1.DI.getP(airport_code_1.SEQUENCE_BLOCK_DAO);
        this.sequenceDao = di_1.DI.getP(airport_code_1.SEQUENCE_DAO);
        di_1.DI.get(utils => this.utils = utils, air_control_1.UTILS);
    }
    async init(sequences) {
        if (!sequences) {
            sequences = await (await this.sequenceDao).findAll();
        }
        this.addSequences(sequences);
    }
    async generateSequenceNumbers(dbColumns, numSequencesNeeded) {
        const numSequencesNeededFromNewBlocks = new Map();
        const sequentialNumbersForColumn = new Map();
        const sequenceBlocksToCreate = new Map();
        const allSequenceBlocks = new Map();
        const sequentialNumbers = [];
        dbColumns.forEach((dbColumn, index) => {
            const numColumnSequencesNeeded = numSequencesNeeded[index];
            const columnNumbers = this.utils.ensureChildArray(sequentialNumbers, index);
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
            const newBlocks = await (await this.sequenceBlockDao).createNewBlocks(newBlocksToCreate);
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
                this.utils.ensureChildArray(this.utils.ensureChildArray(this.sequenceBlocks, dbEntity.schemaVersion.schema.index), dbEntity.index)[dbColumn.index] = lastBlock;
            });
        }
        return sequentialNumbers;
    }
    addSequences(sequences) {
        for (const sequence of sequences) {
            this.utils.ensureChildArray(this.utils.ensureChildArray(this.sequences, sequence.schemaIndex), sequence.tableIndex)[sequence.columnIndex] = sequence;
        }
    }
    getNumNewSequencesNeeded(dbColumn, numSequencesNeeded) {
        const dbEntity = dbColumn.propertyColumns[0].property.entity;
        const sequenceBlock = this.utils.ensureChildArray(this.utils.ensureChildArray(this.sequenceBlocks, dbEntity.schemaVersion.schema.index), dbEntity.index)[dbColumn.index];
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
di_1.DI.set(diTokens_1.SEQUENCE_GENERATOR, SequenceGenerator);
//# sourceMappingURL=SequenceGenerator.js.map