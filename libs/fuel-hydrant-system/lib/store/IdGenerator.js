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
const holding_pattern_1 = require("@airport/holding-pattern");
const typedi_1 = require("typedi");
const InjectionTokens_1 = require("../InjectionTokens");
/**
 * Created by Papa on 9/2/2016.
 */
let IdGenerator = class IdGenerator {
    constructor(airportDb, sequenceBlockDao, sequenceConsumerDao, sequenceDao, utils) {
        this.airportDb = airportDb;
        this.sequenceBlockDao = sequenceBlockDao;
        this.sequenceConsumerDao = sequenceConsumerDao;
        this.sequenceDao = sequenceDao;
        this.utils = utils;
        this.lastIds = [];
        this.lastReservedIds = [];
        this.sequences = [];
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
            this.utils.ensureChildArray(this.utils.ensureChildArray(this.lastIds, sequence.schemaIndex), sequence.tableIndex);
            this.utils.ensureChildArray(this.utils.ensureChildArray(this.lastReservedIds, sequence.schemaIndex), sequence.tableIndex);
        }
        this.transHistoryDbEntity =
            this.getHoldingPatternDbEntity('TransactionHistory');
        this.repoTransHistoryDbEntity =
            this.getHoldingPatternDbEntity('RepositoryTransactionHistory');
        this.operationHistoryDbEntity =
            this.getHoldingPatternDbEntity('OperationHistory');
        this.recordHistoryDbEntity =
            this.getHoldingPatternDbEntity('RecordHistory');
        const holdingPatternLastIds = this.lastIds[this.transHistoryDbEntity.schemaVersion.schema.index];
        const holdingPatternLastReservedIds = this.lastReservedIds[this.transHistoryDbEntity.schemaVersion.schema.index];
        this.operationHistoryIds = holdingPatternLastIds[this.operationHistoryDbEntity.index];
        this.recordHistoryIds = holdingPatternLastIds[this.recordHistoryDbEntity.index];
        this.repoTransHistoryIds = holdingPatternLastIds[this.repoTransHistoryDbEntity.index];
        this.transHistoryIds = holdingPatternLastIds[this.transHistoryDbEntity.index];
        this.operationHistoryReservedIds
            = holdingPatternLastReservedIds[this.operationHistoryDbEntity.index];
        this.recordHistoryReservedIds
            = holdingPatternLastReservedIds[this.recordHistoryDbEntity.index];
        this.repoTransHistoryReservedIds
            = holdingPatternLastReservedIds[this.repoTransHistoryDbEntity.index];
        this.transHistoryReservedIds
            = holdingPatternLastReservedIds[this.transHistoryDbEntity.index];
        this.operationHistorySeqBlock = this.getHistorySeqBlock(this.transHistoryDbEntity);
        this.recordHistorySeqBlock = this.getHistorySeqBlock(this.transHistoryDbEntity);
        this.repoTransHistorySeqBlock = this.getHistorySeqBlock(this.transHistoryDbEntity);
        this.transHistorySeqBlock = this.getHistorySeqBlock(this.transHistoryDbEntity);
        [this.operationHistorySeqBlock, this.recordHistorySeqBlock,
            this.repoTransHistorySeqBlock, this.transHistorySeqBlock]
            = await this.sequenceBlockDao.createNewBlocks([
                this.operationHistorySeqBlock,
                this.recordHistorySeqBlock,
                this.repoTransHistorySeqBlock,
                this.transHistorySeqBlock
            ]);
        this.setHistoryIds(this.operationHistoryDbEntity, this.operationHistorySeqBlock, this.operationHistoryIds, this.operationHistoryReservedIds);
        this.setHistoryIds(this.recordHistoryDbEntity, this.recordHistorySeqBlock, this.recordHistoryIds, this.recordHistoryReservedIds);
        this.setHistoryIds(this.repoTransHistoryDbEntity, this.repoTransHistorySeqBlock, this.repoTransHistoryIds, this.repoTransHistoryReservedIds);
        this.setHistoryIds(this.transHistoryDbEntity, this.transHistorySeqBlock, this.transHistoryIds, this.transHistoryReservedIds);
    }
    getHistorySeqBlock(dbEntity) {
        const operationHistorySequence = this.sequences[this.transHistoryDbEntity.schemaVersion.schema.index][this.transHistoryDbEntity.index][this.transHistoryDbEntity.idColumns[0].index];
        return {
            sequence: {
                id: operationHistorySequence.id
            },
            sequenceConsumer: {
                id: this.sequenceConsumer.id
            },
            size: operationHistorySequence.incrementBy
        };
    }
    setHistoryIds(dbEntity, sequenceBlock, ids, reservedIds) {
        ids[dbEntity.idColumns[0].index]
            = sequenceBlock.lastReservedId - sequenceBlock.size + 1;
        reservedIds[dbEntity.idColumns[0].index]
            = sequenceBlock.lastReservedId;
    }
    getHoldingPatternDbEntity(holdingPatternEntityName) {
        return holding_pattern_1.Q.db.currentVersion.entityMapByName[holdingPatternEntityName];
    }
    generateIds(dbColumns, numIds) {
        if (needNewSequences)
            ;
    }
    generateTransactionHistoryIds(numRepositoryTransHistories, numOperationTransHistories, numRecordHistories) {
        const lastReservedId = this.operationHistoryReservedIds[this.operationHistoryDbEntity.idColumns[0].index];
        const currentId = this.operationHistoryIds[this.operationHistoryDbEntity.idColumns[0].index];
        if (currentId + numOperationTransHistories > lastReservedId) {
        }
        const nextTransHistoryId = this.lastIds;
    }
    generateTransHistoryId( //
    ) {
        return this.generateHoldingPatternEntityId('TransactionHistory');
    }
    generateRepoTransHistoryId( //
    ) {
        return this.generateHoldingPatternEntityId('RepositoryTransactionHistory');
    }
    generateOperationHistoryId( //
    ) {
        return this.generateHoldingPatternEntityId('OperationHistory');
    }
    generateRecordHistoryId( //
    ) {
        return this.generateHoldingPatternEntityId('RecordHistory');
    }
    generateHoldingPatternEntityId(holdingPatternEntityName) {
        const dbEntity = holding_pattern_1.Q.db.currentVersion.entityMapByName[holdingPatternEntityName];
        return this.generateEntityId(dbEntity);
    }
    generateEntityId(dbEntity, entity = null) {
        if (!this.lastIds) {
            throw `Id cache is not loaded.`;
            // await this.loadLatestIds();
        }
        let newId = ++this.lastIds[dbEntity.schemaVersion.schema.index][dbEntity.index];
        if (!entity) {
            return newId;
        }
        const recordWithId = {
            ...entity,
        };
        let columnName = dbEntity.idColumns[0].name;
        recordWithId[columnName] = newId;
        return recordWithId;
    }
    /**
     * Ids are tracked on per-Entity basis.  Id's are assigned optimistically can be
     * retroactively updated if sync conflicts arise.  At load time latest ids
     * are loaded into memory and then are maintained in memory for the uptime of the
     * db server.
     * @returns {Promise<void>}
     */
    async loadLatestIds( //
    ) {
        const maxIdRecords = await this.airportDb.db.find.sheet(this.getMaxIdQueries());
        this.lastIds = [];
        for (const maxIdRecord of maxIdRecords) {
            const schemaLastIds = this.utils.ensureChildArray(this.lastIds, maxIdRecord[0]);
            let id = maxIdRecord[2];
            if (!id) {
                id = 0;
            }
            schemaLastIds[maxIdRecord[1]] = id;
        }
    }
    generateByHoldingPatternEntityName(entityName) {
        const dbEntity = holding_pattern_1.Q.db.currentVersion.entityMapByName[entityName];
        return this.generateEntityId(dbEntity);
    }
    getMaxIdQueries() {
        const idQueries = [];
        for (const schema of this.airportDb.schemas) {
            const qSchema = this.airportDb.qSchemas[schema.index];
            for (const entity of schema.currentVersion.entities) {
                if (entity.idColumns.length > 1) {
                    continue;
                }
                const idColumn = entity.idColumns[0];
                if (!idColumn.isGenerated) {
                    continue;
                }
                const qEntity = qSchema[entity.name];
                const select = [];
                select.push(schema.index);
                select.push(entity.index);
                select.push(air_control_1.max(qEntity[idColumn.name]));
                let query = {
                    select,
                    from: [qEntity],
                };
                idQueries.push(query);
            }
        }
        return air_control_1.unionAll(...idQueries);
    }
    ;
};
IdGenerator = __decorate([
    typedi_1.Service(InjectionTokens_1.IdGeneratorToken),
    __param(0, typedi_1.Inject(air_control_1.AirportDatabaseToken)),
    __param(1, typedi_1.Inject(airport_code_1.SequenceBlockDaoToken)),
    __param(2, typedi_1.Inject(airport_code_1.SequenceConsumerDaoToken)),
    __param(3, typedi_1.Inject(airport_code_1.SequenceDaoToken)),
    __param(4, typedi_1.Inject(air_control_1.UtilsToken)),
    __metadata("design:paramtypes", [Object, Object, Object, Object, Object])
], IdGenerator);
exports.IdGenerator = IdGenerator;
//# sourceMappingURL=IdGenerator.js.map