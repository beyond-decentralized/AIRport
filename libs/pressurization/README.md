# pressurization

Pressurization is AIRport's serialization of data between a client App and the local
AIRport server.  It deals with object graphs that are passed to and from client Apps.

During serialization pressuarization traverses the object graph, marks every object
with a unique identifier and replaces all duplicate references with a stub object
(which contains that unique identifier).

During deserialization it traverses the flattened object tree and re-constructs
an in-memory (potentially interlinked object graph).