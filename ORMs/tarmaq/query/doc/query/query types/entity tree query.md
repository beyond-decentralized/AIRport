# Entity Tree Query
<!-- TOC -->

- [Entity Tree Query](#entity-tree-query)
    - [Usage](#usage)
    - [Reason](#reason)

<!-- /TOC -->
Entity Tree Query is an entity based query API where the select clause
is specified as a JSON object tree.

Entity Tree Query returns a non-interlinked tree of objects.  Hence, the
results may contain duplicate object entries.

## Usage

Here are some usage [examples](../../examples/query/entity tree.md).

## Reason

Tree Queries are useful if you don't need a fully interlinked object
graph.  For example, if you are going to serialize the query results.