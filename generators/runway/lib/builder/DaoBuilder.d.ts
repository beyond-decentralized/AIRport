import { ImplementationFileBuilder } from './ImplementationFileBuilder';
import { PathBuilder } from './PathBuilder';
export declare class DaoBuilder extends ImplementationFileBuilder {
    constructor(pathBuilder: PathBuilder);
    build(): string;
}
