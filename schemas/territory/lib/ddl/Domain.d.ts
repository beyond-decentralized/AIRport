import { DbDomain, DbSchema, DomainId, DomainName } from '@airport/ground-control';
import { Application } from './Application';
export declare class Domain implements DbDomain {
    id: DomainId;
    name: DomainName;
    applications: Application[];
    schemas: DbSchema[];
}
