import {
	Column,
	DbNumber,
	DbString,
	Entity,
	GeneratedValue,
	Id,
	JoinColumn,
	ManyToOne,
	OneToMany,
	SequenceGenerator,
	Table
}                              from '@airport/air-control'
import {
	SchemaIndex,
	SchemaName,
	SchemaScope,
	SchemaStatus
} from '@airport/ground-control'
import {Domain}                from '@airport/territory'
import {SchemaVersion}         from './SchemaVersion'
import {VersionedSchemaObject} from './VersionedSchemaObject'

@Entity()
@Table({
	name: 'SCHEMAS'
})
export class Schema
	extends VersionedSchemaObject {

	@Id()
	@GeneratedValue()
	@SequenceGenerator({allocationSize: 1})
	@DbNumber()
	index: SchemaIndex

	@ManyToOne()
	@JoinColumn({name: 'DOMAIN_ID', referencedColumnName: 'ID', nullable: false})
	domain: Domain

	@Column({name: 'SCOPE', nullable: false})
	@DbString()
	scope: SchemaScope

	@Column({name: 'SCHEMA_NAME', nullable: false})
	@DbString()
	name: SchemaName

	@Column({name: 'STATUS', nullable: false})
	@DbNumber()
	status: SchemaStatus

	@OneToMany({mappedBy: 'schema'})
	versions: SchemaVersion[]

	@ManyToOne()
	@JoinColumn({name: 'CURRENT_VERSION_ID', referencedColumnName: 'ID', nullable: false})
	currentVersion: SchemaVersion

}