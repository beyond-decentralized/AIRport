import {
	Entity,
	Id,
	JoinColumn,
	ManyToOne,
	Table
}                              from '@airport/air-control'
import {SchemaColumn}          from './SchemaColumn'
import {SchemaRelation}        from './SchemaRelation'
import {VersionedSchemaObject} from './VersionedSchemaObject'

@Entity()
@Table({
	name: 'SCHEMA_RELATION_COLUMNS'
})
export class SchemaRelationColumn
	extends VersionedSchemaObject {

	@Id()
	@ManyToOne()
	@JoinColumn({name: 'MANY_COLUMN_ID', referencedColumnName: 'ID'})
	manyColumn: SchemaColumn

	@Id()
	@ManyToOne()
	@JoinColumn({name: 'ONE_COLUMN_ID', referencedColumnName: 'ID'})
	oneColumn: SchemaColumn

	@Id()
	@ManyToOne()
	@JoinColumn({name: 'MANY_RELATION_ID', referencedColumnName: 'ID'})
	manyRelation: SchemaRelation

	@Id()
	@ManyToOne()
	@JoinColumn({name: 'ONE_RELATION_ID', referencedColumnName: 'ID'})
	oneRelation: SchemaRelation
}