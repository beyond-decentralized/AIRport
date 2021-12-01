import { DbApplication } from '@airport/ground-control';
import * as ts from 'typescript';
import { Configuration } from './ddl/options/Options';
import { EntityCandidate } from './ddl/parser/EntityCandidate';
/** Generate documention for all classes in a set of .ts files */
export declare function generateDefinitions(fileNames: string[], options: ts.CompilerOptions, configuration: Configuration, applicationMapByProjectName: {
    [projectName: string]: DbApplication;
}): Promise<{
    [entityName: string]: EntityCandidate;
}>;
//# sourceMappingURL=FileProcessor.d.ts.map