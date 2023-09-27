import {
	DbRelation,
	JoinType,
	QueryEntityRelation,
	QueryRelation,
	QueryRelationType,
	DbRelation_Index,
	Application_Index,
	DbEntity_TableIndex
} from "@airport/ground-control";

/**
 * Created by Papa on 10/18/2016.
 */


export class JoinTreeNode {

	constructor(
		public queryRelation: QueryRelation,
		public childNodes: JoinTreeNode[],
		public parentNode: JoinTreeNode
	) {
	}

	addChildNode(
		joinTreeNode: JoinTreeNode
	): void {
		let childFromClausePositionArray = joinTreeNode.queryRelation.fromClausePosition;
		let childPosition                = childFromClausePositionArray[childFromClausePositionArray.length - 1];
		this.childNodes[childPosition]   = joinTreeNode;
	}

	getEntityRelationChildNode(
		dbRelation: DbRelation
	): JoinTreeNode {
		return this.getEntityRelationChildNodeByIndexes(
			dbRelation.property.entity.applicationVersion._localId,
			dbRelation.property.entity.index,
			dbRelation.index
		);
	}

	getEntityRelationChildNodeByIndexes(
		applicationIndex: Application_Index,
		entityIndex: DbEntity_TableIndex,
		relationIndex: DbRelation_Index
	): JoinTreeNode {
		let matchingNodes = this.childNodes.filter((childNode) => {
			return (<QueryEntityRelation>childNode.queryRelation).relationIndex === relationIndex;
		});
		switch (matchingNodes.length) {
			case 0:
				break;
			case 1:
				return matchingNodes[0];
			default:
				throw new Error(`More than one child node matched relation property index '${relationIndex}'`)
		}
		// No node matched, this must be reference to a sub-entity in SELECT clause (in a Entity
		// query)
		let childPosition = this.queryRelation.fromClausePosition.slice();
		childPosition.push(this.childNodes.length);
		let rootEntityPrefix;
		if (this.parentNode) {
			rootEntityPrefix = this.parentNode.queryRelation.rootEntityPrefix;
		} else {
			rootEntityPrefix = this.queryRelation.rootEntityPrefix;
		}
		let queryEntityRelation: QueryEntityRelation = {
			currentChildIndex: 0,
			fromClausePosition: childPosition,
			entityIndex: entityIndex,
			joinType: JoinType.LEFT_JOIN,
			relationType: QueryRelationType.ENTITY_APPLICATION_RELATION,
			rootEntityPrefix: rootEntityPrefix,
			relationIndex: relationIndex,
			applicationIndex: applicationIndex
		};
		let childTreeNode                          = new JoinTreeNode(queryEntityRelation, [], this);
		this.addChildNode(childTreeNode);

		return childTreeNode;
	}
}
