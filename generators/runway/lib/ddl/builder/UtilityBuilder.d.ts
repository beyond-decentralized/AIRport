import { ImplementationFileBuilder } from './ImplementationFileBuilder';
import { PathBuilder } from './PathBuilder';
export declare class UtilityBuilder extends ImplementationFileBuilder {
    private classSuffix;
    private diSet;
    constructor(pathBuilder: PathBuilder, classSuffix: string, needsQEntity: boolean);
    build(): string;
}
