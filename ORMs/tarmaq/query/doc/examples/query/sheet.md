# TARMAQ Sheet Query Example

```ts
import { Inject, Injected } from '@airport/direction-indicator'
import { AirportDatabase } from '@airport/tower'
import { BaseTaskDao, Q, QTask } from '../generated/generated'

@Injected()
class TaskDao extends BaseTaskDao {

	@Inject()
	airDb: AirportDatabase
	
	async findFlatResult(
        taskNameLike: string,
        maxNumResults: number,
        resultSetOffset: number
    ) {
        let t: QTask
        return await this.airDb.find.sheet({
            from: [
                t = Q.Task
            ],
            select: [
                t.name,
                t.dueDate
            ],
            where: t.name.like(`%${taskNameLike}%`),
            limit: maxNumResults,
            offset: resultSetOffset
        })
    }
}
```