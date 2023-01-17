import { InternalUserAccount } from "@airport/aviation-communication"
import { IActor } from "@airport/ground-control"

export interface AirRequest {
    actor: IActor
    userAccount: InternalUserAccount
}