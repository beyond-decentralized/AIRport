import {
	Column,
	Entity,
	Id,
	JoinColumn,
	JoinColumns,
	ManyToOne,
	Table
}              from '@airport/air-control'
import {TestD} from './TestD'
import {TestE} from './TestE'

// TODO: add support for TS interfaces on non-id based relations
@Entity()
@Table({name: 'TEST_F'})
export class TestF {

	@Id()
	fOne: number

	@Id()
	@ManyToOne()
	@JoinColumns([
		{name: 'D_ONE'},
		{name: 'D_TWO'}
	])
	d: TestD

	@Id()
	@ManyToOne()
	@JoinColumn({name: 'E_ONE'})
	e: TestE
}