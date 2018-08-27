import {
	Column,
	DbNumber,
	Entity,
	ForeignKey,
	Id,
	JoinColumn,
	JoinColumns,
	Json,
	ManyToOne,
	ManyToOneElements,
	OneToMany,
	OneToManyElements,
	Table
} from '@airport/air-control'
import {
	CascadeType,
	RelationIndex,
} from '@airport/ground-control'
import {EntityRelationType}    from "@airport/ground-control";
import {ISchemaEntity}         from "../../generated/schema/qschemaentity";
import {ISchemaProperty}       from "../../generated/schema/qschemaproperty";
import {ISchemaRelation}       from "../../generated/schema/qschemarelation";
import {ISchemaRelationColumn} from "../../generated/schema/qschemarelationcolumn";

@Entity()
@Table({
	name: "SCHEMA_RELATIONS"
})
export class SchemaRelation
	implements ISchemaRelation {

	@Id()
	index: RelationIndex;

	@Id()
	@ManyToOne()
	@JoinColumn({name: "PROPERTY_ID", referencedColumnName: "ID"})
	property: ISchemaProperty;

	@Json()
	@Column({name: "FOREIGN_KEY"})
	foreignKey: ForeignKey;

	@Json()
	@Column({name: "MANY_TO_ONE_ELEMENTS"})
	manyToOneElems: ManyToOneElements;

	@Json()
	@Column({name: "ONE_TO_MANY_ELEMENTS"})
	oneToManyElems: OneToManyElements;

	@DbNumber()
	@Column({name: "RELATION_TYPE"})
	relationType: EntityRelationType;

	// @Column({name: "IS_REPOSITORY_JOIN"})
	// isRepositoryJoin: boolean;

	@Column({name: "IS_ID"})
	isId: boolean;

	// @Column({name: "ADD_TO_JOIN_FUNCTION"})
	// addToJoinFunction: string;
	//
	// @Column({name: "JOIN_FUNCTION_WITH_OPERATOR"})
	// joinFunctionWithOperator: number;

	@ManyToOne()
	@JoinColumns([
		{name: "RELATION_SCHEMA_VERSION_ID", referencedColumnName: "SCHEMA_VERSION_ID"},
		{name: "RELATION_TABLE_INDEX", referencedColumnName: "INDEX"}
	])
	relationEntity: ISchemaEntity;

	@OneToMany({cascade: CascadeType.ALL, mappedBy: "manyRelation"})
	manyRelationColumns: ISchemaRelationColumn[];

	@OneToMany({cascade: CascadeType.ALL, mappedBy: "oneRelation"})
	oneRelationColumns: ISchemaRelationColumn[];

}