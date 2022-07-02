import { Actor } from "@airport/holding-pattern";
import { User } from "@airport/travel-document-checkpoint";
import { AirRequest } from "./AirRequest";

export interface RequestManager {

    getRequest(): AirRequest

    getUser(): User

    getActor(): Actor

}