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
}                      from '@airport/air-control'
import {
	SchemaIndex,
	SchemaName
}                      from '@airport/ground-control'
import {Domain}        from '@airport/territory'
import {ISchema}       from '../../generated/schema/qschema'
import {SchemaStatus}  from './SchemaStatus'
import {SchemaVersion} from './SchemaVersion'

export type SchemaScope = 'private' | 'public' | null;

@Entity()
@Table({
	name: 'SCHEMAS'
})
export class Schema
	implements ISchema {

	@Id()
	@GeneratedValue()
	@SequenceGenerator({allocationSize: 1})
	@DbNumber()
	index: SchemaIndex

	@ManyToOne()
	@JoinColumn({name: 'DOMAIN_ID', referencedColumnName: 'ID'})
	domain: Domain

	@Column({name: 'SCOPE'})
	@DbString()
	scope: SchemaScope

	@Column({name: 'SCHEMA_NAME'})
	@DbString()
	name: SchemaName

	@DbNumber()
	status: SchemaStatus

	@OneToMany({mappedBy: 'schema'})
	versions: SchemaVersion[]

	@ManyToOne()
	@JoinColumn({name: 'CURRENT_VERSION_ID', referencedColumnName: 'ID'})
	currentVersion: SchemaVersion

}