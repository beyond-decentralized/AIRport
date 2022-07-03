import {
	JoinColumn,
	ManyToOne,
	MappedSuperclass
} from '@airport/air-traffic-control'
import { ApplicationVersion } from './ApplicationVersion'

@MappedSuperclass()
export class VersionedApplicationObject {

	@ManyToOne()
	@JoinColumn({
		name: 'DEPRECATED_SINCE_APPLICATION_VERSION_LID',
		referencedColumnName: 'APPLICATION_VERSION_LID'
	})
	deprecatedSinceVersion?: ApplicationVersion

	@ManyToOne()
	@JoinColumn({
		name: 'REMOVED_IN_APPLICATION_VERSION_LID',
		referencedColumnName: 'APPLICATION_VERSION_LID'
	})
	removedInVersion?: ApplicationVersion

	@ManyToOne()
	@JoinColumn({
		name: 'SINCE_APPLICATION_VERSION_LID',
		referencedColumnName: 'APPLICATION_VERSION_LID', nullable: false
	})
	sinceVersion?: ApplicationVersion

}
