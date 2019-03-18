"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
const di_1 = require("@airport/di");
const diTokens_1 = require("../diTokens");
__export(require("./SchemaColumnDao"));
__export(require("./SchemaDao"));
__export(require("./SchemaEntityDao"));
__export(require("./SchemaPropertyColumnDao"));
__export(require("./SchemaPropertyDao"));
__export(require("./SchemaReferenceDao"));
__export(require("./SchemaRelationColumnDao"));
__export(require("./SchemaRelationDao"));
__export(require("./SchemaVersionDao"));
class AtAirport_TrafficPattern_Daos {
}
di_1.DI.set(diTokens_1.NPMJS_ORG___AIRPORT_TRAFFIC_PATTERN_DAOS, AtAirport_TrafficPattern_Daos);
//# sourceMappingURL=dao.js.map