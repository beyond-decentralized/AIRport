# airport

Airport is a reference implementation of [Autonomous Interdependent Repositories](https://patents.google.com/patent/US10902016B2).

Provides a net-like relational database of repositories.  A repository is a virtual database with it's own transaction log.
It has globally unique identifier that helps to distiguish it from other repositories in the same relational
database (such as WebSql or SqLite).

Each repository is completely autonomous and can be added to a host relational database and/or removed from it,
at any time, without affecting other repositories.  Repositories can have references to each other thus depending
on data that other repository contains, but must be usable without referenced repositories (thus being
both interdependent and autonomous).

Initial airport deployments will have server components to enable communication between mobile devices.
In it's final form airport could be used directly between devices to communicate
changes in the state of repositories shared between their members (based on some form of 
[mobile device-to-device Web Access](https://patents.google.com/patent/WO2019036410A1)).

## API

airport uses a combination of existing technologies for it's APIs

* For defining entities it uses JPA like annotations (though without much of the complexity since it assumes some best practices and is sessionless).
* For querying it uses a TypeScript compliant GraphQL like syntax (based on auto-generated query objects)
* It enforces the DAO pattern where all of the query and mutation operations must be defined
* For mutations it uses a combination of Firebase Access rules and GraphQL like syntax to defined what can be updated in a given operation

## Device-central database

airport is desided for a single database per device.  Multiple applicaion schemas are installed into that database and allow for
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
