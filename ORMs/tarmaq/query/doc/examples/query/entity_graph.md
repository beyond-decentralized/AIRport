# TARMAQ Entity Graph Query Examples
<!-- TOC -->

- [TARMAQ Entity Graph Query Examples](#TARMAQ-entity-graph-query-examples)
    - [Find all Tasks](#find-all-tasks)
    - [Find tasks with a sub-query function](#find-tasks-with-a-sub-query-function)
    - [Search for a goal](#search-for-a-goal)
    - [Find Goal with Tasks ordered](#find-goal-with-tasks-ordered)

<!-- /TOC -->
## [Find all Tasks]

```ts
import { Injected } from '@airport/direction-indicator'
import { Task } from '../ddl/ddl'
import { BaseTaskDao } from '../generated/baseDaos'
import { Q } from '../generated/qApplication'
import { QTask } from '../generated/qInterfaces'

@Injected()
class TaskDao extends BaseTaskDao {

	async findAll(): Promise<Task> {
		let t: QTask
		return await this._find({
			SELECT: {},
			FROM: [
				t = Q.Task
			]
		});
	}

}
```

## [Find tasks with a sub-query function]

```ts
import { Injected } from '@airport/direction-indicator'
import { Task } from '../ddl/ddl'
import { BaseTaskDao } from '../generated/baseDaos'
import { Q } from '../generated/qApplication'
import { QTask } from '../generated/qInterfaces'

@Injected()
class TaskDao extends BaseTaskDao {

	async findTasksLikeWithSubQuery(
		likeValue: string
	): Promise<Task[]> {
		let t: QTask
		let t2: QTask
		return await this._find({
			SELECT: {},
			FROM: [
				t = Q.Task
				],
			WHERE: AND(
				ucase(t.name).LIKE(`%${likeValue}%`),
				t.taskId.equals(field({
					FROM: [
						t2 = Q.Task
					],
					SELECT:
						t2.taskId,
					WHERE: 
						t2.taskId.equals(t.taskId)
				}))
			)
		});
	}
}
```

## [Search for a goal]

```ts
import { Injected } from '@airport/direction-indicator'
import { Goal } from '../ddl/ddl'
import { BaseGoalDao } from '../generated/baseDaos'
import { Q } from '../generated/qApplication'
import { QGoal } from '../generated/qInterfaces'

@Injected()
class GoalDao extends BaseGoalDao {

	findAGoal(
		goalId: string
	): Observable<Goal> {
		let g: QGoal
		return this._searchOne({
			SELECT: {},
			FROM: [
				g = Q.Goal
			],
			WHERE:
				g.equals(id)
		});
	}
}
```

## [Find Goal with Tasks ordered]

```ts
import { Injected } from '@airport/direction-indicator'
import { Y } from '@airport/tarmaq-query';
import { Goal } from '../ddl/ddl'
import { BaseGoalDao } from '../generated/baseDaos'
import { Q } from '../generated/qApplication'
import { QGoal, QTask } from '../generated/qInterfaces'

@Injected()
class GoalDao extends BaseGoalDao {
	async findGoalWithOrderedTasks(
		goalId: string
	): Promise<Goal> {
		let g: QGoal,
			t: QTask
		return await this._find({
			SELECT: {
				'*': Y,
				tasks: {}
			},
			FROM: [
				g = Q.Goal,
				t = g.tasks.LEFT_JOIN()
			],
			WHERE: g.goalId.equals(goalId),
			ORDER_BY: [
				g.goalId.ASC(),
				g.dueDate.DESC(),
				t.taskId.ASC()
			]
		})
	};
}
```