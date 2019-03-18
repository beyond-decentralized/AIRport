"use strict";
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
const diTokens_1 = require("../diTokens");
const generated_1 = require("../generated/generated");
class SchemaVersionDao extends generated_1.BaseSchemaVersionDao {
    constructor() {
        super();
        di_1.DI.get((schemaVersionDmo) => {
            this.schemaVersionDmo = schemaVersionDmo;
        }, diTokens_1.SCHEMA_VERSION_DMO);
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
}
exports.SchemaVersionDao = SchemaVersionDao;
di_1.DI.set(diTokens_1.SCHEMA_VERSION_DAO, SchemaVersionDao);
//# sourceMappingURL=SchemaVersionDao.js.map