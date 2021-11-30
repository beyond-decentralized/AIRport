import {
	Column,
	DbBoolean,
	MappedSuperclass
} from '@airport/air-control'

// export type Stageable_IsRepositoryDependencyReference = boolean

@MappedSuperclass()
export abstract class Stageable {

	// NOTE: isn't needed - repositories are either fully loaded
	// or a partially loaded (have some records that are referenced
	// by other repositories)
	// @Column({name: 'IS_REPOSITORY_DEPENDENCY_REFERENCE', nullable: false})
	// @DbBoolean()
	// draft: Stageable_IsRepositoryDependencyReference

}
