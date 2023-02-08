# TARMAQ Field Query Examples
<!-- TOC -->

- [TARMAQ Field Query Examples](#TARMAQ-field-query-examples)
    - [Stand-Alone Examples](#stand-alone-examples)
        - [Count all Tasks](#count-all-tasks)
    - [Sub-Query Examples](#sub-query-examples)
        - [sub-query in WHERE clause](#sub-query-in-where-clause)
        - [sub-query in SET clause](#sub-query-in-set-clause)

<!-- /TOC -->
## [Stand-Alone Examples]

### [Count all Tasks]
```ts
import { Inject, Injected } from '@airport/direction-indicator'
import { AirportDatabase } from '@airport/tower'
import { BaseTaskDao } from '../generated/baseDaos'
import { Q } from '../generated/qApplication'
import { QTask } from '../generated/qInterfaces'

@Injected()
class TaskDao extends BaseTaskDao {

	@Inject()
	airDb: AirportDatabase
	
	async getTaskCount() {
		let t: QTask
		return await this.airDb.findOne.field({
  			FROM: [
				t = Q.Task
				],
  			SELECT: count(t.taskId)
		});
	}
}
```

## [Sub-Query Examples]

### [sub-query in WHERE clause]

```ts

import { Injected } from '@airport/direction-indicator'
import { AND, field } from '@airport/tarmaq-query'
import { BaseTaskDao } from '../generated/baseDaos'
import { Q } from '../generated/qApplication'
import { QTask } from '../generated/qInterfaces'

@Injected()
class TaskDao extends BaseTaskDao {
	
	async setTaskName(
		newName: string
		taskNameLike: string
	): Promise<void> {
		let t: QTask,
			t2: QTask
		return await this.db.updateWhere({
  			UPDATE: t = Q.Task,
			SET: {
				name: newName
			},
			WHERE: AND(
				ucase(t.name).LIKE(`%${taskNameLike}%`),
				// TODO: come up with a realistic example
   				t.taskId.equals(field({
      				FROM: [
						t2 = Q.Task
					],
      				SELECT: t2.taskId,
      				WHERE: t2.taskId.equals(t.taskId)
    			}))
  			)
		});
	}
}
```

### [sub-query in SET clause]
```ts
import { Injected } from '@airport/direction-indicator'
import { field } from '@airport/tarmaq-query'
import { BaseTaskDao } from '../generated/baseDaos'
import { Q } from '../generated/qApplication'
import { QTask } from '../generated/qInterfaces'

@Injected()
class TaskDao extends BaseTaskDao {
	
	async updateTaskName(
		anotherTaskId: string,
		taskToUpdateId: string
	): {
		let t: QTask
			t2: QTask
		return await this.db.updateWhere({
			UPDATE: t = Q.Task,
			SET: {
				name: field({
      				FROM: [
						t2 = Q.Task
					],
      				SELECT: t2.name,
      				WHERE: t2.taskId.equals(anotherTaskId)
    			})
			},
			WHERE: task.id.equals(taskToUpdateId)
		});
	}
}
```