import { User } from "../User";
import { SecurityQuestion } from "./SecurityQuestion";
export declare class SecurityAnswer {
    user: User;
    securityQuestion: SecurityQuestion;
    answer: string;
}
