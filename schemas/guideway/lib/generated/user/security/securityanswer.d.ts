import { IUser } from '../user';
import { ISecurityQuestion } from './securityquestion';
export interface ISecurityAnswer {
    user: IUser;
    securityQuestion: ISecurityQuestion;
    answer?: string;
}
//# sourceMappingURL=securityanswer.d.ts.map