# Flight Number

Future work - Observables are not yet implemented.

## Why the name 

"In the aviation industry, a flight number or flight designator is a code for an airline service consisting of two-character airline designator and a 1 to 4 digit number.[1] For example, "BA 98" is a British Airways service from Toronto-Pearson to London-Heathrow. A service is called "direct" if it is covered by a single flight number, regardless of the number of stops or equipment changes."

One Flight Number is re-used across all flights for that service/route.

## Description

Observable management library.  Keep track of all Observable queries and decides
when to re-run them (based on if changes where made to a particular repository).

This works for on-device AIRport installations, since all changes are made to the
local database.

This also works when all read queries go through a local database while modifications
are executed remotely.  Changes made locally can be processed without a network
request and for read queries all changes to repositories are pulled from the server
and this there is an event to trigger Obserable.next.
