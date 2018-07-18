import { ApplicationPackage } from "./ApplicationPackage";
import { Domain } from "./Domain";
export declare type ApplicationId = number;
export declare type ApplicationName = string;
export declare class Application {
    id: ApplicationId;
    name: ApplicationName;
    domain: Domain;
    applicationPackages: ApplicationPackage[];
}
