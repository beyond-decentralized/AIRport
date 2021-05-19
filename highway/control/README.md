Currently control library aims to support two decorators.

1. A query level (@Find, @FindOne, @Search, @SearchOne) @Document()
   decorator that will automatically retrieve the required data
   from the configured document database (currently the only supported
   option is ScyllaDB), using the ordered query parameters as the
   key of the retrieved document (probably will only support a single
   primary key, for now).

What remains unclear is how exactly to maintain these views (automatically),
manual maint


2. A field level @FullTextSearch() decorator that points to a
   particular field (aided by a brand new set of decorators for the Full
   Text Search framework, the only currently supported is Vespa).
