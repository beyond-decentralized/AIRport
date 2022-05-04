# TIQL Documentation

TIQL was abstracted away from Tarmaq as an attempt to share ideas with
the community.  Tarmaq is tightly coupled with DoRM while TIQL focuses
on just the query API.

## Query constructs

TIQL is an ORM with SQL compliant Queries.

It focuses on retrieving the data in a GraphQL like manner.  For the
bulk of the queries TIQL provides an entity based graph retrieval
mechanism.

For the cases where fully interlinked object graphs are not required,
it provides a way to retrieve a simple JSON tree (with possible
duplicates).

It also provides a way to create a JSON tree that does not map to
entities directly.

Finally, you can still get a flat table like (traditional SQL) result
set.

## SQL compliance

TIQL strives for 100% SQL compliance, mostly due to the fact that it is
meant to be coupled with DoRM and requires all mutations to go
through a processing interface (itself).

## Structure

TIQL is a combination of generated and provided code.

Generated code is automatically created from entity definitions.
Generated code consists of:

- Query Interfaces
- Query Entity Objects

Entity Query objects are themselves back by fields, which in turn
provide access to DB operators (equals, not null, etc.)

Provided code consists of:

- Central access point
- Database facade
- Entity centric Database facade
- SQL Functions
