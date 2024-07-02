# tarmaq-dao

@airport/tarmaq-dao is a Data Access Object framework.  It provides
strongly-typed entry points into the Query API:

```typescript
@Injected()
export class IdeaDao
    extends BaseIdeaDao
    implements IIdeaDao {

    async findByRepositoryGUID(
        ideaGUID: string
    ): Promise<Idea> {
        let i: QIdea
        return await this._find({
            select: {
                '*': Y,
                reasons: {}
            },
            from: [
                i = this.qSchema.Idea,
                i.reasons.leftJoin()
            ],
            where: and(
                r.GUID.equals(ideaGUID)
            )
        })
    }

    async updateAgreementShareTotal(
        delta: ITotalDelta,
        idea: Idea
    ): Promise<void> {
        const i: QIdea
        await this._updateWhere({
            update: i = this.qSchema.Idea,
            set: {
                agreementShareTotal: plus(i.agreementShareTotal, delta.totalDelta)
            },
            where: i.equals(idea)
        })
    }

}
```
