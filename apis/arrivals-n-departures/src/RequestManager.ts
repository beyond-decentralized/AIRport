import { Actor } from "@airport/holding-pattern/dist/app/bundle";
import { UserAccount } from "@airport/travel-document-checkpoint/dist/app/bundle";
import { AirRequest } from "./AirRequest";

export interface RequestManager {

    request: AirRequest

    userAccount: UserAccount

    actor: Actor

}