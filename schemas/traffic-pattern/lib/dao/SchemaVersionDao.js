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
const diTokens_1 = require("../diTokens");
const generated_1 = require("../generated/generated");
class SchemaVersionDao extends generated_1.BaseSchemaVersionDao {
    /*
    async findAllLatestForSchemaIndexes(
        schemaIndexes: SchemaIndex[]
    ): Promise<ISchemaVersion[]> {
        let sv: QSchemaVersion

        return await this.db.find.tree({
            from: [
                sv = Q.SchemaVersion
            ],
            select: {},
            where: and(
                sv.id.in(this.idsForMaxVersionSelect()),
                sv.schema.index.in(schemaIndexes)
            )
        })
    }
    */
    findAllActiveOrderBySchemaIndexAndId() {
        return __awaiter(this, void 0, void 0, function* () {
            let sv;
            let s;
            return yield this.db.find.tree({
                from: [
                    sv = generated_1.Q.SchemaVersion,
                    s = sv.schema.innerJoin()
                ],
                select: {},
                orderBy: [
                    sv.schema.index.asc(),
                    sv.id.desc()
                ]
            });
        });
    }
}
exports.SchemaVersionDao = SchemaVersionDao;
di_1.DI.set(diTokens_1.SCHEMA_VERSION_DAO, SchemaVersionDao);
//# sourceMappingURL=SchemaVersionDao.js.map