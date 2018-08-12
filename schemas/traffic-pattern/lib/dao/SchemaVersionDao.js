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
const LogicalOperation_1 = require("@airport/air-control/lib/impl/core/operation/LogicalOperation");
const InjectionTokens_1 = require("@airport/air-control/lib/InjectionTokens");
const typedi_1 = require("typedi");
const generated_1 = require("../generated/generated");
const InjectionTokens_2 = require("../InjectionTokens");
let SchemaVersionDao = class SchemaVersionDao extends generated_1.BaseSchemaVersionDao {
    constructor(airportDatabase, utils) {
        super(utils);
        this.airportDatabase = airportDatabase;
    }
    findMaxVersionedMapBySchemaAndDomainNames(schemaDomainNames, schemaNames) {
        return __awaiter(this, void 0, void 0, function* () {
            const maxVersionedMapBySchemaAndDomainNames = new Map();
            let sv;
            let s;
            let d;
            let sMaV;
            let sMiV;
            const maxSchemaVersions = yield this.airportDatabase.db.find.tree({
                from: [
                    sv = generated_1.Q.SchemaVersion,
                    s = sv.schema.innerJoin(),
                    d = s.domain.innerJoin()
                ],
                select: {
                    integerVersion: Functions_1.max(sv.integerVersion),
                    majorVersion: sv.majorVersion,
                    minorVersion: sv.minorVersion,
                    patchVersion: sv.patchVersion,
                    schema: {
                        index: s.index,
                        name: s.name,
                        domain: {
                            id: d.id,
                            name: d.name
                        }
                    },
                    id: sv.id
                },
                where: LogicalOperation_1.and(d.name.in(schemaDomainNames), s.name.in(schemaNames)),
                groupBy: [
                    sv.majorVersion,
                    sv.minorVersion,
                    sv.patchVersion,
                    s.index,
                    s.name,
                    d.id,
                    d.name
                ]
            });
            // const maxSchemaVersions: ISchemaVersion[] = await this.airportDatabase.db.find.tree({
            // 	from: [
            // 		sMiV = tree({
            // 			from: [
            // 				sMaV = tree({
            // 					from: [
            // 						s = Q.Schema,
            // 						sv = s.versions.innerJoin(),
            // 						d = s.domain.innerJoin()
            // 					],
            // 					select: {
            // 						index: s.index,
            // 						schemaVersionId: sv.id,
            // 						domainId: d.id,
            // 						domainName: d.name,
            // 						name: s.name,
            // 						majorVersion: max(sv.majorVersion),
            // 						minorVersion: sv.minorVersion,
            // 						patchVersion: sv.patchVersion,
            // 					},
            // 					where: and(
            // 						d.name.in(schemaDomainNames),
            // 						s.name.in(schemaNames)
            // 					),
            // 					groupBy: [
            // 						s.index,
            // 						d.id,
            // 						d.name,
            // 						s.name,
            // 						sv.minorVersion,
            // 						sv.patchVersion,
            // 					]
            // 				})],
            // 			select: {
            // 				index: sMaV.index,
            // 				schemaVersionId: sMaV.schemaVersionId,
            // 				domainId: sMaV.domainId,
            // 				domainName: sMaV.domainName,
            // 				name: sMaV.name,
            // 				majorVersion: sMaV.majorVersion,
            // 				minorVersion: max(sMaV.minorVersion),
            // 				patchVersion: sMaV.patchVersion,
            // 			},
            // 			groupBy: [
            // 				sMaV.index,
            // 				sMaV.domainId,
            // 				sMaV.domainName,
            // 				sMaV.name,
            // 				sMaV.majorVersion,
            // 				sMaV.patchVersion
            // 			]
            // 		})],
            // 	select: {
            // 		majorVersion: sMiV.majorVersion,
            // 		minorVersion: sMiV.minorVersion,
            // 		patchVersion: max(sMiV.patchVersion),
            // 		schema: {
            // 			index: sMiV.index,
            // 			name: sMiV.name,
            // 			domain: {
            // 				id: sMiV.domainId,
            // 				name: sMiV.domainName,
            //
            // 			}
            // 		},
            // 		id: sMiV.schemaVersionId
            // 	},
            // 	groupBy: [
            // 		sMiV.index,
            // 		sMiV.domainId,
            // 		sMiV.domainName,
            // 		sMiV.name,
            // 		sMiV.majorVersion,
            // 		sMiV.minorVersion
            // 	]
            // })
            for (const maxSchemaVersion of maxSchemaVersions) {
                const schema = maxSchemaVersion.schema;
                this.utils.ensureChildJsMap(maxVersionedMapBySchemaAndDomainNames, schema.domain.name)
                    .set(schema.name, maxSchemaVersion);
            }
            return maxVersionedMapBySchemaAndDomainNames;
        });
    }
};
SchemaVersionDao = __decorate([
    typedi_1.Service(InjectionTokens_2.SchemaVersionDaoToken),
    __param(0, typedi_1.Inject(InjectionTokens_1.AirportDatabaseToken)),
    __param(1, typedi_1.Inject(air_control_1.UtilsToken)),
    __metadata("design:paramtypes", [Object, Object])
], SchemaVersionDao);
exports.SchemaVersionDao = SchemaVersionDao;
//# sourceMappingURL=SchemaVersionDao.js.map