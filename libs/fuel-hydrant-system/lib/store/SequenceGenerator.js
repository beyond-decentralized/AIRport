"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const airport_code_1 = require("@airport/airport-code");
const check_in_1 = require("@airport/check-in");
const di_1 = require("@airport/di");
const ground_control_1 = require("@airport/ground-control");
/**
 * Assumptions: 7/4/2019
 *
 * 1. Only a single process will be inserting records at any given point in time
 * a)  This means that the service worker running the the background will only
 * receive and temporarily store data (in IndexedDb, but won't be inserting
 * proper relational records)
 * b)  This also means that web-workers won't be doing parallel inserts
 *
 * In general, this is consistent with SqLites policy of only one modifying
 * operation at a time (while possibly multiple read ops)
 *
 *
 * With these assumptions in place, it is safe to synchronize sequence retrieval
 * in-memory.   Hence, SequenceBlocks are retired in favor of a simpler
 * Sequence-only solution
 *
 */
class SequenceGenerator {
    constructor() {
        this.sequences = [];
        this.sequenceBlocks = [];
        this.generatingSequenceNumbers = false;
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
        const sequenceDao = await di_1.DI.get(airport_code_1.SEQUENCE_DAO);
        if (!sequences) {
            sequences = await sequenceDao.findAll();
        }
        this.addSequences(sequences);
        await sequenceDao.incrementCurrentValues();
        check_in_1.setSeqGen(this);
    }
    async generateSequenceNumbers(dbColumns, numSequencesNeeded) {
        if (!dbColumns.length) {
            return [];
        }
        await this.waitForPreviousGeneration();
        this.generatingSequenceNumbers = true;
        try {
            await this.doGenerateSequenceNumbers(dbColumns, numSequencesNeeded);
        }
        finally {
            this.generatingSequenceNumbers = false;
        }
    }
    /**
     * Keeping return value as number[][] in case we ever revert back
     * to SequenceBlock-like solution
     * @param dbColumns
     * @param numSequencesNeeded
     */
    async doGenerateSequenceNumbers(dbColumns, numSequencesNeeded) {
        const numSequencesNeededFromNewBlocks = new Map();
        const sequentialNumbersForColumn = new Map();
        const sequentialNumbers = [];
        for (let i = 0; i < dbColumns.length; i++) {
            const dbColumn = dbColumns[i];
            let numColumnSequencesNeeded = numSequencesNeeded[i];
            const columnNumbers = ground_control_1.ensureChildArray(sequentialNumbers, i);
            const dbEntity = dbColumn.propertyColumns[0].property.entity;
            const schema = dbEntity.schemaVersion.schema;
            let sequenceBlock = this.sequenceBlocks[schema.index][dbEntity.index][dbColumn.index];
            const sequence = this.sequences[schema.index][dbEntity.index][dbColumn.index];
            while (numColumnSequencesNeeded && sequenceBlock) {
                columnNumbers.push(sequence.currentValue - sequenceBlock + 1);
                numColumnSequencesNeeded--;
                sequenceBlock--;
            }
            if (numColumnSequencesNeeded) {
                const numNewSequencesNeeded = sequence.incrementBy + numColumnSequencesNeeded;
            }
            sequentialNumbersForColumn.set(dbColumn, columnNumbers);
            let numNewSequencesNeeded = this.getNumNewSequencesNeeded(dbColumn, numColumnSequencesNeeded);
            if (numNewSequencesNeeded) {
            }
            allSequenceBlocks.set(dbColumn, sequenceBlock);
            let sequencesNeededFromCurrentBlock = sequenceBlock.lastReservedId - sequenceBlock.currentNumber;
            if (sequencesNeededFromCurrentBlock > numColumnSequencesNeeded) {
                sequencesNeededFromCurrentBlock = numColumnSequencesNeeded;
            }
            for (let i = 0; i < sequencesNeededFromCurrentBlock; i++) {
                columnNumbers.push(++sequenceBlock.currentNumber);
            }
            if (numNewSequencesNeeded) {
                sequenceBlock.size = numNewSequencesNeeded;
                sequenceBlocksToCreate.set(dbColumn, sequenceBlock);
                numSequencesNeededFromNewBlocks.set(dbColumn, numColumnSequencesNeeded - sequencesNeededFromCurrentBlock);
            }
        }
        if (sequenceBlocksToCreate.size) {
            const columnsForCreatedBlocks = [];
            const newBlocksToCreate = [];
            for (const [dbColumn, newBlock] of sequenceBlocksToCreate) {
                columnsForCreatedBlocks.push(dbColumn);
                newBlocksToCreate.push(newBlock);
            }
            const newBlocks = await (await di_1.DI.get(SEQUENCE_BLOCK_DAO)).createNewBlocks(newBlocksToCreate);
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
    async waitForPreviousGeneration() {
        return new Promise(resolve => {
            this.isDoneGeneratingSeqNums(resolve);
        });
    }
    async isDoneGeneratingSeqNums(resolve) {
        if (this.generateSequenceNumbers) {
            setTimeout(() => {
                this.isDoneGeneratingSeqNums(resolve);
            }, 20);
        }
        else {
            resolve();
        }
    }
    addSequences(sequences) {
        for (const sequence of sequences) {
            ground_control_1.ensureChildArray(ground_control_1.ensureChildArray(this.sequences, sequence.schemaIndex), sequence.tableIndex)[sequence.columnIndex] = sequence;
            ground_control_1.ensureChildArray(ground_control_1.ensureChildArray(this.sequenceBlocks, sequence.schemaIndex), sequence.tableIndex)[sequence.columnIndex] = sequence.incrementBy;
        }
    }
    getNumNewSequencesNeeded(dbColumn, numSequencesNeeded) {
        const dbEntity = dbColumn.propertyColumns[0].property.entity;
        const schema = dbEntity.schemaVersion.schema;
        const sequenceBlock = this.sequenceBlocks[schema.index][dbEntity.index][dbColumn.index];
        const sequence = this.sequences[schema.index][dbEntity.index][dbColumn.index];
        let numNewSequencesNeeded = 0;
        const remainingSequenceNumbers = sequenceBlock - numSequencesNeeded;
        if (remainingSequenceNumbers < 0) {
            numNewSequencesNeeded = sequence.incrementBy - remainingSequenceNumbers;
        }
        else {
            this.sequenceBlocks[schema.index][dbEntity.index][dbColumn.index] = remainingSequenceNumbers;
        }
        return numNewSequencesNeeded;
    }
}
exports.SequenceGenerator = SequenceGenerator;
di_1.DI.set(check_in_1.SEQUENCE_GENERATOR, SequenceGenerator);
//# sourceMappingURL=SequenceGenerator.js.map