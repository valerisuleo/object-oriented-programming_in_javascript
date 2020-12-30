# Prototypes

In this section...

- Inheritance
- Prototypes and Prototypical
- Multilevel Inheritance
- Constructor Prototypes


## Inheritance

Essentially we have **2 types of Inheritance**:

1. Classical
2. Prototypical

### Classical

Inheritance is one of the the pillar of OOP. It inables an obj to take all the properties and methods of an other obj (like we always do by extending the *data service* to the other services). 
This makes easier to reuse code in different parts of an applications.

> As we know in JS we don't have classes... Well, that's when prototypical Inheritance comes into the picture.

### Prototypical

*Every obj is JS (except for the "root obj") has a prototype/parent and inherits all the properties and methods defined in its prototype.*

```
function Monkey(name, species) {
    this.name = name;
    this.species = species;
}
```

Let's create 2 new instaces:

```
const spider = new Monkey('amanda', 'gorilla');
const cheeky = new Monkey('jack', 'orangotango');
```

So now we have 2 obj (*spider*, *cheeky*) in memory and both these obj reference objBase (Monkey).

>Don't you belive me?

Then just type in the console:

```
Object.getPrototypeOf(spider) === Object.getPrototypeOf(cheeky)
```

It will return `true` ;)

> **A protoype is just a regular obj in memory**.

## Multilevel Inheritance

If we do `const myArr = []` and `console.log(myArr)` we'll see something like this:

```
__proto__: 
	concat: ƒ concat()
	constructor: ƒ Array()
	copyWithin: ƒ copyWithin()
	entries: ƒ entries()
	every: ƒ every()
	fill: ƒ fill()
	filter: ƒ filter()
	find: ƒ find()
	findIndex: ƒ findIndex()
	flat: ƒ flat()
	flatMap: ƒ flatMap()
	forEach: ƒ forEach()
	includes: ƒ includes()
	indexOf: ƒ indexOf()
	join: ƒ join()
	keys: ƒ keys()
	lastIndexOf: ƒ lastIndexOf()
	length: 0
	map: ƒ map()
	pop: ƒ pop()
	push: ƒ push()
	reduce: ƒ reduce()
	reduceRight: ƒ reduceRight()
	reverse: ƒ reverse()
	shift: ƒ shift()
	slice: ƒ slice()
	some: ƒ some()
	sort: ƒ sort()
	splice: ƒ splice()
	toLocaleString: ƒ toLocaleString()
	toString: ƒ toString()
	unshift: ƒ unshift()
	values: ƒ values()
	Symbol(Symbol.iterator): ƒ values()
	Symbol(Symbol.unscopables): {copyWithin: true, entries: true, fill: true, find: true, findIndex: true, …}
	
	//// prototype of the arrayBase obj///
	__proto__: Object
```

All these methods are defined in this obj which is the prototype for all arrays in JS

So this is what we have in memory:

![Imgur](https://www.dropbox.com/s/hazcz9iiwtagwu9/Screenshot%202020-12-24%20at%2021.21.51.png?raw=1)


Now let's take a look at the prototype of the arrayBase obj:

```
__proto__:
	constructor: ƒ Object()
	hasOwnProperty: ƒ hasOwnProperty()
	isPrototypeOf: ƒ isPrototypeOf()
	propertyIsEnumerable: ƒ propertyIsEnumerable()
	toLocaleString: ƒ toLocaleString()
	toString: ƒ toString()
	valueOf: ƒ valueOf()
	__defineGetter__: ƒ __defineGetter__()
	__defineSetter__: ƒ __defineSetter__()
	__lookupGetter__: ƒ __lookupGetter__()
	__lookupSetter__: ƒ __lookupSetter__()
	get __proto__: ƒ __proto__()
	set __proto__: ƒ __proto__()
```

this is the root obj! so here's what we got:

![](https://www.dropbox.com/s/ij8fhtmnw3k6y8g/Screenshot%202020-12-24%20at%2021.13.58.png?raw=1)

**This is what we call multilevel inheritance**

> Objects created by a a given constructor will have the same prototype.



## Constructor Prototypes

>How can we get the prototype of an obj?

As we know the right way to get the prototype of an obj is: `Object.getPrototypeOf(myIObj)`

Now what we need to bear in mind is that Constructor has prototype too.

Here's the Monkey constructor function 

```
function Monkey(name, species) {
    this.name = name;
    this.species = species;

    this.foodEaten = [];
}
```

As we know in JS `fn` are obj, which means they have properties and methods. So here we can do `Monkey.prototype`

>What is `Monkey.prototype`?

This is the obj that will be used as the parent for obj created by the Monkey constructor:

```
function Monkey(name, species) {}
```

For example we do something like this:

```
function Monkey(name, species) {
    this.name = name;
    this.species = species;
    this.foodEaten = [];
    this.eatSomething = (food) => {
        this.foodEaten.push(food);
    }
}

const spider = new Monkey('amanda', 'gorilla');
const cheeky = new Monkey('jack', 'orangotango');

spider.eatSomething('mango'), 
cheeky.eatSomething('coconut');

console.log(spider, cheeky);
```

>With this implementation if we had 1000 Monkey obj in the memory we are gooing also to have a 1000 copies of the `this.eatSomething()` method; which means we are wasting a lot of memories!


Luckly we know how `Inheritance` works: *when we access to a property/method on an object, JS engine first looks inside the obj itself and if it can't find that property/method will at the protoype*

Long-story-short we can take the `eatsomething()` out of the `Monkey` obj and put it in its prototype:

```
function Monkey(name, species) {
    this.name = name;
    this.species = species;
    this.foodEaten = [];
}

Monkey.prototype.eatSomething = function (food) {
    this.foodEaten.push(food);
};

const spider = new Monkey('amanda', 'gorilla');
const cheeky = new Monkey('jack', 'orangotango');

spider.eatSomething('mango');
spider.eatSomething('coconut');
console.log(spider, cheeky);
```

## Extras

### 1) `Object.keys()` vs `for(key in obj)`

if we do `Object.keys(spider)` this is the output:

```
["name", "species", "foodEaten"]
```

But if we do:

```
for (key in spider) {
    console.log(key);
}
```

in our console we can see:

```
name
species
foodEaten
eatSomething
```

> `Object.keys()` return only instances members while the second one returns both instances members and prototype.


### 2) Avoid extending the built-in Objects

You might be tempted to do something like this:

```
Array.prototype.shuffle = () => {
	// do something...
}

const myArr = [];
myArr.shuffle();

```

> **YOU SHOULD NOT MODIFIY THE BUILT-OIN OBJECTS!**

Because it's possible that tomorrow that you are gonna use a library and in that library someone has already extended the `shuffle()` but with a different implementation.


























































