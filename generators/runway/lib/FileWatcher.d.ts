import * as ts from "typescript";
import { Configuration } from "./options/Options";
/**
 * Created by Papa on 3/30/2016.
 */
export declare function watchFiles(configuration: Configuration, options: ts.CompilerOptions, rootFileNames: string[]): void;
