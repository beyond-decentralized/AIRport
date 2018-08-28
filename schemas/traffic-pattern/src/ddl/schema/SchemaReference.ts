import {
	Column,
	Entity,
	Id,
	JoinColumn,
	ManyToOne,
	Table
} from '@airport/air-control'
import {SchemaReferenceIndex}  from '@airport/ground-control'
import {SchemaVersion}         from './SchemaVersion'
import {VersionedSchemaObject} from './VersionedSchemaObject'

@Entity()
@Table({
	name: 'SCHEMA_REFERENCES'
})
export class SchemaReference
	extends VersionedSchemaObject {

	@Id()
	@ManyToOne()
	@JoinColumn({name: 'OWN_SCHEMA_VERSION_ID', referencedColumnName: 'ID', nullable: false})
	ownSchemaVersion: SchemaVersion

	@Id()
	@ManyToOne()
	@JoinColumn({name: 'REFERENCED_SCHEMA_VERSION_ID', referencedColumnName: 'ID', nullable: false})
	referencedSchemaVersion: SchemaVersion

	@Column({name: 'INDEX', nullable: false})
	index: SchemaReferenceIndex

}