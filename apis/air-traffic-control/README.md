# Air Traffic Control

"Air Control - controls how an airplane (your application) lands
and takes off (persists and retrieves data) from the airport."

## Internal and external query APIs.


Main goals of it are:

- Object Relational mapping w/ automatic Tree and Graph reconstruction
- Ease of defining query result structure
- Query compile-time checking

Air Control works with the help of query instrumentation.  Query APIs 
are created vis automatic inspection of entity objects.

It utilizes JPA-like decorators to record entity metadata.

Documentation can be found [here](./doc/README.md).
