# Life Cycle in Angular

## Angular initialize the life cycle in a specific order

![life_cycle](./images/life_cycle.png)

# Simple Definition

1. One part of the execution is related to the component itself and for the children of the component.

2. The constructor is the first one to init , is the best place to make the dependency injection (services,etc...)

3. ngOnChange is going to execute every time a value change (can be @Input) is going to active when a vinculate properties is change, in the params of it , change:SimpleChanges it return the currentValue(variableChange), firstChange(bool) and previous value(can be null).

4. ngOnit is going to execute when the component is loaded and it execute before the ngOnChanges

5. ngDoCheck is going to execute when the child component make a change to the main component or fired whenever a component's input properties are checked. This method allows us to implement our own custom change detection logic or algorithm for any component.

6. ngOnDestroy is going to execute when we destroy a component (we change routes, make a click event to destroy or hide a component) this is a great place to unsuscribed observable that are running or desconnect event handlers to avoid memory leaks.
