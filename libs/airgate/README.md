# airgate

## Why the name 

Airgate "is an enclosed, movable connector which most commonly extends from an airport terminal gate to an airplane."

Airgate contains the API Proxy needed by AIR App client libraries.

## Description

Contains the ApiProxy superclass extended by all API stubs.
It is it's own library to reduce code included in API stubs
of AIR Apps.  It is separate from [@airport/final-approach](../schemas/final-approach)
because it is is not needed by lazy-loaded UI
bundles, which include @airport/final-approach.