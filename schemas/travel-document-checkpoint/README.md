# Travel Document Checkpoint
## Why the name 

@airport/travel-document-checkpoint stores voluntary information about
user down to metro-area level. 
## Description

Entity classification schema:

*   Classification
    *   TypeClassification
*   Type

Core entity schema:
    User, Client, Terminal, Database entities and their joins to Type.

Geographical partitioning entities.  These are to geographically
narrow down repositories.  Users can also self-identify with a region.
Origins of Clients and Applications can be voluntarily tracked as well.
Client-side terminals inherit the regions specified by the users (if any).
Server side terminals may also identify themselves by location for
traffic balancing.

*   Continent
    *   Country
        *   State
            * MetroAreaState
        *   Metro Area.