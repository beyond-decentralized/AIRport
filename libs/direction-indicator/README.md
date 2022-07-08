# Direction/Heading Indicator

## Why the name 

"The heading indicator (HI), also known as a directional gyro
 or direction indicator, is a flight instrument used in an 
 aircraft to inform the pilot of the aircraft's heading."

@airport/direction-indicator specifies how objects
are injected in AIRport.  Also the first letters are the same
as Dependency Injection.

## Description

AIRports Inversion of Control (IoC)/Dependency Injection. 

All objects are injected on the stack. Hence, it allows to
keep track of nested transactions and request state (without
having to pass around a context object in Application code).
Will allow "on the fly" applcation upgrades.
