# TIQL

FUTURE WORK: I need help with parsing TIQL and IDE auto-completion

## Description

TypeScript Instrumented Query Language

Something like MyBatis but with IDEA completion of the SQL statements and support for object select statements:

My intial thoughs on the format for this are:

example.tiql:

<pre><code>export class ExampleDao extends BaseTiqlExampleDao {

    async getExampleEntity(
        id: string
    ): Promise<ExampleEntity[]> {
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

}</code></pre>

The /*** and ---- marked SQL comments are typed and let the developer
quickly specify the desired object graph and join relations. TIQL will 
geneate the necessary SELECT and "JOIN" clauses and insert it them 
inside "GENERATED" blocks.

Thus, TIQL (with generated statements) is standard SQL.

TIQL Daos be pre-processed at build time and implemented as generated
Tarmaq Daos.

</code></pre>