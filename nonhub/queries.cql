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

-- This query won't work since there is no guarante when one node gets data vs another node
SELECT
    *
FROM
    transaction_log_entry
WHERE
    repository_id = '123e4567-e89b-12d3-a456-426655440b23'
    AND time >= '2019-03-04 07:01:00'