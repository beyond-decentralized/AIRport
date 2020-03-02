"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const di_1 = require("@airport/di");
const airControl = di_1.system('airport').lib('air-control');
exports.AIR_DB = airControl.token();
exports.DB_FACADE = airControl.token();
exports.LOOKUP = airControl.token();
exports.ENTITY_UTILS = airControl.token();
exports.FIELD_UTILS = airControl.token();
exports.Q_METADATA_UTILS = airControl.token();
exports.QUERY_FACADE = airControl.token();
exports.QUERY_UTILS = airControl.token();
exports.SCHEMA_UTILS = airControl.token();
exports.UPDATE_CACHE = airControl.token();
//# sourceMappingURL=tokens.js.map