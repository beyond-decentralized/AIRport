"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const air_control_1 = require("@airport/air-control");
const airport_code_1 = require("@airport/airport-code");
const typedi_1 = require("typedi");
const InjectionTokens_1 = require("../InjectionTokens");
let SequenceGenerator = class SequenceGenerator {
    constructor(sequenceBlockDao, sequenceConsumerDao, sequenceDao, utils) {
        this.sequenceBlockDao = sequenceBlockDao;
        this.sequenceConsumerDao = sequenceConsumerDao;
        this.sequenceDao = sequenceDao;
        this.utils = utils;
        this.sequences = [];
        this.sequenceBlocks = [];
    }
    async init(domain) {
        this.sequenceConsumer = {
            createTimestamp: new Date().getTime(),
            domain,
            randomNumber: Math.random()
        };
        await this.sequenceConsumerDao.create(this.sequenceConsumer);
        const sequences = await this.sequenceDao.findAll();
        for (const sequence of sequences) {
            this.utils.ensureChildArray(this.utils.ensureChildArray(this.sequences, sequence.schemaIndex), sequence.tableIndex)[sequence.columnIndex] = sequence;
        }
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
            const newBlocks = await this.sequenceBlockDao.createNewBlocks(newBlocksToCreate);
            newBlocks.forEach((newBlock, index) => {
                const dbColumn = columnsForCreatedBlocks[index];
                const columnNumbers = sequentialNumbersForColumn.get(dbColumn);
                const numSequencesNeeded = numSequencesNeededFromNewBlocks.get(dbColumn);
                newBlock.currentNumber = newBlock.lastReservedId;
                for (let i = 0; i < numSequencesNeeded; i++) {
                    columnNumbers.push(++newBlock.currentNumber);
                }
                const dbEntity = dbColumn.propertyColumns[0].property.entity;
                this.utils.ensureChildArray(this.utils.ensureChildArray(this.sequenceBlocks, dbEntity.schemaVersion.schema.index), dbEntity.index)[dbColumn.index] = newBlock;
            });
        }
        return sequentialNumbers;
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
                    sequenceConsumer: this.sequenceConsumer,
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
};
SequenceGenerator = __decorate([
    typedi_1.Service(InjectionTokens_1.SequenceGeneratorToken),
    __param(0, typedi_1.Inject(airport_code_1.SequenceBlockDaoToken)),
    __param(1, typedi_1.Inject(airport_code_1.SequenceConsumerDaoToken)),
    __param(2, typedi_1.Inject(airport_code_1.SequenceDaoToken)),
    __param(3, typedi_1.Inject(air_control_1.UtilsToken)),
    __metadata("design:paramtypes", [Object, Object, Object, Object])
], SequenceGenerator);
exports.SequenceGenerator = SequenceGenerator;
//# sourceMappingURL=SequenceGenerator.js.map