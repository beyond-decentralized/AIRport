# Example Schema

This the example schema used throughout the project:

```ts
@Entity()
export class Task {
	complete: boolean;
	description: string;
	@ManyToOne()
	goal: GoalApi;
	@Id()
	taskId: number;
	name: string;
	@ManyToOne()
	nextTask?: Task;
	@OneToMany({mappedBy: 'nextTask'})
	previousTasks?: Task[];
}

@Entity()
export class Goal {
	accomplished: boolean;
	description: string;
	@Id()
	goalId: number;
	name: string;
	dueDate: Date;
	@OneToMany({mappedBy: 'goal', cascade: CascadeType.ALL})
	tasks?: Task[];
}
```