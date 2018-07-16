import { IApplication } from "../../generated/infrastructure/qapplication";
import { IRepository } from "../../generated/repository/qrepository";
/**
 * Created by Papa on 12/18/2016.
 */
/**
 * A record of device+datatabase that adds to a repository
 */
export declare class RepositoryApplication {
    id: number;
    application: IApplication;
    repository: IRepository;
}
