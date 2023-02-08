# TARMAQ Entity Tree Query Examples
<!-- TOC -->

- [TARMAQ Entity Tree Query Examples](#TARMAQ-entity-tree-query-examples)
    - [Find all Goals (as flat tree)](#find-all-goals-as-flat-tree)
    - [Find some fields from all Goals with Tasks (as flat tree)](#find-some-fields-from-all-goals-with-tasks-as-flat-tree)

<!-- /TOC -->

## [Find all Goals as flat tree]

```ts
import { Injected } from '@airport/direction-indicator'
import { Goal } from '../ddl/ddl'
import { BaseGoalDao } from '../generated/baseDaos'

@Injected()
class GoalDao extends BaseGoalDao {
    
	async findAllGoals(
		goalId: string
	): Promise<Goal> {
        await this.db.find.tree({
            SELECT: {}
        });
    }
}
```

## [Find some fields from all Goals with Tasks as flat tree]

```ts
import { Injected } from '@airport/direction-indicator'
import { Y } from '@airport/tarmaq-query';
import { Goal } from '../ddl/ddl'
import { BaseGoalDao } from '../generated/baseDaos'

@Injected()
class GoalDao extends BaseGoalDao {
    
	async findGoalInfoWithTasks(
		goalId: string
	): Promise<Goal> {
        await this.db.find.tree({
            SELECT: {
                goalId: Y,
                description: Y,
                tasks: {}
            }
        });
    }
}
```