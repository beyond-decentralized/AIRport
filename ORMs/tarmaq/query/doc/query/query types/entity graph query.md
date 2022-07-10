# Entity Graph Query
<!-- TOC -->

- [Entity Graph Query](#entity-graph-query)
    - [Map interface](#map-interface)
        - [Brief](#brief)
    - [Usage](#usage)
    - [Reason](#reason)

<!-- /TOC -->
Entity Graph Query is an entity based query API where the select clause
is specified as a JSON object tree.

Entity Graph Query returns fully interlinked graphs of objects. The
returned graph will not contain duplicates since all objects are
referenced directly.

## Usage

Here are some usage [examples](../../examples/query/entity graph.md).

## Reason

Graph Queries are useful if you need an object graph.  This is the API
that is expected to be used in 80% of all cases.