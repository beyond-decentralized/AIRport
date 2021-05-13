#highway
Large server implementation (in the process of being moved to its
[own project](https://github.com/autonomous-interdependent-repositories/highway)
). Originally intended for more centralized polls of [Votecube](
https://github.com/votecube).

[control](./control)
**being reworked** Decorators for document database support.

[driveway](./driveway)
**work in progress** API to integrate Repository based code with central
server based implementations

[flow](./flow)
**work in progress** Queueing mechanism support (underlying implementation
is yet to be identified, probably either ActiveMQ or RabbitMQ).

[scylladb](./scylladb)
**work in progress** Additional drivers and generation code to get Document database support
for predefined queries, theoretically with a single @Document() decorator

[vespa](./vespa)
**work in progress** Additional drivers and generation code to automatically get Full Text Search
support (with an additional entity definition) and eventually all additional
functionality that vespa provides.
