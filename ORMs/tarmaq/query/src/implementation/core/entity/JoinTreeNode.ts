import {
	DbRelation,
	JoinType,
	QueryEntityRelation,
	QueryRelation,
	QueryRelationType,
	DbRelation_Index,
	DbApplication_Index,
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
		applicationIndex: DbApplication_Index,
		tableIndex: DbEntity_TableIndex,
		relationIndex: DbRelation_Index
	): JoinTreeNode {
		let matchingNodes = this.childNodes.filter((childNode) => {
			return (<QueryEntityRelation>childNode.queryRelation).ri === relationIndex;
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
			rootEntityPrefix = this.parentNode.queryRelation.rep;
		} else {
			rootEntityPrefix = this.queryRelation.rep;
		}
		let queryEntityRelation: QueryEntityRelation = {
			currentChildIndex: 0,
			fromClausePosition: childPosition,
			ti: tableIndex,
			jt: JoinType.LEFT_JOIN,
			rt: QueryRelationType.ENTITY_APPLICATION_RELATION,
			rep: rootEntityPrefix,
			ri: relationIndex,
			si: applicationIndex
		};
		let childTreeNode                          = new JoinTreeNode(queryEntityRelation, [], this);
		this.addChildNode(childTreeNode);

		return childTreeNode;
	}
}
