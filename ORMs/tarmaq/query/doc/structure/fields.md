# Field constructs

## Purpose

Field constructs are mostly used to create WHERE clauses.  Main purpose
of fields is to define SQL operators.

Fields are also used in SELECT clause of non-Entity queries.

ASC() & DESC() methods of Fields are used in ORDER BY clause

Fields, along w/ relations are the main building blocks of Query Objects.

## OrderableField

All fields can be used in the ORDER BY clause.

## OperableField

In addition to that all fields can be used in operations in WHERE and HAVING clauses.

## Real fields

Supported real field implementations are:

- BooleanField
- DateField
- JSON fields (typed as interfaces, with the @Json() decorator)
- NumberField
- StringField

String field can be operated on with the LIKE operator.
