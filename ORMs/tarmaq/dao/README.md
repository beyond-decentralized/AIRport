# tarmaq-dao

@airport/tarmaq-dao is a Data Access Object framework.

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
                i = Q.Idea,
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
            update: i = Q.Idea,
            set: {
                agreementShareTotal: plus(i.agreementShareTotal, delta.totalDelta)
            },
            where: i.equals(idea)
        })
    }

}
```