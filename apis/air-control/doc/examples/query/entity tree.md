# TIQL Entity Tree Query Examples
<!-- TOC -->

- [TIQL Entity Tree Query Examples](#tiql-entity-tree-query-examples)
    - [Find all Goals (as tree)](#find-all-goals-as-tree)
    - [Find some fields from all Goals with Tasks (as tree)](#find-some-fields-from-all-goals-with-tasks-as-tree)

<!-- /TOC -->

## Find all Goals (as tree)

```ts
await QGoal.find().tree({
    select: {}
});
```

## Find some fields from all Goals with Tasks (as tree)

```ts
await QGoal.find().tree({
    select: {
        goalId: null,
        description: null,
        tasks: {}
    }
});
```