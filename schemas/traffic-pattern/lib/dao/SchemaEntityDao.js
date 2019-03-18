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
const di_1 = require("@airport/di");
const generated_1 = require("../generated/generated");
const diTokens_1 = require("../diTokens");
class SchemaEntityDao extends generated_1.BaseSchemaEntityDao {
    findAllForSchemaVersions(schemaVersionIds) {
        return __awaiter(this, void 0, void 0, function* () {
            let se;
            return yield this.db.find.tree({
                select: {},
                from: [
                    se = generated_1.Q.SchemaEntity
                ],
                where: se.schemaVersion.id.in(schemaVersionIds)
            });
        });
    }
}
exports.SchemaEntityDao = SchemaEntityDao;
di_1.DI.set(diTokens_1.SCHEMA_ENTITY_DAO, SchemaEntityDao);
//# sourceMappingURL=SchemaEntityDao.js.map