"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ground_control_1 = require("@airport/ground-control");
const EntityLookup_1 = require("./EntityLookup");
/**
 * Created by Papa on 11/12/2016.
 */
class EntityFind extends EntityLookup_1.EntityLookup {
    graph(rawGraphQuery) {
        return this.find(rawGraphQuery, ground_control_1.QueryResultType.ENTITY_GRAPH);
    }
    tree(rawTreeQuery) {
        return this.find(rawTreeQuery, ground_control_1.QueryResultType.ENTITY_TREE);
    }
    find(rawEntityQuery, queryResultType) {
        return this.entityLookup(rawEntityQuery, queryResultType, false, false);
    }
}
exports.EntityFind = EntityFind;
//# sourceMappingURL=EntityFind.js.map