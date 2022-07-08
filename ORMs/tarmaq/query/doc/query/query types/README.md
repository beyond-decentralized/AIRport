# Query Types

TIQL offers 5 distinct query Types:

<!-- TOC -->

- [Query Types](#query-types)
    - [Entity Queries](#entity-queries)
        - [Entity Tree Query](#entity-tree-query)
        - [Entity Graph Query](#entity-graph-query)
    - [Non-Entity Queries](#non-entity-queries)
        - [Non-Entity Tree Query](#non-entity-tree-query)
        - [Field Query](#field-query)
        - [Sheet Query](#sheet-query)

<!-- /TOC -->

## Entity Queries

Entity Query always returns entity objects back.  For that reason it
can have a GraphQL-like select clause where the fields are already
defined.  The select clause is represented as a JSON object.

### Entity Tree Query

The basic type of an Entity Query is the [Entity Tree Query](entity tree query.md).

Given this [schema](../../examples/query/schema.md) you can search find all
records in goal via:

[Find all Goals (as tree)](../../examples/query/entity tree.md#find-all-goals-as-tree)

or if you need only goalId, description and associated tasks (tasks not
returned in above example since it's a one-to-many relationship):

[Find some fields from all Goals with Tasks (as tree)](../../examples/query/entity tree.md#find-some-fields-from-all-goals-with-tasks-as-tree)

### Entity Graph Query

Quite often you what you really need is a fully interlinked object
graph. This is what [Entity Graph Query](entity graph query.md) is for.

## Non-Entity Queries

### Non-Entity Tree Query

Sometimes you need to build custom object trees that don't map to the
underlying data model.  [Non-Entity Tree Query](non-entity tree query.md) is used for that:

[Find one Tree with standard join and ORDER BY](../../examples/query/non-entity tree.md#find-one-tree-with-standard-join-and-order-by)

### Field Query

Use a [Field Query](field query.md) when you just need one column back:

[Count all Tasks](../../examples/query/non-entity field.md#count-all-tasks)

Field queries are most useful for defining sub-queries.  Field queries
differ from tree queries with their select statement with is always a
Field reference:

[QTask Update Where](../../examples/query/non-entity field.md#qtask-update-where)

### Sheet Query

Sometimes you just need a traditional flat result table.  This can be
accomplished with a [Sheet Query](sheet query.md).  Again sheet queries differ from tree
and field queries in their select clause, which is always an array of
field references:

[Entity join with ORDER BY](../../examples/query/sheet.md#entity-join-with-order-by)
