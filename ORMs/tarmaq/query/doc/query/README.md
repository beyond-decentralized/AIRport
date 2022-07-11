# TARMAQ Queries

<!-- TOC -->

- [Tarmaq Queries](#tarmaq-queries)
    - [Read Queries](#read-queries)
    - [Mutation Queries](#mutation-queries)
    - [Query Lifecycle](#query-lifecycle)
    - [Query types](#query-types)
    - [Functions](#functions)

<!-- /TOC -->
Tarmaq mostly about defining queries. This includes both read and mutation (Create/Update/Delete)
queries.

## Read Queries

Read queries are either entity or non-entity based.

Entity queries are defined with Entity Query Objects.

Non-Entity queries are defined via the AirportDatabase object, that can be injected into DAOs.

## Mutation Queries

All mutation operations are performed on the entity objects defined by Tarmaq. Hence, mutation queries are always
defined via the Entity Query Objects.

## Query Lifecycle

All Tarmaq Queries are transport friendly and can be serializated. Every query is first serialized and only then
executed. This allows for remote query execution and makes Tarmaq useful for thin client scenarios. This works well with
AIRport application VMs where the queries are defined in the Application VMs but are executed in the AIRport VM.

## Query types

Tarmaq queries come in 2 types [Entity and Non-Entity](query types/README.md), which are further subdivided into more
specialized sub-types.

## Functions

Tarmaq strives for a full SQL compliance and supports many SQL [functions](../structure/functions.md).