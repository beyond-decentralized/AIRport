# State

AIRport dependency injection is meant to allow for swapping of objects at
runtime (injection is done on the stack with syntactic sugar to appear
like property injection).  Original purpose of this was for quick upgrades
(without having to do a restart of the framework and all appliations).
This feature can also be used to support multiple version of apps/framework
at the same time (depending on what version clients and other apps are
calling).

Another feature that is enabled by this dependency injection is
request-scoped state and ability to maintain the current transaction id
without having to pass it around.

For logic hotswap to work properly all state must be stripped from the
injected objects.  Eventually a pre-processing step can be added that
will automatically store all object state in a central location while
wrapping the object properties with getters (that access that location.)

# Hot Swapping
Ultimately all logic needs to be encapsulated in injectable objects
(so that it can be fixed and hot-swapped in).  There are a few remaining
files that still need to be refactored:

apis\air-traffic-control\src\impl\core\Joins.ts
apis\air-traffic-control\src\impl\core\MappedEntityArray.ts
apis\air-traffic-control\src\impl\query\api\Lookup.ts
apis\air-traffic-control\src\impl\utils\qApplicationBuilderUtils.ts
apis\air-traffic-control\src\lingo\query\facade\Query.ts
apis\ground-control\src\impl\utils\DatastructureUtils.ts
apis\ground-control\src\lingo\core\field\JSONClause.ts
apis\check-in\src\SequenceGenerator.ts
engines\tower\src\core\globalScopeUtils.ts

There are also a number of static convenience objects and methods
that are meant for use in Application DAOs:

apis\air-traffic-control\src\impl\core\Joins.ts
apis\air-traffic-control\src\impl\core\operation\LogicalOperation.ts
apis\air-traffic-control\src\lingo\query\facade\Query.ts

(there may be a few more out there).  All internal static methods and
properties should be moved into @Injected() classes. All externally
referenced static method implementations should be placed into
@Injected() objects and should be referenced from within the convenience
wrappers.  More thinking needs to go into how (if at all) to abstract
away convenience variables (like "Y").  Not abstracting them away
may fix them at older versions and that needs to be thought through.

Current thinking is that all injection tokens and function wrappers
should be in a place where they can be loaded separately into the
incoming patches.  That will reduce duplication of loaded code with
all methods still referencing internally wrapped implementations
(in @Injected() classes).

The idea is that these static properties will be just be bundled in
and won't have much impact (hopefully) - this needs to be tested.