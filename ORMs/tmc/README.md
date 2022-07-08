# TMC

Future work - extract the current ORM from apis\air-traffic-control, to allow for other ORMs

# Why the name

"Many airports have a radar control facility that is associated with the airport. In most countries, this is referred to as terminal control and abbreviated to TMC."

Radar is (one of ways) how Airport interfaces with planes.  TMC is how AIRport interfaces with applications.

## Description

TMC (short for Typescript Mapping Constructs) is an ORM framework designed specifically
for AIRport.  It is a combination of:

- JPA like entity decorators
- GraphQL like select trees
- QueryDSL inspired Where clauses

It supports both entity based and table based queries.

It's query results can returned object trees and interlinked object graphs.

Documentation can be found [here](./doc/README.md).