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

### sub-query in where clause

```ts

import { Injected } from '@airport/direction-indicator'
import { field } from '@airport/tarmaq-query'
import { BaseTaskDao, Q, QTask } from '../generated/generated'

@Injected()
class TaskDao extends BaseTaskDao {
	
	async getTaskCount(
		newName: string
		taskNameLike: string
	) {
		let t: QTask,
			t2: QTask
		return await this.db.updateWhere({
  			update: t = QTask.from(db),
			set: {
				name: newName
			},
			where: and(
				ucase(t.name).like(`%${taskNameLike}%`),
   				t.taskId.equals(field({
      				from: [
						t2 = QTask.from(db)
					],
      				select: t2.taskId,
      				where: t2.taskId.equals(t.taskId)
    			}))
  			)
		});
	}
}
```

### sub-query in set clause
```ts
import { Injected } from '@airport/direction-indicator'
import { field } from '@airport/tarmaq-query'
import { BaseTaskDao, Q, QTask } from '../generated/generated'

@Injected()
class TaskDao extends BaseTaskDao {
	
	async getTaskCount(
		taskWithNameId: string,
		taskToUpdateId: string
	) {
		let t: QTask
			t2: QTask
		return await QDatabase.db(this.dbFacade.name).updateWhere((
			db: QDatabase
		) => ({
			update: t = Q.Task,
			set: {
				name: field({
      				from: [
						t2 = Q.Task
					],
      				select: t2.name,
      				where: t2.taskId.equals(taskWithNameId)
    			})
			},
			where: task.id.equals(taskToUpdateId)
		}));
	}
}
```