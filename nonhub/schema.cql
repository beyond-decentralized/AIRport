CREATE KEYSPACE trasaction_logs WITH replication = {'class': 'NetworkTopologyStrategy', 'replication_factor' : 5};

/**
No point in sorting by time since it cannot be used for "get latest rows" queries
because it can take time to propagate data between nodes
CREATE TABLE transaction_log_entry (
   repository_id uuid,
   actor_id uuid,
   actor_record_id number,
   time timestamp,
   data text,
   PRIMARY KEY ((repository_id), time, actor_id, actor_record_id)
) WITH CLUSTERING ORDER BY (time DESC);
*/

CREATE TABLE transaction_log_entry (
   repository_id uuid,
   actor_id uuid,
   actor_record_id number,
   time timestamp,
   data text,
   PRIMARY KEY ((repository_id), actor_id, actor_record_id)
) WITH CLUSTERING ORDER BY (time DESC);