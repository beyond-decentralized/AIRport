# AIRport - [Autonomous Interdependent Repository](https://patents.google.com/patent/US10902016B2/) port

![AIRport - winged DApps](/presentations/images/logo/AIRPort_logo_with_slogan_1.0.png)

* [Description](#description)
  * [The Problem](#problem)
  * [The Solution](#solution)
* [Blockchain](#blockchain)
* [Backend](#backend)
* [Economics](#economics)
  * [Monetization](#monetization)
* [Application Collaboration](#app-collaboration)
* [API](#api)
* [Technical Details](#tech-details)

## Description <a name="description"></a>
AIRport allows:
* End Users to seamlessly share the data with other Users.
* Reuse of schemas for new Apps (enables small specialized "add-on Apps").
* Access to exiting data for new Apps.
* Hybrid decentralized/(partially) centralized applications.
* Automatic schema upgrades
* Schema backward compatibility
* [BPMN](https://github.com/paed01/bpmn-engine) logic execution (eventually)

### The problem: <a name="problem"></a>

Decentralized Applications (DApps) lack an easy-to-use database layer.

Right now there is no easy way to write DApps that rely on complex relational
schemas for data storage.  There is also no way for DApps to share data in
relational schemas and no way to generate synergies between DApps (from schema
sharing point of view).  And therefore there is no way to share CRUD logic
for relational schemas and no way to share process execution logic on top
of those schemas.

### The solution: <a name="solution"></a>

AIRport is a decentralized relational database of Repositories.  Repositories
are virtual databases, each with its own transaction log.  Each Repository has
a globally unique identifier that allows to distinguish it from other
repositories in the same relational database (such as SqlJs in demo mode, or
SqLite in a native App). For two Users to share a Repository it must be present
on their devices, and the schemas used by that repository must be installed
in AIRport databases on those devices.

    For example, in the below diagram AIRport database contains 2 schemas,
    one from App A and one from App B.  App A Schema contains table A__TABLE_II
    and App B Schema contains table B__TABLE_I.  3 repositories are pictured.
    Repository B1 spans both tables (and thus both schemas).  Repository B2
    is fully contained in B__TABLE_I.  Repository C1 spans only tables in App
    B Schema (other tables are not pictured).
    
![AIR reposiories](presentations/images/AIRport_diagram_2.png)

Records in AIRport tables are always identified by 3 columns:
* REPOSITORY_ID - this column contains the Repository's unique identifier
* REPOSITORY_ACTOR_ID - The id of an "Actor" that created or modified the record
* ACTOR_RECORD_ID - The id of the record (unique to combination of Repository and Actor)

Combination of these Ids allows for globally unique record identifiers within AIRport
tables.  It also allows to quickly find all records for a given repository or for
a given Repository Actor.  In practice, REPOSITORY_ACTOR_ID may also be unique while
ACTOR_RECORD_ID will be unique to the device it was created on and may repeat in a
given table because records may be created on different devices.

Each device/phone contains a single AIRport database that is shared by all
applications on that device.  The composition of the applications on each
device can be different.  The composition of the schemas installed in each
AIRport database on each device can be different as well.  Each database
contains only the Repositories the user of that device decides to keep on it.

![AIR across devices](presentations/images/AIRport_diagram_1.png)

    For example, in an Event Tracking App, data for each event is a separate Repository.
    Other Applications can build upon this App's schema, provide additional schemas 
    for functionality that builds upon the first App.  So, another App can build
    a Event Chat System for participants and use both the Event Tracking App schema
    as well as it's own schema.  Yet another App can build in Event Voting and use
    the schemas for both core Event Tracking and Event Chat and provide it's own
    schema as well.  Even more Apps can built add-on functionality without providing
    their own schemas.  The data used by all of these Apps (across all related 
    schemas) is stored in Event specific Repositories, one repository per event.  Thus
    a repository spans multiple Event Apps and Schemas.  The aggregate of specialized
    Event Apps together provides better functionality than the sum of its part Apps.
    Therefore, AIRport enables synergies between Apps where "the whole is greater than
    the sum its parts", reducing the overall costs (and the costs of building each App).

Each repository is completely autonomous and can be added to a host relational
database or removed from it (at any time) without affecting other
repositories.  Repositories can have references to each other thus depending
on data that other repository contains, but must be usable without referenced
repositories.  Repositories are both Autonomous and Interdependent.

## Blockchain<a name="blockchain"></a>

AIRport Repositories have blockchain based transaction logs.  Each transaction
log entry is a block. AIRport is fully functional off-line: transaction commits 
are made locally and are added to the "longest chain" once a device is back on-line.
Each Repository transaction log is a separate blockchain and itself can consist of 
sub-chains if the Repository goes out of sync on multiple devices (if Users modify
the repository at the same time, without syncing). So, Repository transaction log
is a Directed Acyclic Graph with each commit being a separate block. All 
sub-chains (sub graphs) are resolved to the "longest chain" via timestamp based
conflict resolution mechanism. 

    For example, if Alice modifies record 1 while being offline and Charlie
    modifies the same record also offline but at a later time then both
    with be notified of the conflict and automatic conflict resolution
    will pick the latest column values while still allowing for manual conflict
    resolution.

![AIR Transaction Log](presentations/images/AIRPort_Transaction_Log.png)

AIRport Repository block chains can be stored as part of public chain.  But, it
makes logical sense to keep each Repository blockchain as an independent private
chain.  Repository transaction logs can (of course) be archived on public
blockchains like Arweave and IPVS.


## Backend<a name="backend"></a>

AIRport's backend best fits with decentralized data storage technologies
since it itself is a decentralized database.  Centralized and peer-to-peer
backend implementations are possible for organizational or specialized
use cases.

In terms of cost effectives it is optimal to store Repositories in both permanent
and temporary storage.  This is because transaction logs are not space-efficient 
at storing store data.  However a Repository compaction setup is not reliable
in a decentralized setting. In such settings it is hard to achieve an agreement
on when to compact a given Repository.

Thus it is up to the Application and the User to decide if a particular
Repository has permanent or temporary quality.  Of course a temporary repository
can become permanent if an agreement between all of its member devices has
been achieved (or if owner of that repository decides to make it such).  Also,
time bound repositories (that are sealed at a determined time) are good candidates
for temporary to permanent transitions.

AIRport will use [Arweave](https://github.com/ArweaveTeam/arweave-js)
for permanent repository storage.  Arweave supports indexing and querying by tags,
which provides the necessary flexibility for internal Repository upkeep
(efficiently retrieving only recent transactions not made from this device, etc.).
Arweave also makes tracking transaction ownership and grouping easy. It also
provides for topical lookup of non-private Repositories.

[IPFS](https://github.com/ipfs/js-ipfs) can be used for temporary repository
storage.  It does not provide the tag based search capability of Arweave so
a small marker with tags may be stored in Arweave for lookup purposes.
It's hierachical directory and file naming is sufficient for all other
AIRport storage needs.

Further research is needed to determine if using other temporary storage
technologies (like Sia or Storj) is possible.


## Economics<a name="economics"></a>

In order for AIRport to be successful all of the involved parties need to be
incentivized to use it.  The three primary party types are:
- App Users
- App Creators
- AIRport Team

Users are generally interested in keeping their data private.  They are also
interested in reducing data duplication and duplicate data entry.  Users may
also be incentivized by profit sharing schemes from both App Creators and
AIRport Team.

App creators are incentivized by the profits that applications generate.  They
are also incentivized  in acquiring large market share (to maximize profits)
by enhancing and enlarging their offerings but are dis-incentivized by the costs
of additional work and expansion.

AIRport team incentives align closely with those application creators.  They
have an additional incentive to attract application creators to write Apps
on the platform.

Airport naturally fulfils User data incentives though it's technology.  It
also naturally solves the dilemma of large App monopolies by
 promoting App specialization (via schema+data sharing).

### Monetization<a name="monetization"></a>

A profit sharing setup will be used to reward schema creators when Apps
use them.  A nano-payment will be made the schema creator every time a CRUD
operation is performed (by Apps that do not directly associate with that schema).
Eventually the same logic will apply for BPMN logic providers.

To fulfil the rest of the incentives two alternative mechanisms will be
employed:

#### Decentralized advertisement with profit sharing<a name="advertisement"></a>

Airport (in combination with Arweave) will support a decentralized, privacy-centric 
advertisement engine.  Being decentralized it will allow full decentralized 
applications to be built on top of AIRport.  Without it Apps will have to rely on 
centralized advertisement platforms for their revenue.  It also makes long term
success of the project possible, providing revenue to the AIRport team for bug 
fixes and improvements.

The Ad decision making engine will kept on user devices,
thus solving data privacy issues.  Data will not be shared with any authority
or intermediary or the advertisers and will remain solely on the Users device
(inside the relational database, which is embedded in the locally installed
AIRport App).  This keeps the User in full control of how much data
is used for serving Ads.

The AIRport advertisement model is flipped from traditional push to pull.
In the push model a central authority decides what Ads get pushed to a user.
In AIRport pull model the User device decides what Ads to pull to the User.
Ads themselves will be stored on Arweave and tagged to allow pulling
the most appropriate Ads.  Thus the advertisement platform becomes fully 
decentralized and cannot be manipulated by a central authority.

In the long term multiple incentive tiers will be employed for the Users,
with increasing monetary rewards for all participants (because they provide
increasingly accurate Ad placement):

1.  Basic "content based" tier - users receive Ads based on the data that is
(locally) sent to the Apps from AIRport (for any given rendered page).
2.  Enhanced "content based" tier - Apps reinforces Ad choices by
sending back to AIRport page metadata (and static content rendered on pages).
3.  Demographic tier - user voluntarily stores their demographic data in
AIRport.  Again, it's not shared with anyone, just used to pull more accurate
Ads.
4.  Geographic tier - users opt in to using their permanent and current
location for serving Ads (again this information remains on the device
only and is not shared with anyone).
5.  Model tier - users opt in   anonymized Big Data model generation for
optimal Ad placement.  This does require sharing data which is scrubbed
of any PI (AIRport will provide annotations on per column basis to flag 
PI data).

Advertisement revenue will be split between the 3 parties (User, Apps,
Airport) in a manner that best fits the market conditions at that time.

#### Fee model
Users can opt out (either wholesale, or per App, or per time period,
or per repository) of advertisements by paying for usage of AIRport and
applications.  This allows the Apps and AIRport to still fulfill their
monetary incentives.  AIRport can act as either a central fee platform,
where it shares User fee revenue with the Apps, or Apps can share
their revenue with AIRport.

The expectation is that only a small number of Users will op-in for
the fee model and that the bulk of funds will come from the
decentralized advertisement engine.

## Application collaboration<a name="app-collaboration"></a>

Core to AIRport is cross-App collaboration and data reuse. The two key
points here are:

* User is in control of their data they allow applications to access 
  their data (usually only a part of their data).
* Applications are in control of sharing schemas with other applications
- they can allow or deny access to their schemas.

This means that new Applications can be written as add-ons to existing ones.
Also new applications don't have to worry about tedious data entry by users
(if that data is already present in the AIRport database).  Ultimately this
leads to data reuse and datanormalization, while allowing Apps to be more
integrated with each other.  Once the BPMN module is integrated this will
also allow applications to share process management logic as well, further
reducing development costs for new Apps.

The applications only interact with the device-local database, making AIRport
fully operational in offline-mode.  The database is in charge of maintaining the
repositories contained in it.  It may occasionally prompt the user to purge
infrequently used repositories (or may do so automatically if so configured),
leaving them only in the cloud backup.  The applications however may request the
user to load additional repositories from the cloud, for processing.


## API<a name="api"></a>
AIRport offers refined, high productivity developer APIS:

* Simplified JPA annotations (no session concept, easier relations)
* GraphQL like query API
* GraphQL/Firebase like hybrid solution for mutation & access rules
* Automatic schema generation and installation
* Automatic interface and DAO stub generation

These streamlined and automated APIs reduce the development burnen and allow
App creators to focus on the core persistence logic (instead of the CRUD
minutiae).  Developers can simply define their entities and then write
queries that return complete object trees (or even interlinked object
graphs).

## Technical details<a name="tech-details"></a>

### Installation process

The process of installing AIRport is:

*  User navigates to a consumer Application that uses AIRport and creates
  
  a Repository
*  Application prompts the user to install AIRport database App (if not
   installed already)
*  User installs AIRport App
*  The consumer application creates the private Repository and prompts
   to add other participating users
*  Creating user shares the Repository, and the App notifies new users

![AIRport as Cordova application](presentations/images/AIRport-in-Cordova.png)

### Autopilot client for Apps

AIRport provides "autopilot" client for Apps where CRUD code is
pre-processed by "@airport/runway" at build time and resides on the
AIRport server, not in the client-side library:


Autopilot Flow](presentations/images/Autopilot-Flow.png)

"@airport/runway" generates TypeScript interfaces which are used to define
the CRUD and Enitty API of the underlying schema.  The actual CRUD logic 
is defined in the schema configuration file, which is loaded into the 
device's AIRport database directly.  The config file is generated from
the annotated/decorator Entities and the DAO decorators that contain the
CRUD logic.  In "autopilot" mode only the dependency injection tokens are
included from the schema project (along with the "@airport/di",
"@airport/autopilot" and "@airport/pressurization" libraries).


### On the stack dependency injection

Since AIRport instances will be running on mobile devices, it has its own
"on the stack" Dependency Injection (DI for short) framework that allows it
to easily upgrade framework versions of code "on-the-fly", without requiring 
application restarts or interruptions in service.  Thus, dependency injection
is done "on the stack" (in the methods of the framework objects and nin the constructors of these objects).  The idea is that during an upgrade,
all in progress requests are allowed to complete while all pending requests
are halted (via async functions) at the very start.  Once all requests have
cleared an upgrade takes place (within the libs\di library, just replacing
old references to objects with new ones), then the remaining requests are resumed.
This works well since every operation in AIRport is "top-level transactional".

### Transactionality

For a number of reasons (primarily WebSql transactional limitations) all
transactions in AIRport must be sent over to the database in one shot.
That means that an entire object graph is sent it and is processed
according to the rules of a particular operation *(more on this later)*.

### Convention over configuration

AIRport is an opinionated framework that assumes "convention over configuration"
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
AIRport (actually the generators/runway library) generates a number of objects
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

* AIRport does not have the concept of a session,
  hence nothing related to JPA sessions is present
* AIRport explicitly specifies all persist and delete
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

    @OneToMany({mappedBy: 'parent'})
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

### Data Access Objects (DAOs)

After you've created your entities you run the @airport/runway generator
to generate all of the necessary code artifacts, including stub DAOs (
Data Access objects).  Now you can enter the mutation and query logic:

```typescript
import {
  ANOTHER,
  Y
}                         from '@airport/air-traffic-control'
import {
  Persist,
  RULES
}                         from '@airport/check-in'
import {DI}               from '@airport/di'
import {
  BaseParentDao,
  IBaseParentDao,
  ParentGraph,
  Q
}                         from '../generated/generated'
import {PARENT_DAO}       from '../tokens'
import {
  IParent,
  IParentDao,
  IExampleContext
}                         from '../types/types'

export class ParentDao 
       extends BaseParentDao 
       implements IParentDao {
    @Persist<ParentGraph>({
      key: Y,
      value: null || RULES.anyString(), 
      children: [{ 
      	key: Y, 
        value: null || 'Child_' + RULES.anyString() 
      } || null, ANOTHER(0, 3)]
    })
    create
  
    @Find<IParent>((parentValue) => ({
      select: {
      	children: {}
      },
      from: [
        p = Q.Parent
      ],
      where: p.value.like(parentValue)
    }))
    findByValue

}
DI.set(PARENT_DAO, ParentDao)
```

Most of the imports are coming from either the AIRport framework itself
or the generated folders and are already made for you in the generated
file.

You can now run the @airport/runway generator again to populate the
DAO interfaces (and rules.json file which is passed to the AIR databases
and contains the necessary declarative logic, without having to run any
external executables in the database, thus making the rules secure
to add to the db).  @airport/runway parses the Dao files using the
Typescript compiler and extracts the rules from the @Persist and
@Query decorators and composes the same rules in declarative JSON 
format (along with the schema definition).

```typescript
export interface IParentDao 
       extends IBaseParentDao {
    create(
      parent: IParent | IParent[],
      context?: IExampleContext
    ): Promise<void>

    findByValue(
      parentValue: IParent_Value,
      context?: IExampleContext
    ): Promise<IParent[]>

}
```

The DAO interfaces, along with the entity interfaces is all that is needed
to use the AIR database API.  Hence, AIRport provides a zero-application
code solution, with only a slim shim necessary to talk to the local AIRport
database (the only piece of runnable code from the schema project that must 
be imported from the schema project is the tokens.ts file):

```typescript
await DI.getSync(PARENT_DAO).create(parent)
```

Note how the Dependency Inject system automatically creates all of the
necessary injection tokens and maintains the tokens.ts file for you.

```typescript
import {system}             from '@airport/di'
import {IParentDao}         from './types/dao/ParentDao'
import {IChildDao}         from './types/dao/ChildDao'

const schema = system('example').lib('schema')

export const CHILD_DAO = schema.token<IChildDao>('IChildDao')
export const PARENT_DAO = schema.token<IParentDao>('IParentDao')
```

## Directory Structure
Internal directory structure of the AIRport meta-repository.

[apis](/apis)
Various internal and external APIs used by for AIRport entity definitions,
query and persistence definitions and various communication modules.

[apps](/apps)
Applications needed for AIRport to work (such us a mobile app and a sync
server).

[db](/db)
Database adapter implementations.

[generators](/generators)
Various code generators needed for AIRport projects to work.

[highway](/highway)
Large server implementation (in the process of being moved to its own project).

[libs](/libs)
Various internal/external libraries.

[presentations](/presentations)
Material for past and future presentations made on Autonomous Interdepedent
Repositories and AIRport.

[schemas](/schemas)
Internal database schemas needed for AIRport to operate.

## License
AIRport is distributed under the terms of both the MIT license and the Apache License (Version 2.0).

See [LICENSE-APACHE](LICENSE-APACHE), [LICENSE-MIT](LICENSE-MIT)

## ...
