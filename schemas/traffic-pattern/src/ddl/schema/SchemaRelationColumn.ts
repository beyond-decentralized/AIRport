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
	@JoinColumn({name: 'MANY_SCHEMA_COLUMN_ID', referencedColumnName: 'ID', nullable: false})
	manyColumn: SchemaColumn

	@Id()
	@ManyToOne()
	@JoinColumn({name: 'ONE_SCHEMA_COLUMN_ID', referencedColumnName: 'ID', nullable: false})
	oneColumn: SchemaColumn

	@Id()
	@ManyToOne()
	@JoinColumn({name: 'MANY_SCHEMA_RELATION_ID', referencedColumnName: 'ID', nullable: false})
	manyRelation: SchemaRelation

	@Id()
	@ManyToOne()
	@JoinColumn({name: 'ONE_SCHEMA_RELATION_ID', referencedColumnName: 'ID', nullable: false})
	oneRelation: SchemaRelation
}