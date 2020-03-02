"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const di_1 = require("@airport/di");
const groundControl = di_1.system('airport').lib('ground-control');
exports.STORE_DRIVER = groundControl.token();
exports.TRANS_CONNECTOR = groundControl.token();
//# sourceMappingURL=tokens.js.map