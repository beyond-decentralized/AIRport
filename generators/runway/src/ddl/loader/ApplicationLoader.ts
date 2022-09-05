import {
	DbApplication,
	IDbApplicationBuilder,
	JsonApplication
} from '@airport/ground-control';
import fs from 'fs';
import { EntityReference, PropertyDocEntry } from '../parser/DocEntry';
import { DbApplicationBuilder } from './DbApplicationBuilder';

export interface IApplicationLoader {

	findAllReferencedJsonApplications(): JsonApplication[];

	getReferencedApplication(
		projectName: string,
		property: EntityReference & PropertyDocEntry,
	): DbApplication

}

export class ApplicationLoader
	implements IApplicationLoader {

	allApplications: DbApplication[] = [];
	dbApplicationBuilder: IDbApplicationBuilder = new DbApplicationBuilder();
	dictionary = {
		dbColumnRelationMapByManySide: {},
		dbColumnRelationMapByOneSide: {}
	};

	findAllReferencedJsonApplications(): JsonApplication[] {
		const jsonApplications: JsonApplication[] = [];
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
			} else {
				const jsonApplication = this.getJsonApplication(fileName);
				if (!jsonApplication) {
					continue;
				}
				jsonApplications.push(jsonApplication);
			}
		}

		return jsonApplications;
	}

	getReferencedApplication(
		projectName: string,
		property: EntityReference & PropertyDocEntry
	): DbApplication {
		const relatedApplication = this.getJsonApplication(projectName, property);

		if (!relatedApplication) {
			return null;
		}

		return this.dbApplicationBuilder.buildDbApplicationWithoutReferences(
			relatedApplication, this.allApplications, this.dictionary);
	}

	getJsonApplication(
		projectName: string,
		property?: EntityReference & PropertyDocEntry
	): JsonApplication {
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
		} catch (e) {
			console.error(`Unable to load Application Spec FROM:
${process.cwd()}/node_modules/${projectName}/src/generated/application-spec.json

Entity: ${property?.ownerEntity.docEntry.name}
Property: ${property?.name}

If you are using an external type that represents a primite please add one of
the following decorators to the property definition:

@Json()
@DbAny()
@DbBoolean()
@DbDate()
@DbNumer()
@DbString()
`)
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
