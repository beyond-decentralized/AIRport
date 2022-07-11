# Entity Graph Query
<!-- TOC -->

- [Entity Graph Query](#entity-graph-query)
    - [Usage](#usage)
    - [Reason](#reason)

<!-- /TOC -->
Entity Graph Query is an entity based query API where the select clause
is specified as a JSON object tree.

Entity Graph Query returns fully interlinked graphs of objects. So, the
returned object graph will not contain duplicates.

## Usage

Here are some usage [examples](../../examples/query/entity_graph.md).

## Reason

Graph Queries are useful if you need an object graph.  This is the API
that is expected to be used in 95% of all cases.