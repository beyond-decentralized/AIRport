var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { ensureChildArray, setSeqGen, } from '@airport/ground-control';
import { Inject, Injected } from '@airport/direction-indicator';
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
let SequenceGenerator = class SequenceGenerator {
    get sequences() {
        return this.terminalStore.getSequenceGenerator().sequences;
    }
    get sequenceBlocks() {
        return this.terminalStore.getSequenceGenerator().sequenceBlocks;
    }
    get generatingSequenceNumbers() {
        return this.terminalStore.getSequenceGenerator().generatingSequenceNumbers;
    }
    set generatingSequenceNumbers(generatingSequenceNumbers) {
        this.terminalStore.getSequenceGenerator().generatingSequenceNumbers
            = generatingSequenceNumbers;
    }
    exists(dbEntity) {
        const generatedColumns = dbEntity.columns.filter(dbColumn => dbColumn.isGenerated);
        if (!generatedColumns.length) {
            return true;
        }
        const applicationSequences = this.sequences[dbEntity.applicationVersion.application.index];
        if (!applicationSequences) {
            return false;
        }
        const tableSequences = applicationSequences[dbEntity.index];
        if (!tableSequences) {
            return false;
        }
        return generatedColumns.every(dbColumn => !!tableSequences[dbColumn.index]);
    }
    async initialize(context, sequences) {
        if (!sequences) {
            sequences = await this.sequenceDao.findAll();
        }
        this.addSequences(sequences);
        await this.sequenceDao.incrementCurrentValues(context);
        setSeqGen(this);
    }
    async tempInitialize(context, sequences) {
        this.addSequences(sequences);
        setSeqGen(this);
    }
    async generateSequenceNumbers(dbColumns, numSequencesNeeded) {
        if (!dbColumns.length) {
            return [];
        }
        await this.waitForPreviousGeneration();
        this.generatingSequenceNumbers = true;
        try {
            return await this.doGenerateSequenceNumbers(dbColumns, numSequencesNeeded);
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
        const sequentialNumbers = [];
        for (let i = 0; i < dbColumns.length; i++) {
            const dbColumn = dbColumns[i];
            let numColumnSequencesNeeded = numSequencesNeeded[i];
            const columnNumbers = ensureChildArray(sequentialNumbers, i);
            const dbEntity = dbColumn.propertyColumns[0].property.entity;
            const application = dbEntity.applicationVersion.application;
            let sequenceBlock = this.sequenceBlocks[application.index][dbEntity.index][dbColumn.index];
            const sequence = this.sequences[application.index][dbEntity.index][dbColumn.index];
            while (numColumnSequencesNeeded && sequenceBlock) {
                columnNumbers.push(sequence.currentValue - sequenceBlock + 1);
                numColumnSequencesNeeded--;
                sequenceBlock--;
            }
            this.sequenceBlocks[application.index][dbEntity.index][dbColumn.index] = sequenceBlock;
            if (numColumnSequencesNeeded) {
                const numNewSequencesNeeded = sequence.incrementBy + numColumnSequencesNeeded;
                const newSequence = { ...sequence };
                newSequence.currentValue += numNewSequencesNeeded;
                await this.sequenceDao.save(newSequence);
                this.sequences[application.index][dbEntity.index][dbColumn.index] = newSequence;
                sequenceBlock = numNewSequencesNeeded;
                while (numColumnSequencesNeeded) {
                    columnNumbers.push(sequence.currentValue - sequenceBlock + 1);
                    numColumnSequencesNeeded--;
                    sequenceBlock--;
                }
                this.sequenceBlocks[application.index][dbEntity.index][dbColumn.index] = sequenceBlock;
            }
        }
        return sequentialNumbers;
    }
    waitForPreviousGeneration() {
        return new Promise(resolve => {
            this.isDoneGeneratingSeqNums(resolve);
        });
    }
    isDoneGeneratingSeqNums(resolve) {
        if (this.generatingSequenceNumbers) {
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
            ensureChildArray(ensureChildArray(this.sequences, sequence.applicationIndex), sequence.tableIndex)[sequence.columnIndex] = sequence;
            sequence.currentValue += sequence.incrementBy;
            ensureChildArray(ensureChildArray(this.sequenceBlocks, sequence.applicationIndex), sequence.tableIndex)[sequence.columnIndex] = sequence.incrementBy;
        }
    }
};
__decorate([
    Inject()
], SequenceGenerator.prototype, "sequenceDao", void 0);
__decorate([
    Inject()
], SequenceGenerator.prototype, "terminalStore", void 0);
SequenceGenerator = __decorate([
    Injected()
], SequenceGenerator);
export { SequenceGenerator };
export function injectSequenceGenerator() {
    console.log('injecting SequenceGenerator');
}
//# sourceMappingURL=SequenceGenerator.js.map