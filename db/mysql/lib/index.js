"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
const air_control_1 = require("@airport/air-control");
const di_1 = require("@airport/di");
const terminal_1 = require("@airport/terminal");
__export(require("./DDLManager"));
__export(require("./MySqlDriver"));
__export(require("./MySqlSequenceGenerator"));
async function startDb(domainName, ...schemas) {
    await di_1.DI.db().get(air_control_1.AIR_DB);
    const dbManager = await di_1.DI.db().get(terminal_1.DATABASE_MANAGER);
    await dbManager.init(domainName, schemas);
}
exports.startDb = startDb;
async function closeDb() {
}
exports.closeDb = closeDb;
//# sourceMappingURL=index.js.map