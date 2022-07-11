# Tarmaq Query Documentation

Tarmaq queries are heavily inspired by GraphQL and QueryDSL.
I really liked the fact that GraphQL return object trees.  What
I added the the ability to specify an object tree in the SELECT
clause of a query.  Also, by default, Tarmaq queries return
interlinked object graphs (vs flat object trees).

WHERE clauses are heavily inspired by QueryDSL. Main difference
there is that the FROM clause is specified as an array, with
possible alias assignments.

## Query constructs

Tarmaq queries are SQL compliant.

Tarmaq focuses on retrieving the data in a GraphQL like manner.  For the
bulk of the queries it provides an entity based graph retrieval
mechanism.

For the cases where fully interlinked object graphs are not needed,
it provides a way to retrieve a standard JSON tree (without object
linking).  If the same object shows up in multiple places (in tested
relations) it will be a separate object for each occurence.

It also provides a way to create a JSON tree that does not map to
entities directly.

Finally, you can still get a flat table like (traditional SQL) result
set.

- [Example Schema](./examples/schema.md)
- [Query Types](./query/queries.md)

## SQL compliance

Tarmaq strives for 100% SQL compliance.  This is because it is backed
by a relational database (SqLite for the native app, SqlJs for Web version,
and any other distribution for the server).

## Structure

Tarmaq is a combination of generated and provided code.

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

More:

- [Fields](./structure/fields.md)
- [Functions](./structure/functions.md)
- [Generated Entity Query Objects](./structure/generated%20entity%20query%20objects.md)
- [Operations](./structure/operations.md)