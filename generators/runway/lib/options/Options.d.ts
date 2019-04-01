/**
 * Created by Papa on 4/24/2016.
 */
export interface Configuration {
    name: string;
    airport: {
        cacheGeneratedPaths: boolean;
        ddlDir: string;
        domain: 'private' | string;
        generatedDir: string;
        node_modulesLinks?: {
            pathToProject: string;
        };
    };
}
