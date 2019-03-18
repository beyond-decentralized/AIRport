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
class SchemaColumnDao extends generated_1.BaseSchemaColumnDao {
    findAllForEntities(entityIds) {
        return __awaiter(this, void 0, void 0, function* () {
            let c;
            return this.db.find.tree({
                select: {},
                from: [
                    c = generated_1.Q.SchemaColumn
                ],
                where: c.entity.id.in(entityIds)
            });
        });
    }
}
exports.SchemaColumnDao = SchemaColumnDao;
di_1.DI.set(diTokens_1.SCHEMA_COLUMN_DAO, SchemaColumnDao);
//# sourceMappingURL=SchemaColumnDao.js.map