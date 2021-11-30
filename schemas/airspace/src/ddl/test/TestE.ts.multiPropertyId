import {
	Column,
	Entity,
	Id,
	JoinColumns,
	ManyToOne,
	Table
}              from '@airport/air-control'
import {TestD} from './TestD'

// TODO: add support for TS interfaces on non-id based relations
@Entity()
@Table({name: 'TEST_E'})
export class TestE {

	@Id()
	@Column({name: 'E_ONE'})
	eOne: number

	@Id()
	@ManyToOne()
	@JoinColumns([
		{name: 'D_ONE'},
		{name: 'D_TWO'}
	])
	d: TestD

	@Column({name: 'E_TWO'})
	eThree: number
}