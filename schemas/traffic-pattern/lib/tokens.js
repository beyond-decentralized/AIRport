"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const di_1 = require("@airport/di");
const trafficPattern = di_1.system('airport').lib('traffic-pattern');
exports.NPMJS_ORG___AIRPORT_TRAFFIC_PATTERN_QSCHEMA = 'NPMJS_ORG___AIRPORT_TRAFFIC_PATTERN_QSCHEMA';
exports.NPMJS_ORG___AIRPORT_TRAFFIC_PATTERN_DAOS = trafficPattern.token();
exports.NPMJS_ORG___AIRPORT_TRAFFIC_PATTERN_DUOS = trafficPattern.token();
exports.SCHEMA_COLUMN_DAO = trafficPattern.token();
exports.SCHEMA_DAO = trafficPattern.token();
exports.SCHEMA_ENTITY_DAO = trafficPattern.token();
exports.SCHEMA_PROPERTY_COLUMN_DAO = trafficPattern.token();
exports.SCHEMA_PROPERTY_DAO = trafficPattern.token();
exports.SCHEMA_REFERENCE_DAO = trafficPattern.token();
exports.SCHEMA_RELATION_COLUMN_DAO = trafficPattern.token();
exports.SCHEMA_RELATION_DAO = trafficPattern.token();
exports.SCHEMA_VERSION_DAO = trafficPattern.token();
exports.SCHEMA_VERSION_DUO = trafficPattern.token();
//# sourceMappingURL=tokens.js.map