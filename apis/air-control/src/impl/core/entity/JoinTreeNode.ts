import {
	DbRelation,
	JoinType,
	JSONEntityRelation,
	JSONRelation,
	JSONRelationType,
	RelationIndex,
	SchemaIndex,
	TableIndex
} from "@airport/ground-control";

/**
 * Created by Papa on 10/18/2016.
 */


export class JoinTreeNode {

	constructor(
		public jsonRelation: JSONRelation,
		public childNodes: JoinTreeNode[],
		public parentNode: JoinTreeNode
	) {
	}

	addChildNode(
		joinTreeNode: JoinTreeNode
	): void {
		let childFromClausePositionArray = joinTreeNode.jsonRelation.fcp;
		let childPosition                = childFromClausePositionArray[childFromClausePositionArray.length - 1];
		this.childNodes[childPosition]   = joinTreeNode;
	}

	getEntityRelationChildNode(
		dbRelation: DbRelation
	): JoinTreeNode {
		return this.getEntityRelationChildNodeByIndexes(
			dbRelation.property.entity.schemaVersion.id,
			dbRelation.property.entity.index,
			dbRelation.index
		);
	}

	getEntityRelationChildNodeByIndexes(
		schemaIndex: SchemaIndex,
		tableIndex: TableIndex,
		relationIndex: RelationIndex
	): JoinTreeNode {
		let matchingNodes = this.childNodes.filter((childNode) => {
			return (<JSONEntityRelation>childNode.jsonRelation).ri === relationIndex;
		});
		switch (matchingNodes.length) {
			case 0:
				break;
			case 1:
				return matchingNodes[0];
			default:
				throw new Error(`More than one child node matched relation property index '${relationIndex}'`)
		}
		// No node matched, this must be reference to a sub-entity in select clause (in a Entity
		// query)
		let childPosition = this.jsonRelation.fcp.slice();
		childPosition.push(this.childNodes.length);
		let rootEntityPrefix;
		if (this.parentNode) {
			rootEntityPrefix = this.parentNode.jsonRelation.rep;
		} else {
			rootEntityPrefix = this.jsonRelation.rep;
		}
		let jsonEntityRelation: JSONEntityRelation = {
			cci: 0,
			fcp: childPosition,
			ti: tableIndex,
			jt: JoinType.LEFT_JOIN,
			rt: JSONRelationType.ENTITY_SCHEMA_RELATION,
			rep: rootEntityPrefix,
			ri: relationIndex,
			si: schemaIndex
		};
		let childTreeNode                          = new JoinTreeNode(jsonEntityRelation, [], this);
		this.addChildNode(childTreeNode);

		return childTreeNode;
	}
}
