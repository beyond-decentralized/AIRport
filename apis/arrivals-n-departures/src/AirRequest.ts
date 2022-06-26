import { Actor } from "@airport/holding-pattern";
import { User } from "@airport/travel-document-checkpoint";

export interface AirRequest {
    actor: Actor
    user: User
}