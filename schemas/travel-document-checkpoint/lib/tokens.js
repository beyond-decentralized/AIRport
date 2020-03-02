"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const di_1 = require("@airport/di");
const travelDocumentCheckpoint = di_1.system('airport').lib('travel-document-checkpoint');
exports.TERMINAL_DAO = travelDocumentCheckpoint.token();
exports.USER_DAO = travelDocumentCheckpoint.token();
//# sourceMappingURL=tokens.js.map