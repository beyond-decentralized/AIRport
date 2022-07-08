# Airbridge

FUTURE WORK
## Why the name 

Airport: "A jet bridge (also termed jetway, jetwalk, airgate, gangway, aerobridge/airbridge, skybridge, finger, airtube, expedited suspended passenger entry system (E-SPES), or its official industry name passenger boarding bridge (PBB)) is an enclosed, movable connector which most commonly extends from an airport terminal gate to an airplane,"

Logistics: "An airbridge is the route and means of delivering material from one place to another by an airlift."

@airport/airbridge adopts AIRport queries to work across
multiple AIRport App servers, when AIRport runs remotely
and when AIRport combines remote query results with local
(Turbase) query results.

## Description

Aggregates and re-(_localId)s all of the data. Maintains an internal 
format for query results that includes all of the Repository
and Actor records present the result as a separate descriptor.
Populate those records in every record of the result set.

In a multi-server scenairo this library splits and directs
repository requests to the correct servers (by parsing
Repository "source" fields). 

Saves on network bandwidth by passing in Repository and
Actor records only once.