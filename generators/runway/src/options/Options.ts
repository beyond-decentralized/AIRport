/**
 * Created by Papa on 4/24/2016.
 */

export interface Configuration {

	name: string;

	airport: {
		cacheGeneratedPaths: boolean;
		ddlDir: string;
		domain: 'public' | 'private';
		generatedDir: string;
		node_modulesLinks?: {
			pathToProject: string,
			pathsToReferencedSchemas: { [projectName: string]: string }
		};
	}

}
