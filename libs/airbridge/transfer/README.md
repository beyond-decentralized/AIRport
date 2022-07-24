@airport/airbridge-transfer adopts AIRport queries to work across
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