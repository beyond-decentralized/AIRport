import { ApplicationPackage } from "./ApplicationPackage";
export declare type PackageId = number;
export declare type PackageName = string;
export declare class Package {
    id: PackageId;
    name: PackageName;
    applicationPackages: ApplicationPackage[];
}
