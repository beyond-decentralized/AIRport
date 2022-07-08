# Aviation English

FUTURE WORK: need help with parsing SQL and IDE auto-completion

## Why the name

"Aviation English is the de facto international language of civil aviation."

@airport/aviation-english will be a framework that uses SQL - a standard for relational databases.

## Description

Something like MyBatis but with IDEA completion of the SQL statements and support for object select statements:

example.ae:

<pre><code>
export class ExampleDao {

    async getExampleEntity(
        id: string
    ): ExampleEntity[] {
        SELECT 
            /* {
                *,
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
                -- TO ee
            -- START GENERATED  
                ON  ee.ENTITY_A_ARID = ee.ARID
                    AND ee.ENTITY_A_RID = ee.RID
                    AND ee.ENTITY_A_AID = ee.AID
            -- END GENERATED
        WHERE
            ee.id = id
    }


}

Will be pre-processed at build time to save (at least at first) with a tarmaq Dao put in generated folder as the implementation

</code></pre>