# Takeoff
## Why the name 

"Takeoff is the phase of flight in which an aerospace vehicle leaves the ground and becomes airborne."

@airport/takeoff makes serialized entities usable as query APIs in code and defines how
a JSON application descriptor gets processed by AIRport.

## Description

1. Query entity and DDL "on the fly" code generation from the configuration (persisted in the database).
Used to provide core query APIs.

2. Schema related configuration generation.  Converts the JSON appliation descriptor
passed from the application to schema used for Query Object Generation.  Initializes the application.