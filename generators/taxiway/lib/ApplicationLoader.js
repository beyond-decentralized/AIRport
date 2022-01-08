import { DbApplicationBuilder } from '@airport/ground-control';
import fs from 'fs';
export class ApplicationLoader {
    constructor() {
        this.allApplications = [];
        this.dbApplicationBuilder = new DbApplicationBuilder();
        this.dictionary = {
            dbColumnRelationMapByManySide: {},
            dbColumnRelationMapByOneSide: {}
        };
    }
    findAllReferencedJsonApplications() {
        const jsonApplications = [];
        const fileNames = fs.readdirSync(process.cwd() + '/node_modules/');
        for (let fileName of fileNames) {
            if (fileName.startsWith('@')) {
                const subDirFileNames = fs.readdirSync(process.cwd() + '/node_modules/' + fileName + '/');
                for (let subDirFileName of subDirFileNames) {
                    const jsonApplication = this.getJsonApplication(fileName + '/' + subDirFileNames);
                    if (!jsonApplication) {
                        continue;
                    }
                    jsonApplications.push(jsonApplication);
                }
            }
            else {
                const jsonApplication = this.getJsonApplication(fileName);
                if (!jsonApplication) {
                    continue;
                }
                jsonApplications.push(jsonApplication);
            }
        }
        return jsonApplications;
    }
    getReferencedApplication(projectName) {
        const relatedApplication = this.getJsonApplication(projectName);
        if (!relatedApplication) {
            return null;
        }
        return this.dbApplicationBuilder.buildDbApplicationWithoutReferences(relatedApplication, this.allApplications, this.dictionary);
    }
    getJsonApplication(projectName) {
        // const pathsToReferencedApplications =
        // this.configuration.airport.node_modulesLinks.pathsToReferencedApplications let
        // relatedApplicationProject if (pathsToReferencedApplications &&
        // pathsToReferencedApplications[projectName]) { let referencedApplicationRelativePath =
        // '../../' + pathsToReferencedApplications[projectName] for (let i = 0; i < 10; i++) {
        // referencedApplicationRelativePath = '../' + referencedApplicationRelativePath let
        // pathToApplication             =
        // getFullPathFromRelativePath(referencedApplicationRelativePath, __filename) if
        // (fs.existsSync(pathToApplication) && fs.lstatSync(pathToApplication).isDirectory()) {
        // relatedApplicationProject = require(pathToApplication) break } } } else {
        // relatedApplicationProject = require(process.cwd() + '/node_modules/' + projectName) }
        let relatedApplicationJson;
        try {
            relatedApplicationJson = fs.readFileSync(process.cwd() + '/node_modules/'
                + projectName + '/src/generated/application-spec.json');
        }
        catch (e) {
            console.error(`Unable to load Application Spec from:
${process.cwd()}/node_modules/${projectName}/src/generated/application-spec.json`);
            return null;
        }
        // if (!relatedApplicationProject) {
        // 	throw new Error(`Could not find related application project '${projectName}'`)
        // }
        // if (!relatedApplicationProject.APPLICATION) {
        // 	throw new Error(`Could not find related application in project '${projectName}'`)
        // }
        if (!relatedApplicationJson) {
            return null;
        }
        return JSON.parse(relatedApplicationJson);
    }
}
//# sourceMappingURL=ApplicationLoader.js.map