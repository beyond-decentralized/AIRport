import { IOC } from "@airport/direction-indicator";
import { JSONRelationType } from "@airport/ground-control";
import { ENTITY_UTILS } from "../../../core-tokens";
import { extend } from "../../utils/qApplicationBuilderUtils";
import { QEntity, QEntityDriver } from "./Entity";
export function QTree(fromClausePosition = [], subQuery) {
    QTree.base.constructor.call(this, null, fromClausePosition, null, null, QTreeDriver);
    this.__driver__.subQuery = subQuery;
}
const qTreeMethods = {
/*
yourMethodName: function() {},
*/
};
extend(QEntity, QTree, qTreeMethods);
export class QTreeDriver extends QEntityDriver {
    getInstance() {
        let instance = super.getInstance();
        instance.__driver__
            .subQuery = this.subQuery;
        return instance;
    }
    // getRelationPropertyName(): string {
    // 	throw new Error(`not implemented`);
    // }
    getJoinRelationJson(jsonRelation, columnAliases, queryUtils, fieldUtils, relationManager) {
        jsonRelation = super.getJoinRelationJson(jsonRelation, columnAliases, queryUtils, fieldUtils, relationManager);
        jsonRelation.rt = JSONRelationType.SUB_QUERY_JOIN_ON;
        jsonRelation.subQuery =
            // Removes circular dependency at code initialization time 
            IOC.getSync(ENTITY_UTILS).getTreeQuery(this.subQuery, columnAliases.entityAliases)
                .toJSON(queryUtils, fieldUtils, relationManager);
        return jsonRelation;
    }
    getRootRelationJson(jsonRelation, columnAliases, queryUtils, fieldUtils, relationManager) {
        jsonRelation = super.getJoinRelationJson(jsonRelation, columnAliases, queryUtils, fieldUtils, relationManager);
        jsonRelation.rt = JSONRelationType.SUB_QUERY_ROOT;
        jsonRelation.subQuery =
            // Removes circular dependency at code initialization time 
            IOC.getSync(ENTITY_UTILS).getTreeQuery(this.subQuery, columnAliases.entityAliases)
                .toJSON(queryUtils, fieldUtils, relationManager);
        return jsonRelation;
    }
}
//# sourceMappingURL=Tree.js.map