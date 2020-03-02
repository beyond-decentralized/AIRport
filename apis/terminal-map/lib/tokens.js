"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const di_1 = require("@airport/di");
const terminalMap = di_1.system('airport').lib('terminal-map');
exports.TERMINAL_STORE = terminalMap.token();
exports.TRANSACTION_MANAGER = terminalMap.token();
//# sourceMappingURL=tokens.js.map