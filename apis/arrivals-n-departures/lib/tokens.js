"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const di_1 = require("@airport/di");
const arrivalsNDepartures = di_1.system('airport').lib('arrivals-n-departures');
exports.MESSAGE_FROM_TM_DESERIALIZER = arrivalsNDepartures.token();
exports.MESSAGE_FROM_TM_SERIALIZER = arrivalsNDepartures.token();
exports.MESSAGE_FROM_TM_VERIFIER = arrivalsNDepartures.token();
exports.MESSAGE_TO_TM_DESERIALIZER = arrivalsNDepartures.token();
exports.MESSAGE_TO_TM_SERIALIZER = arrivalsNDepartures.token();
exports.MESSAGE_TO_TM_VERIFIER = arrivalsNDepartures.token();
exports.SYNC_CONNECTION_SERVER = arrivalsNDepartures.token();
exports.TM_DATA_SERIALIZER = arrivalsNDepartures.token();
exports.TM_DATA_DESERIALIZER = arrivalsNDepartures.token();
exports.TM_DATA_FORMAT_VERIFIER = arrivalsNDepartures.token();
exports.TM_DATA_SCHEMA_VERIFIER = arrivalsNDepartures.token();
//# sourceMappingURL=tokens.js.map