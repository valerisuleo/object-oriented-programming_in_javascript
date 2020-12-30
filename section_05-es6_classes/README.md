# ES6 Classes

In this section...

- ES6 Classes
- Hoisting
- Static Methods
- The *This* Keyword
- Private Members
- Getters and Setters
- Inheritance

## ES6 Classes

There's a new way of creating obj and implementig inheritance: *Classes*. Those classes !== from the classes we can find in Java or C#; there are just syntactic sugar over prototypical inheritance.

1. Let's start with the body of the class. Here we can define props amd methods: `class Panthera() {}`;
2. Inside the body we have a special method to initialise obj. It's called `constructor()`.
3. Still inside the body we can add a method `makeTiger()`:

	```
	class Panthera {
	    species = '';
	    subspecies = '';
	    foodEaten = [];
	
	    constructor() {}
	
	    makeTiger = (name, species, food) => {
	        this.subspecies = name;
	        this.species = species;
	        this.foodEaten.push(food);
	    }
	}
	
	```
	
	>**N.B.** All the methods inside the body will end-up on the prototype of the *Panthera* obj. Else we need to define our method inside the `constructor`;


## Hoisting

In JS there are 2 ways of defining functions:

1. Function *declaration* synthax

	```
	function sayHello() {};
	```
	
2. Function *expression* synthax

	```
	const sayHello = () => {};
	```

>What's the differnce beetween them?

**Functions declaration are hoisted** which means are rised to the top of the code. If we do:

```
sayHello();
function sayHello() { 
}
```

That's perfectly valid because behind the curtains that's how this piece of code is executed:

```
function sayHello() {  
}
sayHello();

```

In contrast **function expressions are not hoisted**, so if we do:

```
sayHello();
const sayHello = () => {
}
```

this time we are gonna get an error: <span style="color: red">sayHello is not defined</span>

>What about classes `class Circle {}`?

Unlike functions, **class declarations are not hoisted**, so we can't do something like this:

```
const myCircle = new Circle();
class Circle {
}
```


## Static Methods

1. Instance methods;

	```
	class Circle {
	    radius = null;
	
	    constructor() {
	        this.radius = 1
	    }
		
		<!--Instance method-->
	    draw() {
	        console.log('draw');
	    }
	}
	
	const myCircle = new Circle();
	```
	
	The `draw()` method is available on instance of the class Circle.

2. Static methods: *are available on the class itself. We often use them to create utility options that are not specific to a given obj.*

	```
	class Circle {
	    radius = null;
	
	    constructor() {
	        this.radius = 1
	    }
		
		<!--Instance method-->
	    draw() {
	        console.log('draw');
	    }
	    
	    <!--Static method-->
	    static parse(string) {
	    
	    }
	}
	
	const myCircle = new Circle();
	Cirle.parse();
	```
	
	Now the `parse()` is no longer available for `myCircle.parse()` but it's available on the class obj `Circle.parse()`;

	>**N.B.** To call `static` methods we don't need to create an instace of the class <s>`const myCircle = new Circle()`</s>
	
	
	```
	static parse(str) {
	    const res = JSON.parse(str);
	    return new Circle(res);
	}
	
	const parsed = Circle.parse('{"radius":1}');
	console.log('parsed', parsed);
	
	```
	
	Now this `static` method return the `Cirle` obj.


## The `this` keyword

```
function Square() {
    this.draw = () => {
        console.log('this', this);
    }
}

const sq = new Square();
sq.draw();
```

>Where is `this` pointing to?

It's pointing to the `Square` obj.

Now let's something like:


```
function Square() {
    this.draw = function() {
        console.log('this', this);
    }
}

const sq = new Square();
// sq.draw();
const data = sq.draw;
data();
```

>Where is `this` pointing to now?

It's pointing to the `window`.

>Why?

As we know *a `fn` inside an obj it's called method* so when we do `sq.draw();` we are calling a *method* while here `data()` we are calling a *function*. Said that, when we call a stand alone `fn` by default points to the `window`.

>How can we fix it?

1. `use strict` mode: JS engine will be more sensitive, so it will do more error checking and also will change the behaviour of the `this` keyword.

	```
	'use strict';
	
	function Square() {
	    this.draw = function() {
	        console.log('this', this);
	    }
	}
	
	const sq = new Square();
	// sq.draw();
	const data = sq.draw;
	data();
	```
	
	Now instead of seeing the `window` obj it will return `undefined` and the reason for this is to prevent us from accidentally change the window/global obj.

2. Use `=>`. Arrow function are an ES6 feature and help a lot with to fix scope issue with the `this`

	```
	function Square() {
	    this.draw = () => {
	        console.log('this', this);
	    }
	}
	
	const sq = new Square();
	// sq.draw();
	
	const data = sq.draw;
	data();
	```  
	
	>So where is `this` pointing to?
	
	It's pointing back to the `Square` obj.


Now let's see what happen inside an ES6 `class`:

```
class Circle {
    draw() {
        console.log(this);
    }
}

const myCircle = new Circle();
const data = myCircle.draw;
data();
```

>Where is `this` pointing to?

It's `undefined`.

>Why?

Because by default the body of our classes are executed in `strict mode`.



## Private Members

### Using Symbol

**Abstaction**:*hiding the details and complexity and showing the essential parts*

To implemet abstraction we use private props/methods to make them not accessible from outside.

```
class Circle {

    constructor() {
        this.radius = 1;
    }
}
```

We want to make `this.radius` not accessable from outside.

In ES6 we have a primitive type called *Symbols* which is a unique identifier.

```
const _radius = Symbol();
const _draw = Symbol();

class Circle {
    constructor() {
        // this._radius = 1;
        this[_radius] = 1;
    }

    // draw() {
    //     console.log('draw');
    // }

    [_draw]() {
        console.log('draw');
    }
}

const myCircle = new Circle();
```

### Using WeakMaps

```
const _radius = new WeakMap();

class Circle {
    constructor(radius) {
       _radius.set(this, radius)
    }
}

const myCircle = new Circle(1);

```

`_radius.set(this, radius)`:

1. `this` which represent the *key* as obj;
2. `radius` which represent the *value*;

>WeakMaps: essentially is a dictionary where **keys are obj** and values can be anythig.

- Let's imagine we wanna **read** the radius prop. somewhere:

	```
	class Circle {
	    constructor(radius) {
	       _radius.set(this, radius)
	    }
	
	    draw() {
	        return _radius.get(this);
	    }
	}
	
	```

- How about defining another private method?

	```
	const _radius = new WeakMap();
	const _move = new WeakMap();
	
	```
	
	Once again in the constructor we initialise:
	
	```
	    constructor(radius) {
	       _radius.set(this, radius);
	
	       _move.set(this, () => {
	           console.log('move');
	       });
	    }
	```
	
	And we can call it **inside** the body of our class:
	
	```
	const _radius = new WeakMap();
	const _move = new WeakMap();
	
	class Circle {
	    constructor(radius) {
	       _radius.set(this, radius);
	
	       _move.set(this, () => {
	           console.log('move');
	       });
	    }
	
	    draw() {
	        // return _radius.get(this);
	        return _move.get(this)();
	    }
	
	
	}
	
	const myCircle = new Circle(1);
	```
	

	###### Refactoring
	
	```
	const privateProps = new WeakMap();
	
	class Circle {
	    constructor(radius) {
	
	        privateProps.set(this, {
	            radius,
	            move: () => {
	                console.log('move');
	            }
	        });
	    }
	
	    draw() {
	        // return privateProps.get(this).radius;
	        return privateProps.get(this).move();
	    }
	
	
	}
	
	const myCircle = new Circle(1);
	```




## Getters and Setters

```
const _radius = new WeakMap();

class Circle {
    constructor(radius) {
       _radius.set(this, radius)
    }
}

const myCircle = new Circle(1);
```

So here we have defined a *private* prop. As we know we can access to the `radius` prop by doing:

```
class Circle {
    constructor(radius) {
       _radius.set(this, radius)
    }

    getRadius() {
        return _radius.get(this);
    }
}

const myCircle = new Circle(1);
myCircle.getRadius();
```

>What if we wanna access to the radius as prop instead of invoke `getRadius()` every time?

We can use *get/setters*:

```
class Circle {
    constructor(radius) {
       _radius.set(this, radius)
    }
    
    get radius() {
        return _radius.get(this);
        
    }
}

const myCircle = new Circle(1);

myCircle.radius;
```

We can also rewrite the value for radius:

```
const _radius = new WeakMap();

class Circle {
    constructor(radius) {
       _radius.set(this, radius)
    }

    get radius() {
        return _radius.get(this);
        
    }

    set radius(value) {
        if (value <= 0) {
            throw new Error('nope')
        } else {
            _radius.set(this, value);
        }
    }
}

const myCircle = new Circle(1);

myCircle.radius = 10;

```


## Inheritance in ES6 classes

```
class DataService {

    url = '';

    constructor(url, http) {
        this.url = url;
        this.http = http;
    }

    getAll() {
        return this.http.get(this.url);
    }
}

class DonutService extends DataService {

    constructor(http) {
        super('https://ga-doughnuts.herokuapp.com/doughnuts', http);
    }
}

const service = new DonutService();
service.getAll();

```



















