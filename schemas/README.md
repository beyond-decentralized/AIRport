# SCHEMAs
Internal database schemas needed for AIRport to operate.

[airport-code](./airport-code)
Basic functionality stubs (Sequences, System-Wide-Operation-Ids, etc.)

[flight-log-archive](./flight-log-archive)
Logging schema for the sharing server, to be used in
conjunction with the sharing server schema [guideway](./guideway).

[guideway](./guideway)
**Needs revisiting** Sharing server schema.

[holding-pattern](./holding-pattern)
Core repository schema.

[moving-walkway](./moving-walkway)
**Needs revisiting** AIRport side (not sharing server side) sharing schema.

[point-of-destination](./point-of-destination)
**Needs more work** Repository grouping and archival schema, to be used in
conjunction with the sharing server schema [guideway](./guideway)

[runway-edge-lighting](./runway-edge-lighting)
**Needs revisiting** AIRport side (not sharing server side) logging schema.

[territory](./territory)
Application/package/domain tracking schema (AIRport side, not publishing
platform, which hasn't been defined yet).

[traffic-pattern](./traffic-pattern)
Schema for recording AIRport schemas themselves.

[travel-document-checkpoint](./travel-document-checkpoint)
**Needs revisiting** AIRport side (not sharing server side) schema for
keeping track which sharing server is used for which repositories and by
which users.

[vasi](./vasi)
**Pending** "vási"/βάση is "basis" in Greek.  This schema is intended
to have basic utility tables used in application schemas. 
