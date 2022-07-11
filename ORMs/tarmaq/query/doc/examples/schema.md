# Example Application

This the example Application has two entities:

Task:

```ts
import { AirEntity } from '@airport/holding-pattern'
import { Column, Entity } from '@airport/tarmaq-entity'

@Entity()
export class Task extends AirEntity {
	// Everything Id related is taken care of by AirEntity

	@Column({ name: 'IS_COMPLETE' })
	isComplete: boolean;
	name: string;
	@Column({ name: 'DUE_DATE' })
	dueDate: Date;
	
	@ManyToOne()
	goal: GoalApi;
}
```

and Goal:

```ts
import { AirEntity } from '@airport/holding-pattern'
import { Column, Entity } from '@airport/tarmaq-entity'

@Entity()
export class Goal extends AirEntity {

	@Column({ name: 'IS_ACCOMPLISHED' })
	isAccomplished: boolean;
	description: string;
	
	@OneToMany({ mappedBy: 'goal' })
	tasks?: Task[];
}
```