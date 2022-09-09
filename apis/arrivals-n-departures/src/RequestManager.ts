import { Injected } from "@airport/direction-indicator";
import { Actor } from "@airport/holding-pattern/dist/app/bundle";
import { UserAccount } from "@airport/travel-document-checkpoint/dist/app/bundle";
import { AirRequest } from "./AirRequest";

@Injected()
export class RequestManager {

    request: AirRequest

    userAccount: UserAccount

    actor: Actor

}
