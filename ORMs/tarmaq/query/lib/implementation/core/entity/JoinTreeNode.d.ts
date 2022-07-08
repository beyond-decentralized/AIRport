import { DbRelation, JSONRelation, ApplicationRelation_Index, Application_Index, ApplicationEntity_TableIndex } from "@airport/ground-control";
/**
 * Created by Papa on 10/18/2016.
 */
export declare class JoinTreeNode {
    jsonRelation: JSONRelation;
    childNodes: JoinTreeNode[];
    parentNode: JoinTreeNode;
    constructor(jsonRelation: JSONRelation, childNodes: JoinTreeNode[], parentNode: JoinTreeNode);
    addChildNode(joinTreeNode: JoinTreeNode): void;
    getEntityRelationChildNode(dbRelation: DbRelation): JoinTreeNode;
    getEntityRelationChildNodeByIndexes(applicationIndex: Application_Index, tableIndex: ApplicationEntity_TableIndex, relationIndex: ApplicationRelation_Index): JoinTreeNode;
}
//# sourceMappingURL=JoinTreeNode.d.ts.map