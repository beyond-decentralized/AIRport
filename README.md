# airport

Work in progress - actively seeking contributors

Airport is a reference implementation of [Autonomous Interdependent Repositories](https://patents.google.com/patent/US10902016B2).

Provides a net-like relational database of repositories.  A repository is a virtual database with it's own transaction log.
It has globally unique identifier that helps to distinguish it from other repositories in the same relational
database (such as WebSql or SqLite).

![AIR across devices](/presentations/images/AIR-across-devices.jpg)

Each repository is completely autonomous and can be added to a host relational database and/or removed from it,
at any time, without affecting other repositories.  Repositories can have references to each other thus depending
on data that other repository contains, but must be usable without referenced repositories (thus being
both interdependent and autonomous).

Initial airport deployments will have server components to enable communication between mobile devices.
In it's final form airport could be used directly between devices to communicate
changes in the state of repositories shared between their members (based on some form of 
[mobile device-to-device Web Access](https://patents.google.com/patent/WO2019036410A1)).

![Repository sharing](/presentations/images/Figure-02.jpg)

## API

airport uses a combination of existing technologies for it's APIs

* For defining entities it uses JPA like annotations (though without much of the complexity since it assumes some best practices and is sessionless).
* For querying it uses a TypeScript compliant GraphQL like syntax (based on auto-generated query objects)
* It enforces the DAO pattern where all of query and mutation operations must be defined
* For mutations it uses a combination of Firebase Access rules and GraphQL like syntax to defined what can be updated in a given operation

## Device-central database

airport is designed for a single database per device.  Multiple applicaion schemas are installed into that database and allow for
relations across schemas.  This can be done by installing the airport app or completely in-browser by using a wrapper tab
with WebSql database and applications being loaded into an IFrame.   The idea is for multiple applications to collaborate
and re-use data.  The two key points here are:

* User is in control of their data they allow applications to access their data (usually only a part of their data).
* Applications are in control of sharing schemas with other applications - they can allow or deny access to their schemas.

This the applications only interact with the device-local database, making airport fully operational in offline-mode.  The
database is in charge of maintaining the repositories contained in it.  It may occasionally prompt the user to purge
infrequently used repositories (or may do so automatically if not configured), leaving them only in the cloud backup.  The
applications however may request the user to load additional repositories from the cloud, for processing.

## Zero app code deployment

airport aims to provide zero code deployments where a thin shim is provided for the framework and TypeScript interfaces are used to defined
the query+mutation API against the schemas used by the application.  The rest is defined in the schema configuration file, which is
loaded into the device's airport database directly.

## Technical details

### On the stack dependency injection

Since airport instances will be running on mobile devices, it has its own
"on the stack" Dependency Injection (DI for short) framework that allows it
to easily upgrade framework versions of code "on-the-fly", without requiring 
application restarts or interruptions in service.  Thus, dependency injection
is done "on the stack" (in the methods of the framework objects and not
in the constructors of these objects).  The idea is that during an upgrade,
all in progress requests are allowed to complete while all pending requests
are halted (via async functions) at the very start.  Once all requests have
cleared an upgrade takes place (within the libs\di library, just replacing
old references to objects with new ones), then the remaining requests are resumed.
This works well since every operation in airport is "top-level transactional".

### Transactionality

For a number of reasons (primarily WebSql transactional limitations) all
transactions in airport must be sent over to the database in one shot.
That means that an entire object graph is sent it and is processed
according to the rules of a particular operation *(more on this later)*.

### Convention over configuration

airport is an opinionated framework that assumes "convention over configuration"
for the following things:

#### Separate schema project

Each schema is defined in its own project.  The reason - schemas should be reusable
across applications.  Someone might find reuse even for most trivial of projects that
you think won't be needed ever again.  The guiding assumption is that it is certainly
better to have fewer schemas (globally) and multiple applications reusing (parts of)
the same schemas.

#### Schema project directory structure

All schema projects share a common directory structure.

* src - all source lives under this folder
* lib - all compiled JavaScript lives under this folder

* src/ddl - all entities (annotated with JPA-like decorators) live here
* src/types - **work in progress** all entity fields get unique types that
  can then be referenced in the code (and searched for to trace the usage
  of specific fields)
* src/generated - generated code goes here (for queries, mutations and DAOs)
* src/dao - **work in progress** automatically generated Data Access Objects stubs
* (which extend common functionality defined in generated folder) go here
* tokens.ts - **work in progress** automatically generated Dependency Injection tokens for all DAO objects.
* index.ts - **work in progress** is automatically maintained

#### Code generation

In order for the GraphQL like language to work (and for additional type safety)
airport (actually the generators/runway library) generates a number of objects
in the src/generated directory.  Most of the API's using these
are abstracted away by the DAO (Data Access Objects) that are used to contain
all query/mutation/access rule logic.

#### Configuration file generation

DAO logic is mostly meant to be defined inside TypeScript decorators, those in 
turn are pre-processed and (along with entity definitions) are placed inside
a configuration JSON file.  This is the file that is read by the database
instance on the device when a schema is first installed (or is being upgraded).
Of course it is possible to write custom queries as well, though at the
cost of having to include quite a bit of framework code in your application
3rd party bundles.

### Entity Definitions

Entity definitions stick as much as possible to Java's JPA
syntax.  There are a few notable departures:

* airport does not have the concept of a session,
  hence nothing related to JPA sessions is present
* airport explicitly specifies all persist and delete
  cascading via GraphQL like syntax (with Firebase security
  rule flavoring), so cascade rules are specific
  to each mutation operation and are defined there.
* Syntax is in valid TypeScript 

```typescript
@Entity()
export class Parent {

    @Id()
    @GeneratedValue()
    key: number;

    value: string;

    @OneToMany({cascade: CascadeType.DELETE, mappedBy: 'parent'})
    children: Child[];
}

@Entity()
export class Child {

    @Id()
    @GeneratedValue()
    key: number;

    value: string;

    @ManyToOne()
    parent: Parent;
}
```

...
