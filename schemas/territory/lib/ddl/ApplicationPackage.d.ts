import { Application } from "./Application";
import { Package } from "./Package";
export declare type ApplicationPackageId = number;
export declare class ApplicationPackage {
    id: ApplicationPackageId;
    application: Application;
    package: Package;
}
