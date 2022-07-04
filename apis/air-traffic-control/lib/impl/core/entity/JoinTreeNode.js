import { JoinType, JSONRelationType } from "@airport/ground-control";
/**
 * Created by Papa on 10/18/2016.
 */
export class JoinTreeNode {
    constructor(jsonRelation, childNodes, parentNode) {
        this.jsonRelation = jsonRelation;
        this.childNodes = childNodes;
        this.parentNode = parentNode;
    }
    addChildNode(joinTreeNode) {
        let childFromClausePositionArray = joinTreeNode.jsonRelation.fromClausePosition;
        let childPosition = childFromClausePositionArray[childFromClausePositionArray.length - 1];
        this.childNodes[childPosition] = joinTreeNode;
    }
    getEntityRelationChildNode(dbRelation) {
        return this.getEntityRelationChildNodeByIndexes(dbRelation.property.entity.applicationVersion._localId, dbRelation.property.entity.index, dbRelation.index);
    }
    getEntityRelationChildNodeByIndexes(applicationIndex, tableIndex, relationIndex) {
        let matchingNodes = this.childNodes.filter((childNode) => {
            return childNode.jsonRelation.ri === relationIndex;
        });
        switch (matchingNodes.length) {
            case 0:
                break;
            case 1:
                return matchingNodes[0];
            default:
                throw new Error(`More than one child node matched relation property index '${relationIndex}'`);
        }
        // No node matched, this must be reference to a sub-entity in select clause (in a Entity
        // query)
        let childPosition = this.jsonRelation.fromClausePosition.slice();
        childPosition.push(this.childNodes.length);
        let rootEntityPrefix;
        if (this.parentNode) {
            rootEntityPrefix = this.parentNode.jsonRelation.rep;
        }
        else {
            rootEntityPrefix = this.jsonRelation.rep;
        }
        let jsonEntityRelation = {
            currentChildIndex: 0,
            fromClausePosition: childPosition,
            ti: tableIndex,
            jt: JoinType.LEFT_JOIN,
            rt: JSONRelationType.ENTITY_APPLICATION_RELATION,
            rep: rootEntityPrefix,
            ri: relationIndex,
            si: applicationIndex
        };
        let childTreeNode = new JoinTreeNode(jsonEntityRelation, [], this);
        this.addChildNode(childTreeNode);
        return childTreeNode;
    }
}
//# sourceMappingURL=JoinTreeNode.js.map