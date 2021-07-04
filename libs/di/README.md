# Dependency Injection (di)
AIRports own Inversion of Control implementation.  In AIRport all objects
are injected on the stack.  This allows for seamless upgrades/bug fixes 
which can be done on the fly without having to re-start the AIRport
 application (or parent frame).  This is important because AIRport runs
 on user devices and does not have a defined maintenance schedule, upgrades
 are performed whenever the the application sees new version of the framework
  online (in automatic mode) or whenever the users chooses to upgrade
  (in lock-down mode).
