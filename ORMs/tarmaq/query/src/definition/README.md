# TIQL Specification

The interfaces provided here are meant as an idea sharing mechanism
more than anything else.

## core

These are core (non query specific interfaces)

### entity

These are interfaces specific to the ORM entities and core relations
between entities.

### field

These are interfaces for the fields that comprise most of entity
functionality.  They provide a way to access the operators and to join
the entities.

### metadata

These are interfaces for the entity decorators (JPA-like annotations)
as well as transactional and other decorators.

### operation

These are interfaces for the operations that entity fields provide
access to (equals, not null, etc.)

### repository

These are interfaces for the general and entity specific database
facades.  All all CRUD queries are defined via these interfaces.

## query

These are query specific interfaces

### api

These are actual query API interfaces (query operations)

### facade

These are the query facade objects (representing query state)

### MappedEntityArray.ts

This is an interface for the augmented Array used in Entity Graph
Queries.  It adds map functionality to all Entity Graph results.