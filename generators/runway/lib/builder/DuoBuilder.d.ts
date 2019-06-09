import { ImplementationFileBuilder } from './ImplementationFileBuilder';
import { PathBuilder } from './PathBuilder';
export declare class DuoBuilder extends ImplementationFileBuilder {
    constructor(pathBuilder: PathBuilder);
    build(): string;
}
