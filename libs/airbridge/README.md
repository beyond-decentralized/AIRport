# Airbridge

Airport: "A jet bridge (also termed jetway, jetwalk, airgate, gangway, aerobridge/airbridge, skybridge, finger, airtube, expedited suspended passenger entry system (E-SPES), or its official industry name passenger boarding bridge (PBB)) is an enclosed, movable connector which most commonly extends from an airport terminal gate to an airplane,"

Logistics: "An airbridge is the route and means of delivering material from one place to another by an airlift."

Data processing library for the Client.  Handles querying of server and Turbase 
at the same time. Ensures that numeric Ids are unique (
    across composite "server + Turbase" queries).  Optimizes network format of
server queries.

Also splits combined peristence requests to separate server 
and Turbase results.  It facilitates referncing of server records in decentralized
Repositories and vice versa. 