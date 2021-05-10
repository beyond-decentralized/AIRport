# airport

Airport is a reference implementation of [Autonomous Interdependent Repositories](https://patents.google.com/patent/US10902016B2).

Provides a net-like database of repositories.  A repository is a virtual database with it's own transaction log.
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
