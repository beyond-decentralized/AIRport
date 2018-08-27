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
	RelationIndex,
}                              from '@airport/ground-control'
import {SchemaEntity}          from './SchemaEntity'
import {SchemaProperty}        from './SchemaProperty'
import {SchemaRelationColumn}  from './SchemaRelationColumn'
import {VersionedSchemaObject} from './VersionedSchemaObject'

export type SchemaRelationId = number

@Entity()
@Table({
	name: 'SCHEMA_RELATIONS'
})
export class SchemaRelation
	extends VersionedSchemaObject {

	@Id()
	@GeneratedValue()
	id: SchemaRelationId

	index: RelationIndex

	@ManyToOne()
	@JoinColumn({name: 'PROPERTY_ID', referencedColumnName: 'ID'})
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
	@Column({name: 'RELATION_TYPE'})
	relationType: EntityRelationType

	// @Column({name: "IS_REPOSITORY_JOIN"})
	// isRepositoryJoin: boolean;

	@Column({name: 'IS_ID'})
	isId: boolean

	// @Column({name: "ADD_TO_JOIN_FUNCTION"})
	// addToJoinFunction: string;
	//
	// @Column({name: "JOIN_FUNCTION_WITH_OPERATOR"})
	// joinFunctionWithOperator: number;

	@ManyToOne()
	@JoinColumns([
		{name: 'RELATION_SCHEMA_VERSION_ID', referencedColumnName: 'SCHEMA_VERSION_ID'},
		{name: 'RELATION_TABLE_INDEX', referencedColumnName: 'INDEX'}
	])
	relationEntity: SchemaEntity

	@OneToMany({cascade: CascadeType.ALL, mappedBy: 'manyRelation'})
	manyRelationColumns: SchemaRelationColumn[]

	@OneToMany({cascade: CascadeType.ALL, mappedBy: 'oneRelation'})
	oneRelationColumns: SchemaRelationColumn[]

}