"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const airport_code_1 = require("@airport/airport-code");
const ground_control_1 = require("@airport/ground-control");
const terminal_map_1 = require("@airport/terminal-map");
const typedi_1 = require("typedi");
let SequenceBlockDao = class SequenceBlockDao {
    constructor(storeDriver, terminalStore) {
        this.storeDriver = storeDriver;
        this.terminalStore = terminalStore;
    }
    async createNewBlocks(sequenceBlocks) {
        const latestSchemaVersionsByIndexes = this.terminalStore.getLatestSchemaVersionsByIndexes();
        const reservationMillis = new Date().getTime();
        const allNewBlocks = [];
        for (const sequenceBlock of sequenceBlocks) {
            const sequence = sequenceBlock.sequence;
            const schemaVersion = latestSchemaVersionsByIndexes[sequence.schemaIndex];
            const schemaName = schemaVersion.schema.name;
            const entity = schemaVersion.entities[sequence.tableIndex];
            const tableName = entity.name;
            const column = entity.columns[sequence.columnIndex];
            const columnName = column.name;
            const numSequencesBlocksToCreate = Math.ceil(sequenceBlock.size / sequence.incrementBy);
            const blocksForSequence = [];
            for (let i = 0; i < numSequencesBlocksToCreate; i++) {
                const result = await this.storeDriver.findNative(`SELECT NEXTVAL('"${schemaName}".${tableName}_${columnName}_SEQUENCE')`, []);
                const nextval = result[0];
                const newSequenceBlock = {
                    sequence,
                    sequenceConsumer: sequenceBlock.sequenceConsumer,
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
};
SequenceBlockDao = __decorate([
    typedi_1.Service(airport_code_1.SequenceBlockDaoToken),
    __param(0, typedi_1.Inject(ground_control_1.StoreDriverToken)),
    __param(1, typedi_1.Inject(terminal_map_1.TerminalStoreToken))
], SequenceBlockDao);
exports.SequenceBlockDao = SequenceBlockDao;
//# sourceMappingURL=SequenceBlockDao.js.map