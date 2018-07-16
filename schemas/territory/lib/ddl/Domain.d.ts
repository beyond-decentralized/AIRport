import { DbDomain, DomainId, DomainName } from "@airport/air-control";
import { Application } from "./Application";
export declare class Domain implements DbDomain {
    id: DomainId;
    name: DomainName;
    applications: Application[];
}
