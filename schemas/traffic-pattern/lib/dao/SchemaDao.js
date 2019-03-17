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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const air_control_1 = require("@airport/air-control");
const Functions_1 = require("@airport/air-control/lib/impl/core/field/Functions");
const Joins_1 = require("@airport/air-control/lib/impl/core/Joins");
const LogicalOperation_1 = require("@airport/air-control/lib/impl/core/operation/LogicalOperation");
const InjectionTokens_1 = require("@airport/air-control/lib/InjectionTokens");
const Inject_1 = require("typedi/decorators/Inject");
const Service_1 = require("typedi/decorators/Service");
const generated_1 = require("../generated/generated");
const InjectionTokens_2 = require("../InjectionTokens");
let SchemaDao = class SchemaDao extends generated_1.BaseSchemaDao {
    constructor(airportDatabase, utils) {
        super(utils);
        this.airportDatabase = airportDatabase;
    }
    findAllActive() {
        return __awaiter(this, void 0, void 0, function* () {
            let s;
            return this.db.find.tree({
                select: {},
                from: [
                    s = generated_1.Q.Schema
                ],
                where: s.removedInVersion.id.isNull()
            });
        });
    }
    findMapByVersionIds(schemaVersionIds) {
        return __awaiter(this, void 0, void 0, function* () {
            const schemaMapByIndex = new Map();
            let s, sv;
            const schemas = yield this.db.find.tree({
                select: {
                    index: air_control_1.Y,
                    domain: {
                        id: air_control_1.Y,
                        name: air_control_1.Y
                    },
                    name: air_control_1.Y,
                    versions: {
                        id: air_control_1.Y,
                        majorVersion: air_control_1.Y,
                        minorVersion: air_control_1.Y,
                        patchVersion: air_control_1.Y
                    }
                },
                from: [
                    s = generated_1.Q.Schema,
                    sv = s.versions.innerJoin()
                ],
                where: sv.id.in(schemaVersionIds)
            });
            for (const schema of schemas) {
                for (const schemaVersion of schema.versions) {
                    schemaMapByIndex.set(schemaVersion.id, schema);
                }
            }
            return schemaMapByIndex;
        });
    }
    findMaxIndex() {
        return __awaiter(this, void 0, void 0, function* () {
            const s = generated_1.Q.Schema;
            return yield this.airportDatabase.findOne.field({
                select: Functions_1.max(s.index),
                from: [
                    s
                ]
            });
        });
    }
    findMaxVersionedMapBySchemaAndDomainNames(schemaDomainNames, schemaNames) {
        return __awaiter(this, void 0, void 0, function* () {
            const maxVersionedMapBySchemaAndDomainNames = new Map();
            let sv;
            let s;
            let d;
            let sMaV;
            let sMiV;
            const schemas = yield this.airportDatabase.db.find.tree({
                from: [
                    sMiV = Joins_1.tree({
                        from: [
                            sMaV = Joins_1.tree({
                                from: [
                                    s = generated_1.Q.Schema,
                                    sv = s.versions.innerJoin(),
                                    d = s.domain.innerJoin()
                                ],
                                select: {
                                    index: s.index,
                                    domainId: d.id,
                                    domainName: d.name,
                                    name: s.name,
                                    majorVersion: Functions_1.max(sv.majorVersion),
                                    minorVersion: sv.minorVersion,
                                    patchVersion: sv.patchVersion,
                                },
                                where: LogicalOperation_1.and(d.name.in(schemaDomainNames), s.name.in(schemaNames)),
                                groupBy: [
                                    s.index,
                                    d.id,
                                    d.name,
                                    s.name,
                                    sv.minorVersion,
                                    sv.patchVersion,
                                ]
                            })
                        ],
                        select: {
                            index: sMaV.index,
                            domainId: sMaV.domainId,
                            domainName: sMaV.domainName,
                            name: sMaV.name,
                            majorVersion: sMaV.majorVersion,
                            minorVersion: Functions_1.max(sMaV.minorVersion),
                            patchVersion: sMaV.patchVersion,
                        },
                        groupBy: [
                            sMaV.index,
                            sMaV.domainId,
                            sMaV.domainName,
                            sMaV.name,
                            sMaV.majorVersion,
                            sMaV.patchVersion
                        ]
                    })
                ],
                select: {
                    index: sMiV.index,
                    domain: {
                        id: sMiV.domainId,
                        name: sMiV.domainName
                    },
                    name: sMiV.name,
                    majorVersion: sMiV.majorVersion,
                    minorVersion: sMiV.minorVersion,
                    patchVersion: Functions_1.max(sMiV.patchVersion),
                },
                groupBy: [
                    sMiV.index,
                    sMiV.domainId,
                    sMiV.domainName,
                    sMiV.name,
                    sMiV.majorVersion,
                    sMiV.minorVersion
                ]
            });
            for (const schema of schemas) {
                this.utils.ensureChildJsMap(maxVersionedMapBySchemaAndDomainNames, schema.domain.name)
                    .set(schema.name, schema);
            }
            return maxVersionedMapBySchemaAndDomainNames;
        });
    }
    setStatusByIndexes(indexes, status) {
        return __awaiter(this, void 0, void 0, function* () {
            let s;
            yield this.db.updateWhere({
                update: s = generated_1.Q.Schema,
                set: {
                    status
                },
                where: s.index.in(indexes)
            });
        });
    }
    findMapByNames(schemaNames) {
        return __awaiter(this, void 0, void 0, function* () {
            const mapByName = new Map();
            let s;
            const records = yield this.db.find.tree({
                select: {},
                from: [s],
                where: s.name.in(schemaNames)
            });
            for (const record of records) {
                mapByName.set(record.name, record);
            }
            return mapByName;
        });
    }
};
SchemaDao = __decorate([
    Service_1.Service(InjectionTokens_2.SCHEMA_DAO),
    __param(0, Inject_1.Inject(InjectionTokens_1.AirportDatabaseToken)),
    __param(1, Inject_1.Inject(InjectionTokens_1.UtilsToken)),
    __metadata("design:paramtypes", [Object, Object])
], SchemaDao);
exports.SchemaDao = SchemaDao;
//# sourceMappingURL=SchemaDao.js.map