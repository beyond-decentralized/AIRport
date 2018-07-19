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
const typedi_1 = require("typedi");
const generated_1 = require("../generated/generated");
const InjectionTokens_1 = require("../InjectionTokens");
let RecordUpdateStageDao = class RecordUpdateStageDao extends generated_1.BaseRecordUpdateStageDao {
    constructor(airportDb, utils) {
        super(utils);
        this.airportDb = airportDb;
    }
    async insertValues(values) {
        const rus = generated_1.Q.RecordUpdateStage;
        const columns = [
            rus.schema.index,
            rus.entity.index,
            rus.repository.id,
            rus.actor.id,
            rus.actorRecordId,
            rus.column.index,
            rus.updatedValue
        ];
        for (let i = 1; i <= 50; i++) {
            columns.push(rus[`updatedColumn${i}Value`]);
        }
        return await this.db.insertValues({
            insertInto: rus,
            columns,
            values
        });
    }
    async updateEntityWhereIds(schemaIndex, tableIndex, idMap, updatedColumnIndexes) {
        const dbEntity = this.airportDb.schemas[schemaIndex].currentVersion.entities[tableIndex];
        const qEntity = this.airportDb.qSchemas[schemaIndex][dbEntity.name];
        const repositoryEquals = [];
        for (const [repositoryId, idsForRepository] of idMap) {
            const actorEquals = [];
            for (const [actorId, idsForActor] of idsForRepository) {
                actorEquals.push(air_control_1.and(qEntity['actor'].id.equals(actorId), qEntity['actorRecordId'].in(Array.from(idsForActor))));
            }
            repositoryEquals.push(air_control_1.and(qEntity['repository'].id.equals(repositoryId), air_control_1.or(...actorEquals)));
        }
        const setClause = {};
        for (const columnIndex of updatedColumnIndexes) {
            let columnRus = generated_1.Q.RecordUpdateStage;
            let columnSetClause = air_control_1.field({
                from: [
                    columnRus
                ],
                select: columnRus.updatedValue,
                where: air_control_1.and(columnRus.schema.index.equals(schemaIndex), columnRus.entity.index.equals(tableIndex), columnRus.repository.id.equals(qEntity.repository.id), columnRus.actor.id.equals(qEntity.actor.id), columnRus.actorRecordId.equals(qEntity.actorRecordId), columnRus.column.index.equals(columnIndex))
            });
            const propertyName = dbEntity.columns[columnIndex]
                .propertyColumns[0].property.name;
            setClause[propertyName] = columnSetClause;
        }
        await this.db.updateColumnsWhere({
            update: qEntity,
            set: setClause,
            where: air_control_1.or(...repositoryEquals)
        });
    }
    async delete( //
    ) {
        return await this.db.deleteWhere({
            deleteFrom: generated_1.Q.RecordUpdateStage
        });
    }
};
RecordUpdateStageDao = __decorate([
    typedi_1.Service(InjectionTokens_1.RecordUpdateStageDaoToken),
    __param(0, typedi_1.Inject(air_control_1.AirportDatabaseToken)),
    __param(1, typedi_1.Inject(air_control_1.UtilsToken)),
    __metadata("design:paramtypes", [Object, Object])
], RecordUpdateStageDao);
exports.RecordUpdateStageDao = RecordUpdateStageDao;
//# sourceMappingURL=RecordUpdateStageDao.js.map