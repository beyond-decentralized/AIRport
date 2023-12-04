import {
	IApplication,
	IApplicationBuilder,
	JsonApplication
} from '@airport/ground-control';
import fs from 'fs';
import { EntityReference, PropertyDocEntry } from '../parser/DocEntry';
import { DdlApplicationBuilder } from './DdlApplicationBuilder';

export interface IApplicationLoader {

	setApplicationMap(
		applicationMap: { [projectName: string]: IApplication }
	): void

	findAllReferencedJsonApplications(): JsonApplication[];

	getReferencedApplication(
		projectName: string,
		property: EntityReference & PropertyDocEntry,
	): IApplication

}

export class ApplicationLoader
	implements IApplicationLoader {

	applicationMap: { [projectName: string]: IApplication } = {};

	allApplications: IApplication[] = [];
	dbApplicationBuilder: IApplicationBuilder = new DdlApplicationBuilder();
	dictionary = {
		dbColumnRelationMapByManySide: {},
		dbColumnRelationMapByOneSide: {}
	};

	setApplicationMap(
		applicationMap: { [projectName: string]: IApplication }
	): void {
		this.applicationMap = applicationMap
	}

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
	): IApplication {
		const knownApplication = this.applicationMap[projectName]
		if (knownApplication) {
			return knownApplication
		}

		const relatedApplication = this.getJsonApplication(projectName, property);

		if (!relatedApplication) {
			return null;
		}

		const dbApplication = this.dbApplicationBuilder.buildIApplicationWithoutReferences(
			relatedApplication, this.allApplications, this.dictionary);
		this.applicationMap[projectName] = dbApplication

		return dbApplication
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

Entity: ${property?.ownerEntity?.docEntry.name}
Property: ${property?.name}

If you are using an external type that represents a primite please add one of
the following decorators to the property definition:

@Json()
@DbAny()
@DbBoolean()
@DbDate()
@DbNumer()
@DbString()

If you are adding a transient field add the following decorator:

@Transient()
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

export const DB_APPLICATION_LOADER = new ApplicationLoader()