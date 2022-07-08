# self

FUTURE WORK: implement when AIRport will be used quick prototyping

# Why the name

SELF — Simplified Short Approach Lighting System With Sequenced Flashing Lights

@airport/self - is a simplifed, "short" approach to writing to writing select
queries.  It uses sequenced reference lookups.  It self-infers the FROM clause.

## Description

["self"](https://beyond-decentralized.world/2022/Short_Queries.html)
infers the where clause (by assuming always left joins) from the
select clause and the where clause.  The where clause is constructed using
chained entity references: 

<pre><code>
class ADao
    extends SelfADao {

    async findSomething(
		field1Value: string,
		entityB: EntityB,
		entityD: EntityD
	) {
        const a = this._select({
	        '*': Y,
	        entityB: {
	            entityC: {}
	        }
        })
        return await this._where(
			and(
				a.field1.equals(field1Value),
				a.entityB.equals(bUuId),
				a.entityD.equals(dUuId)
			)
		)
    }
}
</code></pre>