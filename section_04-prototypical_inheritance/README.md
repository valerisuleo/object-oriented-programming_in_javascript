# Prototypical Inheritance

In this section...

- Cretaing your own Prototypical Inheritance;
- Resetting the Constructor;
- Intermediate Function Inheritance;
- Super Constructor;
- When to use inheritance;
- Composition and Mixins;



## Cretaing your own Prototypical Inheritance


So far we have created our *Monkey* obj. and we have externalised the `eatSomething()` method to make it available for every instance of Monkey:

```

function Monkey(name, species) {
    this.subspecies = name;
    this.species = species;
    this.foodEaten = [];
}

Monkey.prototype.eatSomething = function (food) {
    this.foodEaten.push(food);
};

const amanda = new Monkey('golden monkey', 'C. kandti');
const jason = new Monkey('cheeky monkey', 'C. kandti');

amanda.eatSomething('mango');
jason.eatSomething('bananas');

```

So far so good but monkeys are not the only ones that need to `eatSomething()`:

```
function Panthera(name, species) {
    this.subspecies = name;
    this.species = species;
    this.foodEaten = [];
}
```

>How can we share the `eatSomething()` with our *Panthera* obj?

1. Let's create `function Hunting() {}`;
2. <s>`Monkey.prototype.eatSomething`</s> into: `Hunting.prototype.eatSomething`;
3. By deafault both `Monkey.prototype` and `Panthera.prototype` inherit from the *objectBase*  (aka the root obj). 
4. In order to allow them to access to `eatsomething()` we need to make them both inherit from **Hunting.prototype**: `Monkey.prototype = Object.create(Hunting.prototype);`


```
function Hunting() {}

Hunting.prototype.eatSomething = function (food) {
    this.foodEaten.push(food);
};


function Monkey(name, species) {
    this.subspecies = name;
    this.species = species;
    this.foodEaten = [];
}

Monkey.prototype = Object.create(Hunting.prototype);
Monkey.prototype.greeting = () => {
    console.log('amanda says: Hello');
}


function Panthera(name, species) {
    this.subspecies = name;
    this.species = species;
    this.foodEaten = [];
}
Panthera.prototype = Object.create(Hunting.prototype);


const amanda = new Monkey('golden monkey', 'C. kandti');
const sharekhan = new Panthera('bengal tiger', 'P. tigris');

amanda.greeting();
amanda.eatSomething('mango');
sharekhan.eatSomething('amanda');
console.log(amanda, sharekhan);
```

### Resetting the Constructor

There's an issue with this implemtations: **we no longer can create *Monkey obj* based on its contructor in a dynamic fashion**.

![](https://www.dropbox.com/s/g45h3duultyufb2/Screenshot%202020-12-27%20at%2018.15.24.png?raw=1)

As we can see the constructor property is returning the *Hunting()* function not the Monkey function.


>How can we fix this?

As best practice whenever we reset the prototype of an obj we should also reset the constructor: `Monkey.prototype.constructor = Monkey;`


### Refactoring

Currently we have to repeat everytime this piece of code

```
Panthera.prototype = Object.create(Hunting.prototype);
Panthera.prototype.constructor = Panthera;
```

So first let's store it into a `fn` that can be called when need it

```
function extend(Child, Parent) {
    Child.prototype = Object.create(Parent.prototype);
    Child.prototype.constructor = Child;
}
```
This is what we call ***Intermediate Function Inheritance***.

>Note: Child, Parent are both titlecase because we expecting these to be a constructor `fn`.

```
function Panthera(name, species, color) {
    this.subspecies = name;
    this.species = species;
    this.foodEaten = [];
    Hunting.call(this, color);
}
extend(Panthera, Hunting);
```
 


## Calling the Super Constructor

Let's say we want to add a property *color*:

```
function Hunting(color) {
    this.color = color;
    console.log(this);
}

function Panthera(name, species) {
    this.subspecies = name;
    this.species = species;
    this.foodEaten = [];
    Hunting();
}

```

>There is not a color property in the console. Why?

If we do 

```
function Hunting(color) {
    this.color = color;
    console.log(this);
}
```

We'll immediatley notice that `this` is pointing to the `window`!

>How can we fix it?

We can use `call()`:

```
function Panthera(name, species) {
    this.subspecies = name;
    this.species = species;
    this.foodEaten = [];
    Hunting.call(this);
}
```

It works!

Now we just need to pass the color string:

```
function Panthera(name, species, color) {
    this.subspecies = name;
    this.species = species;
    this.foodEaten = [];
    Hunting.call(this, color);
}

const sharekhan = new Panthera('bengal tiger', 'P. tigris', 'red');

```

## Polymorphism


Let's do something like this:

```
function Greet() {
}

Greet.prototype.greeting = function () {
    console.log('Hello');
}

```

>What if we want to customise our message?

Well, we need to overwrite the original function:

```
Monkey.prototype.greeting = function () {
    console.log('amanda says: Hello');
}

Panthera.prototype.greeting = function () {
    console.log('sharekhan says: Hello');
}
```

**Now we have multiple implemetation of the `greeting()` method. That's what we call Polymorphism**.

>Why is this so powerful?

```
const zoo = [];
zoo.push(amanda, sharekhan);

zoo.forEach(animal => {
    animal.greeting();
});
```

Depending on the type of the `animal` obj a different implementation of `greeting()` will be called.
Before OOP you had to write code like this:

```
zoo.forEach(animal => {
    if (animal.species === 'P. tigris') {
    	sayHello();
    } else if (animal.species === 'C. kandti') {
    	// do something...
    } else {
    	// do something...
    }
});

```

Now `sayHello()` is not part of any obj. It's just a stand alone `fn`. **This is not the OOP way of writing code!**. 

>In OOP we encapsulate `var` and `fn` into obj.



## When to use inheritance?

We need to be careful because inheritance can make our code base complex and **fragile**.

What's wrong here?

![](https://www.dropbox.com/s/qza795j7c45rumy/Screenshot%202020-12-27%20at%2020.56.56.png?raw=1)

Goldfish can't `walk()`. **Our Hierarchy is broken!**

To solve this problem we need to change our Hierarchy:

![](https://www.dropbox.com/s/74n6g3eq2kx7rdo/Screenshot%202020-12-27%20at%2021.00.44.png?raw=1)

What would happen if we had 100 different type of animals? **This is not scalable!**
When we use inheritance we should keep it to one level!

>Favor **Composition** over **Inheritance**

With *composition* we can compose few obj together to create a new obj:

![](https://www.dropbox.com/s/7rgs7cdtvmewt6m/Screenshot%202020-12-27%20at%2021.05.48.png?raw=1) 


```
const canWalk = {
    walk: () => {
        console.log('walk');
    }
}

const canEat = {
    eat: () => {
        console.log('eat');
    }
}
```

Now we can do `canWalk` + `canEat` = `Person`;

>In ES6 we have `Object.assign()` and we can use it to copy props/method from an obj to another.


1. We pass an empty obj as target `Object.assign({})`;
2. Then we pass one/more source obj `Object.assign({}, canEat)`;
3. `Object.assign()` will copy all the props/methods defined in `canEat` into this blank obj `{}`;
4. const person = Object.assign({}, canEat, canWalk);

Now if we are using a *constructor fn* we can still use this technique: 

```
function Person() {

}

Object.assign(Person.prototype, canEat, canWalk);
const person = new Person();

```


Now to make this code more readable we can extract `Object.assign(Person.prototype, canEat, canWalk);` and store it into a `fn` called ***mixins***:

1. We pass the target obj and the resource `function mixins(target) {}`
2. We pass the resources but we don't want have countless args: *resource1*, *resource2*, *resource3*, etc. so we need to do somethig like this: `function mixins(target, ...resources) {}`

	>`...resources` will collect all the arguments and turn them into an array.

3. Now resources is an array but we can't pass an array as second arg. so will use agan the spread operator to spread the array into multiple objects.

	```
	function mixins(target, ...resources) {
	    Object.assign(target, ...resources)
	}
	```

4. Now we can simply do: `mixins(Person.prototype, canEat, canWalk);`




















