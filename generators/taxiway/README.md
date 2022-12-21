# Taxiway
## Why the name 

"A taxiway is a path for aircraft at an airport connecting runways with aprons, hangars, terminals and other facilities."

@airport/taxiway takes AIRport Apps before to their final form before they are loaded
at a @airport/terminal.

## Description

Does all necessary TypeScript code modifications before it is compiled into
runtime bundles. Currently it:

* strips out all decorators that are not needed at runtime.
