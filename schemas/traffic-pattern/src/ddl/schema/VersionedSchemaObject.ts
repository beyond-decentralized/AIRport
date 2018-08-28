import {
	JoinColumn,
	ManyToOne,
	MappedSuperclass
}                      from '@airport/air-control'
import {SchemaVersion} from './SchemaVersion'

@MappedSuperclass()
export class VersionedSchemaObject {

	@ManyToOne()
	@JoinColumn({name: 'DEPRECATED_SINCE_SCHEMA_VERSION_ID', referencedColumnName: 'ID'})
	deprecatedSinceVersion?: SchemaVersion

	@ManyToOne()
	@JoinColumn({name: 'REMOVED_IN_SCHEMA_VERSION_ID', referencedColumnName: 'ID'})
	removedInVersion?: SchemaVersion

	@ManyToOne()
	@JoinColumn({name: 'SINCE_SCHEMA_VERSION_ID', referencedColumnName: 'ID', nullable: false})
	sinceVersion: SchemaVersion

}