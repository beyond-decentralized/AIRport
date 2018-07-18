"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ground_control_1 = require("@airport/ground-control");
/**
 * Created by Papa on 10/18/2016.
 */
class JoinTreeNode {
    constructor(jsonRelation, childNodes, parentNode) {
        this.jsonRelation = jsonRelation;
        this.childNodes = childNodes;
        this.parentNode = parentNode;
    }
    addChildNode(joinTreeNode) {
        let childFromClausePositionArray = joinTreeNode.jsonRelation.fcp;
        let childPosition = childFromClausePositionArray[childFromClausePositionArray.length - 1];
        this.childNodes[childPosition] = joinTreeNode;
    }
    getEntityRelationChildNode(dbRelation) {
        return this.getEntityRelationChildNodeByIndexes(dbRelation.property.entity.schemaVersion.id, dbRelation.property.entity.index, dbRelation.index);
    }
    getEntityRelationChildNodeByIndexes(schemaVersionId, tableIndex, relationIndex) {
        let matchingNodes = this.childNodes.filter((childNode) => {
            return childNode.jsonRelation.ri === relationIndex;
        });
        switch (matchingNodes.length) {
            case 0:
                break;
            case 1:
                return matchingNodes[0];
            default:
                throw `More than one child node matched relation property index '${relationIndex}'`;
        }
        // No node matched, this must be reference to a sub-entity in select clause (in a Entity
        // query)
        let childPosition = this.jsonRelation.fcp.slice();
        childPosition.push(this.childNodes.length);
        let rootEntityPrefix;
        if (this.parentNode) {
            rootEntityPrefix = this.parentNode.jsonRelation.rep;
        }
        else {
            rootEntityPrefix = this.jsonRelation.rep;
        }
        let jsonEntityRelation = {
            cci: 0,
            fcp: childPosition,
            ti: tableIndex,
            jt: ground_control_1.JoinType.LEFT_JOIN,
            rt: ground_control_1.JSONRelationType.ENTITY_SCHEMA_RELATION,
            rep: rootEntityPrefix,
            ri: relationIndex,
            si: schemaVersionId
        };
        let childTreeNode = new JoinTreeNode(jsonEntityRelation, [], this);
        this.addChildNode(childTreeNode);
        return childTreeNode;
    }
}
exports.JoinTreeNode = JoinTreeNode;
//# sourceMappingURL=JoinTreeNode.js.map