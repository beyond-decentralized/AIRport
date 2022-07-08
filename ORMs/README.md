# ORMS

AIRport is capable of supporting multiple ORMs.

Right now the default ORM is bundled into:

@airport/air-traffic-control

- JPA like annotations
- Query object and SQL wrapper APIS

@airport/check-in

- DAO pattern

To support multiple ORMs the default ORM is to be moved into:

[tmc](./tmc) TypeScript Mapping Constructs

