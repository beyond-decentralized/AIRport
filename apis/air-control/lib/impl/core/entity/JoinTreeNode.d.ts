import { DbRelation, JSONRelation, RelationIndex, SchemaIndex, TableIndex } from "@airport/ground-control";
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
    getEntityRelationChildNodeByIndexes(schemaIndex: SchemaIndex, tableIndex: TableIndex, relationIndex: RelationIndex): JoinTreeNode;
}
//# sourceMappingURL=JoinTreeNode.d.ts.map