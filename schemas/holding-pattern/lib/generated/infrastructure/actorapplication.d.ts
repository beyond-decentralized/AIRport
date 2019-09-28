import { IActor } from './actor';
import { IApplication } from './application';
export interface IActorApplication {
    id: number;
    actor: IActor;
    application?: IApplication;
}
