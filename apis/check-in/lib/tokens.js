"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const di_1 = require("@airport/di");
const checkIn = di_1.system('airport').lib('check-in');
exports.SEQUENCE_GENERATOR = checkIn.token();
//# sourceMappingURL=tokens.js.map