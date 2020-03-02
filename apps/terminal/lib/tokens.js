"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const di_1 = require("@airport/di");
const terminal = di_1.system('airport').lib('terminal');
exports.DATABASE_MANAGER = terminal.token();
exports.DELETE_MANAGER = terminal.token();
exports.HISTORY_MANAGER = terminal.token();
exports.INSERT_MANAGER = terminal.token();
exports.OFFLINE_DELTA_STORE = terminal.token();
exports.ONLINE_MANAGER = terminal.token();
exports.QUERY_MANAGER = terminal.token();
exports.REPOSITORY_MANAGER = terminal.token();
exports.UPDATE_MANAGER = terminal.token();
//# sourceMappingURL=tokens.js.map