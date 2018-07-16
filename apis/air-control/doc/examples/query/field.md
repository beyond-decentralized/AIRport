# TIQL Field Query Examples
<!-- TOC -->

- [TIQL Field Query Examples](#tiql-field-query-examples)
    - [Stand-Alone Examples](#stand-alone-examples)
        - [Count all Tasks](#count-all-tasks)
    - [Sub-Query Examples](#sub-query-examples)
        - [QTask Update Where: implied in equals operation](#qtask-update-where-implied-in-equals-operation)
        - [TQ Database embedded in UPDATE WHERE, via field method](#tq-database-embedded-in-update-where-via-field-method)

<!-- /TOC -->
## Stand-Alone Examples

### Count all Tasks
```ts
await TQ.findOne().field((t: QTask) => ({
  from: [t = QTask.from()],
  select: count(t.taskId)
}));
```

## Sub-Query Examples

### QTask Update Where: implied in equals operation

```ts
await QTask.updateWhere((t: QTask) => ({
  update: t = QTask.from(db),
  set: {
    name: 'Cascaded Insert w/ Reference'
  },
  where: and(
    ucase(t.name).like('% REF%'),
    t.taskId.equals((t2: QTask) => ({
      from: [t2 = QTask.from(db)],
      select: t2.taskId,
      where: t2.taskId.equals(t.taskId)
    }))
  )
});
```

### TQ Database embedded in UPDATE WHERE, via field method
```ts
await QDatabase.db(this.dbFacade.name).updateWhere((
			db: QDatabase
		) => ({
			update: db = QDatabase.from(this.dbFacade.name),
			set: {
				lastSyncedTransaction: field((
					cg: QTransaction
				) => ({
					from: [cg = QTransaction.from(this.dbFacade.name)],
					select: cg.id,
					where: and(
						cg.createDateTime.equals((
							cg2: QTransaction
						) => ({
							from: [cg2 = QTransaction.from(this.dbFacade.name)],
							select: max(cg2.createDateTime),
						})),
						cg.transactionIndexInMillisecond.equals((
							cg3: QTransaction
						) => ({
							from: [cg3 = QTransaction.from(this.dbFacade.name)],
							select: max(cg3.transactionIndexInMillisecond),
							where: cg3.createDateTime.equals((
								cg4: QTransaction
							) => ({
								from: [cg4 = QTransaction.from(this.dbFacade.name)],
								select: max(cg4.createDateTime),
							}))
						}))
					)
				}))
			},
			where: db.id.equals(this.dbFacade.dbId)
		}));
```