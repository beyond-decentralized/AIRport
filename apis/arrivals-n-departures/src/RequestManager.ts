import { Actor } from "@airport/holding-pattern";
import { User } from "@airport/travel-document-checkpoint";
import { AirRequest } from "./AirRequest";

export interface RequestManager {

    request: AirRequest

    user: User

    actor: Actor

}