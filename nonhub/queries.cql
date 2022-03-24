use trasaction_logs; 

INSERT INTO
    transaction_log_entry(
        repository_id,
        actor_id,
        actor_record_id,
        time,
        data
    )
VALUES (
    123e4567-e89b-12d3-a456-426655440b23,
    123e4567-e89b-12d3-a456-426655440b23,
    1,
    '2019-03-04 07:01:00',
    '{}'
)

SELECT
    *
FROM
    transaction_log_entry
WHERE
    repository_id = '123e4567-e89b-12d3-a456-426655440b23'

/**
 This query will work with rolling time back (by say a minute)
 to make sure that all recent records are retrieved.
*/
SELECT
    *
FROM
    transaction_log_entry
WHERE
    repository_id = '123e4567-e89b-12d3-a456-426655440b23'
    AND time >= '2019-03-04 07:01:00'