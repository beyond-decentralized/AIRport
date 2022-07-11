# TARMAQ Field Query Examples
<!-- TOC -->

- [TARMAQ Field Query Examples](#TARMAQ-field-query-examples)
    - [Stand-Alone Examples](#stand-alone-examples)
        - [Count all Tasks](#count-all-tasks)
    - [Sub-Query Examples](#sub-query-examples)
        - [sub-query in where clause](#sub-query-in-where-clause)
        - [sub-query in set clause](#sub-query-in-set-clause)

<!-- /TOC -->
## Stand-Alone Examples

### Count all Tasks
```ts
import { Inject, Injected } from '@airport/direction-indicator'
import { AirportDatabase } from '@airport/tower'
import { BaseTaskDao, Q, QTask } from '../generated/generated'

@Injected()
class TaskDao extends BaseTaskDao {

	@Inject()
	airDb: AirportDatabase
	
	async getTaskCount() {
		let t: QTask
		return await this.airDb.findOne.field({
  			from: [
				t = Q.Task
				],
  			select: count(t.taskId)
		});
	}
}
```

## Sub-Query Examples

### sub-query in WHERE clause

```ts

import { Injected } from '@airport/direction-indicator'
import { and, field } from '@airport/tarmaq-query'
import { BaseTaskDao, Q, QTask } from '../generated/generated'

@Injected()
class TaskDao extends BaseTaskDao {
	
	async setTaskName(
		newName: string
		taskNameLike: string
	): Promise<void> {
		let t: QTask,
			t2: QTask
		return await this.db.updateWhere({
  			update: t = Q.Task,
			set: {
				name: newName
			},
			where: and(
				ucase(t.name).like(`%${taskNameLike}%`),
				// TODO: come up with a realistic example
   				t.taskId.equals(field({
      				from: [
						t2 = Q.Task
					],
      				select: t2.taskId,
      				where: t2.taskId.equals(t.taskId)
    			}))
  			)
		});
	}
}
```

### sub-query in SET clause
```ts
import { Injected } from '@airport/direction-indicator'
import { field } from '@airport/tarmaq-query'
import { BaseTaskDao, Q, QTask } from '../generated/generated'

@Injected()
class TaskDao extends BaseTaskDao {
	
	async updateTaskName(
		anotherTaskId: string,
		taskToUpdateId: string
	): {
		let t: QTask
			t2: QTask
		return await this.db.updateWhere({
			update: t = Q.Task,
			set: {
				name: field({
      				from: [
						t2 = Q.Task
					],
      				select: t2.name,
      				where: t2.taskId.equals(anotherTaskId)
    			})
			},
			where: task.id.equals(taskToUpdateId)
		});
	}
}
```