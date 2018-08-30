import {
	Column,
	Entity,
	Id,
	JoinColumn,
	ManyToOne,
	Table
} from '@airport/air-control'
import {User} from "../User";
import {SecurityQuestion} from "./SecurityQuestion";

@Entity()
@Table({name: "AGT_SECURITY_ANSWERS"})
export class SecurityAnswer {

	@Id()
	@ManyToOne()
	@JoinColumn(
		{name: "USER_ID", referencedColumnName: "ID", nullable: false}
	)
	user: User;

	@Id()
	@ManyToOne()
	@JoinColumn(
		{name: "SECURITY_QUESTION_ID", referencedColumnName: "ID", nullable: false}
	)
	securityQuestion: SecurityQuestion;

	@Column({name: 'ANSWER', nullable: false})
	answer: string;

}