import { Actor } from "@airport/holding-pattern/dist/app/bundle";
import { UserAccount } from "@airport/travel-document-checkpoint/dist/app/bundle";

export interface AirRequest {
    actor: Actor
    userAccount: UserAccount
}