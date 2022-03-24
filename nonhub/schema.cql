CREATE KEYSPACE trasaction_logs WITH replication = {'class': 'NetworkTopologyStrategy', 'replication_factor' : 5};

/**
With the assumption that all nodes syncronized in a minute, continuous querying
can be done (including the previous minute) to get the latest changes
*/
CREATE TABLE transaction_log_entry (
   repository_id uuid,
   actor_id uuid,
   actor_record_id number,
   time timestamp,
   data text,
   PRIMARY KEY ((repository_id), time, actor_id, actor_record_id)
) WITH CLUSTERING ORDER BY (time DESC);
