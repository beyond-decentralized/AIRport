# TARMAQ Entity Graph Query Examples
<!-- TOC -->

- [TARMAQ Entity Graph Query Examples](#TARMAQ-entity-graph-query-examples)
    - [Find all Tasks](#find-all-tasks)
    - [Find tasks with a sub-query function](#find-tasks-with-a-sub-query-function)
    - [Search for all goals](#search-for-all-goals)
    - [Find Goal with Tasks ordered](#find-goal-with-tasks-ordered)

<!-- /TOC -->
## Find all Tasks

```ts
import { Injected } from '@airport/direction-indicator'
import { Task } from '../ddl/ddl'
import { BaseTaskDao, Q, QTask } from '../generated/generated'

@Injected()
class TaskDao extends BaseTaskDao {

	async findAll(): Promise<Task> {
		let t: QTask
		return await this._find({
			select: {},
			from: [
				t = Q.Task
			]
		});
	}

}
```

## Find tasks with a sub-query function

```ts
import { Injected } from '@airport/direction-indicator'
import { Task } from '../ddl/ddl'
import { BaseTaskDao, Q, QTask } from '../generated/generated'

@Injected()
class TaskDao extends BaseTaskDao {

	async findTasksLikeWithSubQuery(
		likeValue: string
	): Promise<Task[]> {
		let t: QTask
		let t2: QTask
		return await this._find({
			select: {},
			from: [
				t = Q.Task
				],
			where: and(
				ucase(t.name).like(`%${likeValue}%`),
				t.taskId.equals(field({
					from: [
						t2 = Q.Task
					],
					select:
						t2.taskId,
					where: 
						t2.taskId.equals(t.taskId)
				}))
			)
		});
	}
}
```

## Search for a goal

```ts
import { Injected } from '@airport/direction-indicator'
import { Goal } from '../ddl/ddl'
import { BaseGoalDao, Q, QGoal } from '../generated/generated'

@Injected()
class GoalDao extends BaseGoalDao {

	findAGoal(
		goalId: string
	): Observable<Goal> {
		let g: QGoal
		return this._searchOne({
			select: {},
			from: [
				g = Q.Goal
			],
			where:
				g.equals(id)
		});
	}
}
```

## Find Goal with Tasks ordered

```ts
import { Injected } from '@airport/direction-indicator'
import { Y } from '@airport/tarmaq-query';
import { Goal } from '../ddl/ddl'
import { BaseGoalDao, Q, QGoal, QTask } from '../generated/generated'

@Injected()
class GoalDao extends BaseGoalDao {
	async findGoalWithOrderedTasks(
		goalId: string
	): Promise<Goal> {
		let g: QGoal,
			t: QTask
		return await this._find({
			select: {
				'*': Y,
				tasks: {}
			},
			from: [
				g = Q.Goal,
				t = g.tasks.leftJoin()
			],
			where: g.goalId.equals(goalId),
			orderBy: [
				g.goalId.asc(),
				g.dueDate.desc(),
				t.taskId.asc()
			]
		})
	};
}
```