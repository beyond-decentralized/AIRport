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
let SequenceBlockDao = class SequenceBlockDao extends generated_1.BaseSequenceBlockDao {
    constructor(utils) {
        super(utils);
    }
    async createNewBlocks(sequenceConsumerId, sequenceIds, schemaIndexes, tableIndexes, columnIndexes, sizes, reservationMillis) {
        const sb = generated_1.Q.SequenceBlock;
        this.db.insertValuesGenerateIds({
            insertInto: sb,
            columns: [
                sb.sequence.id,
                sb.consumer.id,
                sb.size,
                sb.lastReservedId,
                sb.reservationMillis
            ],
            values: []
        });
    }
};
SequenceBlockDao = __decorate([
    typedi_1.Service(InjectionTokens_1.SequenceBlockDaoToken),
    __param(0, typedi_1.Inject(air_control_1.UtilsToken)),
    __metadata("design:paramtypes", [Object])
], SequenceBlockDao);
exports.SequenceBlockDao = SequenceBlockDao;
//# sourceMappingURL=SequenceBlockDao.js.map