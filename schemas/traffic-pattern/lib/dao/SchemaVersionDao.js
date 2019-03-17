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
const di_1 = require("@airport/di");
const generated_1 = require("../generated/generated");
const InjectionTokens_1 = require("../InjectionTokens");
let SchemaVersionDao = class SchemaVersionDao extends generated_1.BaseSchemaVersionDao {
    constructor(utils) {
        super();
        di_1.DI.get(di => {
            [this.airportDatabase, this.schemaVersionDmo] = di;
        }, air_control_1.AIRPORT_DATABASE, InjectionTokens_1.SCHEMA_VERSION_DMO);
    }
    findAllLatestForSchemaIndexes(schemaIndexes) {
        return __awaiter(this, void 0, void 0, function* () {
            let sv;
            return yield this.db.find.tree({
                from: [
                    sv = generated_1.Q.SchemaVersion
                ],
                select: {},
                where: air_control_1.and(sv.id.in(this.idsForMaxVersionSelect()), sv.schema.index.in(schemaIndexes))
            });
        });
    }
    findMaxVersionedMapBySchemaAndDomainNames(schemaDomainNames, schemaNames) {
        return __awaiter(this, void 0, void 0, function* () {
            const maxVersionedMapBySchemaAndDomainNames = new Map();
            let sv;
            let s;
            let d;
            const maxSchemaVersions = yield this.db.find.tree({
                select: {
                    integerVersion: air_control_1.Y,
                    majorVersion: air_control_1.Y,
                    minorVersion: air_control_1.Y,
                    patchVersion: air_control_1.Y,
                    schema: {
                        index: air_control_1.Y,
                        name: air_control_1.Y,
                        domain: {
                            id: air_control_1.Y,
                            name: air_control_1.Y
                        }
                    },
                    id: air_control_1.Y
                },
                from: [
                    sv = generated_1.Q.SchemaVersion,
                    s = sv.schema.innerJoin(),
                    d = s.domain.innerJoin()
                ],
                where: air_control_1.and(sv.id.in(this.idsForMaxVersionSelect()), d.name.in(schemaDomainNames), s.name.in(schemaNames)),
            });
            for (const maxSchemaVersion of maxSchemaVersions) {
                const schema = maxSchemaVersion.schema;
                this.utils.ensureChildJsMap(maxVersionedMapBySchemaAndDomainNames, schema.domain.name)
                    .set(schema.name, maxSchemaVersion);
            }
            return maxVersionedMapBySchemaAndDomainNames;
        });
    }
    idsForMaxVersionSelect() {
        let svMax;
        let sv2;
        return air_control_1.field({
            from: [
                svMax = air_control_1.tree({
                    from: [
                        sv2 = generated_1.Q.SchemaVersion
                    ],
                    select: air_control_1.distinct({
                        integerVersion: air_control_1.max(sv2.integerVersion),
                        id: sv2.id,
                        schemaIndex: sv2.schema.index
                    })
                })
            ],
            select: svMax.id
        });
    }
};
SchemaVersionDao = __decorate([
    __param(0, Inject(AirportDatabaseToken)),
    __param(0, Inject(InjectionTokens_1.SCHEMA_VERSION_DMO)),
    __param(0, Inject(UtilsToken)),
    __metadata("design:paramtypes", [Object])
], SchemaVersionDao);
exports.SchemaVersionDao = SchemaVersionDao;
di_1.DI.set(InjectionTokens_1.SCHEMA_VERSION_DAO, SchemaVersionDao);
//# sourceMappingURL=SchemaVersionDao.js.map