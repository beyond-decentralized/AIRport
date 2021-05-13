# LIBs
Various internal/external facing libraries.

[approach-lighting-system](./approach-lighting-system)
**work in progress** Internal logging system.

[blueprint](./blueprint)
aggregation of core [schemas](../schemas) needed for AIRport to operate

[di](./di)
"On the stack" dependency injection library.  Still needs additional
modules to enable "on the fly" upgrades.

[fuel-hydrant-system](./fuel-hydrant-system)
SQL Query generation engine.

[ground-transport](./ground-transport)
**work in progress, needs re-work probably for blockchain based implementation**
Cross device/database repository sharing engine.

[hangar](./hangar)
**work in progress, waiting for general code operability to be ready**
integration tests

[jet-bridge](./jet-bridge)
**work in progress** Application to AIRport adapter

[mono-rail](./mono-rail)
**Future project** High efficiency transport module (more efficient than highway)

[observe](./observe)
**obsoleted by [rxjs 7.0](https://rxjs.dev)** Observables, no longer
needed since rxjs 7.0 is small enough (and getting smaller) and hopefully
it's stack traces make a little bit more sense than before.

[ramp](./ramp)
**can't remember original purpose** probably a more lightweight version
of [jet-bridge](./jet-bridge)

[tower](./tower)
AIRport database control center.
