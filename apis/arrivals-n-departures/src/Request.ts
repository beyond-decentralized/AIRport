import { IActor } from "@airport/holding-pattern";
import { User } from "@airport/travel-document-checkpoint";

export interface Request {
    actor: IActor
    user: User
}