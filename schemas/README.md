# Schemas
Internal database schemas needed for AIRport to operate.

[airport-code](./airport-code)
Utility functionality schema (Sequences, System-Wide-Operation-Ids).

[airspace](./airspace)
Schema for recording AIRport schemas themselves.

[final-approach](./final-approach)
Core runtime dependencies for Apps (AirEntity and ApiProxy).

[holding-pattern](./holding-pattern)
Core repository schema.

[layover](./layover)
Repository synchronization conflict tracking schema.

[travel-document-checkpoint](./travel-document-checkpoint)
Optional Repository, User location and entity classification schema.

NOTE: it's a project of it's own to to allow one time patching of TypeScript
(for source bundle modifications).