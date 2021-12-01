import {
	JoinColumn,
	ManyToOne,
	MappedSuperclass
}                      from '@airport/air-control'
import {ApplicationVersion} from './ApplicationVersion'

@MappedSuperclass()
export class VersionedApplicationObject {

	@ManyToOne()
	@JoinColumn({name: 'DEPRECATED_SINCE_APPLICATION_VERSION_ID', referencedColumnName: 'ID'})
	deprecatedSinceVersion?: ApplicationVersion

	@ManyToOne()
	@JoinColumn({name: 'REMOVED_IN_APPLICATION_VERSION_ID', referencedColumnName: 'ID'})
	removedInVersion?: ApplicationVersion

	@ManyToOne()
	@JoinColumn({name: 'SINCE_APPLICATION_VERSION_ID', referencedColumnName: 'ID', nullable: false})
	sinceVersion?: ApplicationVersion

}
