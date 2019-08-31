"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const schema_1 = require("@airport/airport-code/lib/generated/schema");
const schema_2 = require("@airport/holding-pattern/lib/generated/schema");
const schema_3 = require("@airport/territory/lib/generated/schema");
const schema_4 = require("@airport/traffic-pattern/lib/generated/schema");
const schema_5 = require("@airport/travel-document-checkpoint/lib/generated/schema");
// TODO: remove once used
// import {TERMINAL_DAO} from '@airport/travel-document-checkpoint'
// var temp = TERMINAL_DAO
exports.BLUEPRINT = [
    schema_3.SCHEMA,
    schema_1.SCHEMA,
    schema_5.SCHEMA,
    schema_4.SCHEMA,
    schema_2.SCHEMA
];
//# sourceMappingURL=index.js.map