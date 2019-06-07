import {
	Entity,
	GeneratedValue,
	Id,
	JoinColumn,
	ManyToOne,
	Table
}                              from '@airport/air-control'
import {SchemaColumn}          from './SchemaColumn'
import {SchemaRelation}        from './SchemaRelation'
import {VersionedSchemaObject} from './VersionedSchemaObject'

export type SchemaRelationColumnId = number;

@Entity()
@Table({
	name: 'SCHEMA_RELATION_COLUMNS'
})
export class SchemaRelationColumn
	extends VersionedSchemaObject {

	@Id()
	@GeneratedValue()
	id: SchemaRelationColumnId

	@ManyToOne()
	@JoinColumn({
		name: 'MANY_SCHEMA_COLUMN_ID',
		referencedColumnName: 'ID',
		nullable: false
	})
	manyColumn: SchemaColumn

	@ManyToOne()
	@JoinColumn({name: 'ONE_SCHEMA_COLUMN_ID', referencedColumnName: 'ID', nullable: false})
	oneColumn: SchemaColumn

	@ManyToOne()
	@JoinColumn({name: 'MANY_SCHEMA_RELATION_ID', referencedColumnName: 'ID'})
	manyRelation: SchemaRelation

	@ManyToOne()
	@JoinColumn({name: 'ONE_SCHEMA_RELATION_ID', referencedColumnName: 'ID'})
	oneRelation: SchemaRelation

	@ManyToOne()
	@JoinColumn({name: 'PARENT_RELATION_ID', referencedColumnName: 'ID'})
	parentRelation: SchemaRelation

}
