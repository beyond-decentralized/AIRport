"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Lookup_1 = require("./Lookup");
class NonEntityLookup extends Lookup_1.LookupProxy {
    nonEntityLookup(rawNonEntityQuery, queryResultType, search, one, QueryClass) {
        return this.lookup(rawNonEntityQuery, queryResultType, search, one, QueryClass);
    }
}
exports.NonEntityLookup = NonEntityLookup;
//# sourceMappingURL=NonEntityLookup.js.map