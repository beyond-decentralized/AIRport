import {
	Column,
	MappedSuperclass
} from '@airport/air-control'

export type Stageable_Draft = boolean

@MappedSuperclass()
export abstract class Stageable {

	// TODO: figure out if this is needed on per Record level
	// or on per Repository level or not needed at all
	// @Column({name: 'IS_DRAFT', nullable: false})
	// draft: Stageable_Draft

}
