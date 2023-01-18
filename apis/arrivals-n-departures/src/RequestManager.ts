import { IUserAccount } from "@airport/aviation-communication";
import { Injected } from "@airport/direction-indicator";
import { IActor } from "@airport/ground-control";
import { AirRequest } from "./AirRequest";

@Injected()
export class RequestManager {

    request: AirRequest

    userAccount: IUserAccount

    actor: IActor

}
