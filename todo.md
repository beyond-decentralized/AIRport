# TODO list:

## Artifact Generation
many artifacts for current applications need to be generated automatically.  These include:

client
runtime
src/to_be_generated

### Regeneration check
It appears that some files won't be re-generated.  Ex:  Change the domain name for the
application and run @airport/runway.  The generated/application.ts doesn't appear to
be regenerated.  This needs to be fixed.  Probably the most sure way to do this is
to this is to whipe out the generated directory entirely and regenerated it.

## Refactoring
See refactoring.md