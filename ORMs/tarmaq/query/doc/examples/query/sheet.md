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
    ): Promise<any[][]> {
        let t: QTask
        return await this.airDb.find.sheet({
            FROM: [
                t = Q.Task
            ],
            SELECT: [
                t.name,
                t.dueDate
            ],
            WHERE: t.name.LIKE(`%${taskNameLike}%`),
            LIMIT: maxNumResults,
            OFFSET: resultSetOffset
        })
    }
}
```