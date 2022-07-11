# TIQL

FUTURE WORK: I need help with parsing TIQL and IDE auto-completion

## Description

TypeScript Instrumented Query Language

Something like MyBatis but with IDEA completion of the SQL statements and support for object select statements:

My intial thoughs on the format for this are:

example.tiql:

<pre><code>
@Inject()
export class AnythingDao {

    async getExampleEntity(
        id: string
    ): ExampleEntity[] {
        SELECT 
            /*** {
                '*': Y,
                entityA: {}
            } */
        -- START GENERATED  
            ee.ARID,
            ee.RID,
            ee.AID,
            ee...
            ea.ARID as entity_a_arid,
            ea.RID as entity_a_rid,
            ea.AID as entity_a_aid,
            ea...
        -- END GENERATED
        FROM
            example_entity ee
            LEFT JOIN entity_a ea
                ---- TO ee
            -- START GENERATED  
                ON  ee.ENTITY_A_ARID = ea.ARID
                    AND ee.ENTITY_A_RID = ea.RID
                    AND ee.ENTITY_A_AID = ea.AID
            -- END GENERATED
        WHERE
            ee.id = id
    }

}
</code></pre>

In the above example the SELECT has a SQL comment that in TIQL is a strongly
typed block with top level entity matching the entity of the Dao.  This requires
the ablitiy to build an AST from the .ae and IDE integration to provide type
auto completion.

Once the entity block has been specified TIQL will geneate the necessary
SELECT clause and insert it in side the "GENERATED" block.

When joining entitiies the "-- TO alias" is also parsed and provides
autocompletions for all table aliases defined above.

Once TIQL generates the statement it can be used in a standard SQL
database for querying (or inserts/updates/deletes, yet to be prototyped).

It will also be possible to do the inverse - drop in a working SQL statement
and the SELECT entities and "-- TO alias"es derived.  This derivation will
be required to prove that the query does return the top level entity that
is associated with the the selected entity.


TIQL Daos be pre-processed at build time and implemented as generated
Tarmaq Daos.

</code></pre>