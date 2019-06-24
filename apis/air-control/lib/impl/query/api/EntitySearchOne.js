"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ground_control_1 = require("@airport/ground-control");
const observe_1 = require("@airport/observe");
const EntityLookup_1 = require("./EntityLookup");
/**
 * Created by Papa on 11/12/2016.
 */
class EntitySearchOne extends EntityLookup_1.EntityLookup {
    graph(rawGraphQuery) {
        return observe_1.Observable.from(this.searchOne(rawGraphQuery, ground_control_1.QueryResultType.ENTITY_GRAPH));
    }
    tree(rawTreeQuery) {
        return observe_1.Observable.from(this.searchOne(rawTreeQuery, ground_control_1.QueryResultType.ENTITY_TREE));
    }
    searchOne(rawEntityQuery, queryResultType) {
        return this.entityLookup(rawEntityQuery, queryResultType, true, true);
    }
}
exports.EntitySearchOne = EntitySearchOne;
//# sourceMappingURL=EntitySearchOne.js.map