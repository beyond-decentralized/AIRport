# tarmaq-entity

@airport/tarmaq-entity is a collection of JPA-like entity and property decorators.

Used to

*   generate SCHEMA definitions, Query interfaces and Objects.
*   enable JSON trees as SELECT statements.


```typescript
@Entity()
@Table({ name: 'IDEAS' })
export class Idea
	extends AirEntity {

	constructor(
		entityGUID?: string
	) {
		super(entityGUID)
		this.reasons = []
	}

	@Column({ name: 'NAME', nullable: false })
	name: string

	@Column({ name: 'AGREEMENT_SHARE_TOTAL' })
	agreementShareTotal: number

	@ManyToOne({ optional: true })
	parent: Idea

	@OneToMany({ mappedBy: 'idea' })
	reasons: Reason[]

	@Transient()
	userAgreement?: Agreement

}
```
