# TIQL Queries
<!-- TOC -->

- [TIQL Queries](#tiql-queries)
    - [Read Queries](#read-queries)
    - [Mutation Queries](#mutation-queries)
    - [Query Lifecycle](#query-lifecycle)
    - [Query types](#query-types)
    - [Functions](#functions)

<!-- /TOC -->
Working with TIQL mostly details with defining queries.  This includes
both read and mutation (Create/Update/Delete) queries.

## Read Queries

Read queries are either entity or non-entity based.

Entity queries are defined via the Entity Query Objects.

Non-Entity queries are defined via the Database Facade, which itself is
accessed via the Central Access Point.

## Mutation Queries

All mutation operations are performed on the entity objects defined
by the TIQL ORM.  Hence, mutation queries are always defined via the
Entity Query Objects.

## Query Lifecycle

All TIQL Queries are transport friendly and have serialization build
into their [lifecycle](lifecycle.md).  Every query is first made
serialization friendly and only then executed.  This allows for
remote query execution and makes TIQL useful for thin client scenarios.

## Query types

TIQL queries come in 2 types [Entity and Non-Entity](query types/README.md), which are further
subdivided into more specialized sub-types.

## Functions

TIQL strives for a full SQL compliance and supports many SQL [functions](functions.md).