# Objects

In this section...

- Creating Obj
- Factories and Constructors
- Primitive and Reference Types
- Working with Properties
- Private Properties
- Getters/Setters


*An obj in js is essentially a collection of key/value pairs.*

A simple way to define an obj is using **Object Literals** :

```
const circle = {
    radius: 1,
    location: {
        x: 1,
        y: 1,
    },
    draw: function () {
        console.log('draw');
    }
};

circle.draw();
```

But we can also create an obj by using:

- Factories 
- Constructors.

With the current implentaion ifwe want to create an other circle we have to duplicate our code:

```
const circle = {
    radius: 1,
    location: {
        x: 1,
        y: 1,
    },
    draw: function () {
        console.log('draw');
    }
};

const circle = {
    radius: 2,
    location: {
        x: 2,
        y: 2,
    },
    draw: function () {
        console.log('draw');
    }
};

circle.draw();
```

This is not just ugly but if we have a bug we'll need to fix it into multiple places!

### Factory

```
function createCirle(radius) {
    return {
        radius: radius,
        draw: function () {
            console.log('wowo');
        }
    };
}

const circle = createCirle(1);
console.log(circle);
```

### Constructor

First let's define a constrctor `fn`

```
function Circle() {
    
}
```

> The first letter is uppercase **C**ircle like a *Class* but in JS we don't have the concept of Classes that's why we define a `fn`.

```
function Circle(radius) {
    this.radius = radius;
    this.draw = function () {
        console.log('wow');
    }
}

```

Now in the body instead of returning an obj we use the `this` keyword to set a property  

> What is `this`?
> It's basically a reference to the obj that is executing a piece of code.

We can now create a our cirle by using the `new` operator:

```
function Circle(radius) {
    this.radius = radius;
    this.draw = function () {
        console.log('wow');
    }
}

const myCircle = new Circle(1);

```

> When we use the `new` operator a few things happens under the hood: 
>
> 1. It will create a new empty `{}` 
> 2. Then it will set `this` to point to that obj, otherwise by default `this` points to the global obj, the `window`.
> 3. Finally it will return that obj from this function `function Circle(radius) {}`


## Values vs Reference Types


In JS we have 2 categories of Types:

1. Values/Primitive
	- Number
	- String
	- Boolean
	- Symobol
	- undefined
	- Null
	 	
2. References
	- Objects
	- Functions
	- Array

Let's say we have 


```
let x = 10;
let y = x;

x = 20;
```

Which one will be the result in the console?

`x = 20` and `y = 10`

But what will happen if we did:

```
let x = { value: 10 };
let y = x;

x.value = 20;

console.log(x, y);
```



Now `x = {value: 20}` and `y = {value: 20}`

> When we use an obj, that obj is not stored in the variable, but somewhere in the memories, so both `x` and `y` are pointing to same obj in memory.

_Primitives are copied by their **value**. Objects are copied by their **reference**._


Now let's look at another example. Let's declare a variable and set it to 10. And then call `increase()` and pass this number. Now, if we `log` this number on the console, what we'll see?

```
let number = 10;

function increase(number) {
    number++;
}

increase(number);
console.log(number);

```

We still see 10 ??

When we call `increase()` and pass this `number` as argument its value is copied into the `number` variable inside the function which is completely independent form the other outside. We're essentially dealing with the original value.

Now if we do:

```
let number = { value: 10 };

function increase(number) {
    number.value++;
}

increase(number);
console.log(number);
```


It works!


## Enumerating Properties


To enumerate all the members in an obj:

```
function Circle(radius) {
    this.radius = radius;
    this.draw = function () {
        console.log('wow');
    }
}

const myCircle = new Circle(2);

// GET ONLY KEYS
for (const key in myCircle) {
    // console.log('key', key);
}
 
const keys = Object.keys(myCircle); // it will return an string[]

// GET ONLY VALUES
for (const key in myCircle) {
    // console.log('value', myCircle[key]);
}

// CHECK IF OBJ HAS KEY
for (const key in myCircle) {
    if (key === 'radius') {
        console.log(key);
    }
}

if ('radius' in myCircle) {
    console.log(true);
}
```


## Closure

```
function Circle(radius) {
    this.radius = radius;

    let defaultLocation = { x: 0, y: 0 };
    let computeOptimumLocation = function (factor) {
        // ....
    }

    this.draw = function () {
        computeOptimumLocation(0.1);

        console.log('draw');
    }
}

const myCircle = new Circle(1);

```

We can access to `computeOptimumLocation()` because in JavaScript we have this concept of **closure**.

So here, we have one function `function Circle(radius)` with inside an other function `this.draw = function () {`. 


Now we can declare some variable inside...

```
this.draw = function () {
	let x;
	let y;
    computeOptimumLocation(0.1);
}

```

...these are local variables that are only available in this function. Their scope is limited to this function, so when we finish executing this function, `x` and `y` **will go out of scope.**


Now in contrast to scope we have **closure**: *A closure determines what variables will be accessible to an inner function*. 

So this function `this.draw = function ()` will be able to access to all the local variables defined here (x,y), as well as the variables defined in its parent function (`let computeOptimumLocation`, `let defaultLocation`). 

> **Do not confuse closure with scope**: because the scope is temporary and it dies. In fact every time we call `draw()`, these variables (`x`,`y`) will be created and reinitialized and, after this function, will die; while these variables (`computeOptimumLocation`, `defaultLocation`) will continue to exist in memory. 



if we access the members of the `myCircle` object, we can only see `draw` and `radius`, sothe public interface of this object is simpler, it's easier to work with, and this will also prevent issues later down the road. This is a pillar of OOP: *Abstraction*.

































