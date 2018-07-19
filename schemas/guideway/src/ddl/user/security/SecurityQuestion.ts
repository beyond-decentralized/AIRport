import {
	Entity,
	GeneratedValue,
	Id,
	Table
} from "@airport/air-control";

export type SecurityQuestionId = number;

@Entity()
@Table({name: "AGT_SECURITY_QUESTIONS"})
export class SecurityQuestion {

	@Id()
	@GeneratedValue()
	id: SecurityQuestionId;

	question: string;

}