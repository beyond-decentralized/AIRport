# Air Traffic Control

TODO: move the ORM part to ORMs\tmc
## Why the name

"Air traffic control (ATC) is a service provided by ground-based air traffic controllers who direct aircraft on the ground and through a given section of controlled airspace, and can provide advisory services to aircraft in non-controlled airspace."

ATC is (one of the ways) aircraft interfaces with an airport.  In @airport\air-traffic-control defines the interfaces needed for Applications
to interact with AIRport
## Description

Currently @airport\air-traffic-control hosts the default ORM.  It will be moved
to ORMs\tmc to allow for other ORM implementations.

ORM Documentation can be found [here](./doc/README.md).

@airport\air-traffic-control also contains the core query and peristence interfaces.  They define how Applications interact with AIRport.
