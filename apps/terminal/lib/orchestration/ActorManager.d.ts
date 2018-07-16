import { IActor } from "@airport/holding-pattern";
export interface IActorManager {
    getCurrentActor(): Promise<IActor>;
}
export declare class ActorManager implements IActorManager {
    getCurrentActor(): Promise<IActor>;
}
