import { IActor } from "../../generated/infrastructure/qactor";
import { IApplication } from "../../generated/infrastructure/qapplication";
/**
 * Created by Papa on 12/18/2016.
 */
/**
 * A record of device+datatabase that adds to a repository
 */
export declare class ActorApplication {
    id: number;
    actor: IActor;
    application: IApplication;
}
