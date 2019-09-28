import { IPackage } from './package';
export interface IPackagedUnit {
    id: number;
    name?: string;
    package?: IPackage;
}
