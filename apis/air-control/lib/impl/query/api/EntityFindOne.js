"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ground_control_1 = require("@airport/ground-control");
const EntityLookup_1 = require("./EntityLookup");
/**
 * Created by Papa on 11/12/2016.
 */
class EntityFindOne extends EntityLookup_1.EntityLookup {
    graph(rawGraphQuery) {
        return this.findOne(rawGraphQuery, ground_control_1.QueryResultType.ENTITY_GRAPH);
    }
    tree(rawTreeQuery) {
        return this.findOne(rawTreeQuery, ground_control_1.QueryResultType.ENTITY_TREE);
    }
    findOne(rawEntityQuery, queryResultType) {
        return this.entityLookup(rawEntityQuery, queryResultType, false, true);
    }
}
exports.EntityFindOne = EntityFindOne;
//# sourceMappingURL=EntityFindOne.js.map