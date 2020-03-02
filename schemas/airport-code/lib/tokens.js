"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const di_1 = require("@airport/di");
const airportCode = di_1.system('airport').lib('airport-code');
exports.SEQUENCE_DAO = airportCode.token();
exports.TERMINAL_RUN_DAO = airportCode.token();
//# sourceMappingURL=tokens.js.map