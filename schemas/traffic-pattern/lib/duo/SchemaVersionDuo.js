"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const di_1 = require("@airport/di");
const diTokens_1 = require("../diTokens");
const generated_1 = require("../generated/generated");
class SchemaVersionDuo extends generated_1.BaseSchemaVersionDuo {
}
exports.SchemaVersionDuo = SchemaVersionDuo;
di_1.DI.set(diTokens_1.SCHEMA_VERSION_DUO, SchemaVersionDuo);
//# sourceMappingURL=SchemaVersionDuo.js.map