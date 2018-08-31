import { ApplicationId, ApplicationName } from '@airport/ground-control';
import { ApplicationPackage } from "./ApplicationPackage";
import { Domain } from "./Domain";
export declare class Application {
    id: ApplicationId;
    name: ApplicationName;
    domain: Domain;
    applicationPackages: ApplicationPackage[];
}
