# Raw Queries
<!-- TOC -->

- [Raw Queries](#raw-queries)
    - [Summary](#summary)
    - [Query Types](#query-types)
    - [Entity Queries](#entity-queries)
    - [Non-Entity Queries](#non-entity-queries)

<!-- /TOC -->
## Summary

Raw queries are defined by the userAccounts. Every query starts as an update
query. All Raw queries are accessed via either the query objects or via
the central db accessor.

## Query Types

There are two classes of queries, Entity and Non-Entity

## Entity Queries

Queries can belong to a particular entity.  This means that either the
create/update/delete is associated with that entity or that the query
root entity is that entity.

There are two types of Entity queries:

[Entity Graph Query](./query types/entity graph query.md)

[Entity Tree Query](./query types/entity tree query.md)

## Non-Entity Queries

Queries that don't belong to a particular entity are Non-Entity queries.  These
are always read operations.

There are Tree types of Non-Entity queries:

Non-Entity Tree Query

Non-Entity Field Query

Sheet Query