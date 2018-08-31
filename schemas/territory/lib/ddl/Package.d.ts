import { PackageId, PackageName } from '@airport/ground-control';
import { ApplicationPackage } from "./ApplicationPackage";
export declare class Package {
    id: PackageId;
    name: PackageName;
    applicationPackages: ApplicationPackage[];
}
