import {
	Column,
	DbBoolean,
	MappedSuperclass
} from '@airport/air-control'

export type Stageable_IsRepositoryDependencyReference = boolean

@MappedSuperclass()
export abstract class Stageable {

	// A record may already be in present if it was originally there
	// as a reference from another repository.  Once the record
	// this flag should be flipped to false
	@Column({name: 'IS_REPOSITORY_DEPENDENCY_REFERENCE', nullable: false})
	@DbBoolean()
	isRepositoryDependencyReference: Stageable_IsRepositoryDependencyReference

}
