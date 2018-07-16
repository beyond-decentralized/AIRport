# TIQL Entity Graph Query Examples
<!-- TOC -->

- [TIQL Entity Graph Query Examples](#tiql-entity-graph-query-examples)
    - [Find all Tasks](#find-all-tasks)
    - [Find tasks with a sub-query function](#find-tasks-with-a-sub-query-function)
    - [Search for all goals](#search-for-all-goals)
    - [Find Goal with Tasks ordered](#find-goal-with-tasks-ordered)

<!-- /TOC -->
## Find all Tasks

```ts
await QTask.find(db).graph(findTasks);
```

## Find tasks with a sub-query function

```ts
	function subQueryWhereClause( t: QTask ) {
		return and(
			ucase(t.name).like('% REF%'),
			t.taskId.equals(( t2: QTask ) => ({
				from: [t2 = QTask.from(db)],
				select: t2.taskId,
				where: t2.taskId.equals(t.taskId)
			}))
		);
	}

await QTask.find().graph(( t: QTask ) => ({
			select: {},
			from: [t = QTask.from(db)],
			where: subQueryWhereClause(t)
		}));
```

## Search for all goals

```ts
QGoal.db().searchOne.graph((
				g: QGoal
			) => ({
				select: {}
			})).subscribe(
				goal => {
					// Do stuff here
				});
```

## Find Goal with Tasks ordered

```ts
await QGoal.findOne().graph(
			(
				g: QGoal,
				t: QTask
			) => ({
				select: {
					'*': null,
					tasks: {}
				},
				from: [
					g = QGoal.from(db),
					t = g.tasks.innerJoin()
				],
				where: g.goalId.equals(goalNTasks2.goalId),
				orderBy: [g.goalId.asc(), g.dueDate.desc(), t.taskId.asc()]
			}));
```