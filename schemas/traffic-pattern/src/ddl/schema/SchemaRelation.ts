import {
	Column,
	DbNumber,
	Entity,
	ForeignKey,
	GeneratedValue,
	Id,
	JoinColumn,
	JoinColumns,
	Json,
	ManyToOne,
	ManyToOneElements,
	OneToMany,
	OneToManyElements,
	Table
}                              from '@airport/air-control'
import {
	CascadeType,
	EntityRelationType,
	RelationId,
	RelationIndex,
} from '@airport/ground-control'
import {SchemaEntity}          from './SchemaEntity'
import {SchemaProperty}        from './SchemaProperty'
import {SchemaRelationColumn}  from './SchemaRelationColumn'
import {VersionedSchemaObject} from './VersionedSchemaObject'

@Entity()
@Table({
	name: 'SCHEMA_RELATIONS'
})
export class SchemaRelation
	extends VersionedSchemaObject {

	@Id()
	id: RelationId

	@Column({name: 'RELATION_INDEX', nullable: false})
	index: RelationIndex

	@ManyToOne()
	@JoinColumn({name: 'SCHEMA_PROPERTY_ID', referencedColumnName: 'ID', nullable: false})
	property: SchemaProperty

	@Json()
	@Column({name: 'FOREIGN_KEY'})
	foreignKey: ForeignKey

	@Json()
	@Column({name: 'MANY_TO_ONE_ELEMENTS'})
	manyToOneElems: ManyToOneElements

	@Json()
	@Column({name: 'ONE_TO_MANY_ELEMENTS'})
	oneToManyElems: OneToManyElements

	@DbNumber()
	@Column({name: 'RELATION_TYPE', nullable: false})
	relationType: EntityRelationType

	// @Column({name: "IS_REPOSITORY_JOIN"})
	// isRepositoryJoin: boolean;

	@Column({name: 'IS_ID', nullable: false})
	isId: boolean

	// @Column({name: "ADD_TO_JOIN_FUNCTION"})
	// addToJoinFunction: string;
	//
	// @Column({name: "JOIN_FUNCTION_WITH_OPERATOR"})
	// joinFunctionWithOperator: number;

	@ManyToOne()
	@JoinColumn({name: 'SCHEMA_TABLE_ID', referencedColumnName: 'ID', nullable: false})
	entity: SchemaEntity

	@ManyToOne()
	@JoinColumn({name: 'RELATION_SCHEMA_TABLE_ID', referencedColumnName: 'ID', nullable: false})
	relationEntity: SchemaEntity

	@OneToMany({cascade: CascadeType.ALL, mappedBy: 'manyRelation'})
	manyRelationColumns: SchemaRelationColumn[]

	@OneToMany({cascade: CascadeType.ALL, mappedBy: 'oneRelation'})
	oneRelationColumns: SchemaRelationColumn[]

}
