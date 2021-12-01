import {
	Column,
	DbNumber,
	Entity,
	Id,
	JoinColumn,
	ManyToOne,
	Table
} from '@airport/air-control'
import {ApplicationReferenceIndex}  from '@airport/ground-control'
import {ApplicationVersion}         from './ApplicationVersion'
import {VersionedApplicationObject} from './VersionedApplicationObject'

@Entity()
@Table({
	name: 'SCHEMA_REFERENCES'
})
export class ApplicationReference
	extends VersionedApplicationObject {

	@Id()
	@ManyToOne()
	@JoinColumn({name: 'OWN_SCHEMA_VERSION_ID', referencedColumnName: 'ID', nullable: false})
	ownApplicationVersion: ApplicationVersion

	@Id()
	@ManyToOne()
	@JoinColumn({name: 'REFERENCED_SCHEMA_VERSION_ID', referencedColumnName: 'ID', nullable: false})
	referencedApplicationVersion: ApplicationVersion

	@Column({name: 'SCHEMA_REFERENCE_INDEX', nullable: false})
	@DbNumber()
	index: ApplicationReferenceIndex

}
