/**
 * Created by Papa on 4/24/2016.
 */

export interface Configuration {

	name: string

	airport: {
		apiDir?: string
		cacheGeneratedPaths: boolean
		daoDir?: string
		ddlDir: string
		domain: 'private' | string
		generatedDir: string
		node_modulesLinks?: {
			pathToProject: string,
			// pathsToReferencedApplications: { [projectName: string]: string }
		},
		application: string
	}

}
