import { DbSchemaBuilder } from '@airport/ground-control';
import fs from 'fs';
export class SchemaLoader {
    constructor() {
        this.allSchemas = [];
        this.dbSchemaBuilder = new DbSchemaBuilder();
        this.dictionary = {
            dbColumnRelationMapByManySide: {},
            dbColumnRelationMapByOneSide: {}
        };
    }
    findAllReferencedJsonSchemas() {
        const jsonSchemas = [];
        const fileNames = fs.readdirSync(process.cwd() + '/node_modules/');
        for (let fileName of fileNames) {
            if (fileName.startsWith('@')) {
                const subDirFileNames = fs.readdirSync(process.cwd() + '/node_modules/' + fileName + '/');
                for (let subDirFileName of subDirFileNames) {
                    const jsonSchema = this.getJsonSchema(fileName + '/' + subDirFileNames);
                    if (!jsonSchema) {
                        continue;
                    }
                    jsonSchemas.push(jsonSchema);
                }
            }
            else {
                const jsonSchema = this.getJsonSchema(fileName);
                if (!jsonSchema) {
                    continue;
                }
                jsonSchemas.push(jsonSchema);
            }
        }
        return jsonSchemas;
    }
    getReferencedSchema(projectName) {
        const relatedSchema = this.getJsonSchema(projectName);
        if (!relatedSchema) {
            return null;
        }
        return this.dbSchemaBuilder.buildDbSchemaWithoutReferences(relatedSchema, this.allSchemas, this.dictionary);
    }
    getJsonSchema(projectName) {
        // const pathsToReferencedSchemas =
        // this.configuration.airport.node_modulesLinks.pathsToReferencedSchemas let
        // relatedSchemaProject if (pathsToReferencedSchemas &&
        // pathsToReferencedSchemas[projectName]) { let referencedSchemaRelativePath =
        // '../../' + pathsToReferencedSchemas[projectName] for (let i = 0; i < 10; i++) {
        // referencedSchemaRelativePath = '../' + referencedSchemaRelativePath let
        // pathToSchema             =
        // getFullPathFromRelativePath(referencedSchemaRelativePath, __filename) if
        // (fs.existsSync(pathToSchema) && fs.lstatSync(pathToSchema).isDirectory()) {
        // relatedSchemaProject = require(pathToSchema) break } } } else {
        // relatedSchemaProject = require(process.cwd() + '/node_modules/' + projectName) }
        let relatedSchemaJson;
        try {
            relatedSchemaJson = fs.readFileSync(process.cwd() + '/node_modules/'
                + projectName + '/src/generated/schema.json');
        }
        catch (e) {
            return null;
        }
        // if (!relatedSchemaProject) {
        // 	throw new Error(`Could not find related schema project '${projectName}'`)
        // }
        // if (!relatedSchemaProject.SCHEMA) {
        // 	throw new Error(`Could not find related schema in project '${projectName}'`)
        // }
        if (!relatedSchemaJson) {
            return null;
        }
        return JSON.parse(relatedSchemaJson);
    }
}
//# sourceMappingURL=SchemaLoader.js.map