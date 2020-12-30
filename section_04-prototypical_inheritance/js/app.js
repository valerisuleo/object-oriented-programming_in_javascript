// ________________________MONKEY________________________
function Monkey(name, species) {
    this.subspecies = name;
    this.species = species;
    this.foodEaten = [];
}

extend(Monkey, Hunting);

Monkey.prototype.greeting = function () {
    console.log('amanda says: Hello');
}


// ________________________PANTHERA________________________
function Panthera(name, species, color) {
    this.subspecies = name;
    this.species = species;
    this.foodEaten = [];
    Hunting.call(this, color);
}
extend(Panthera, Hunting);

Panthera.prototype.greeting = function () {
    console.log('sharekhan says: Hello');
}

// ________________________SHARED________________________
function Hunting(color) {
    this.color = color;
}

function Greet() {
}

function extend(Child, Parent) {
    Child.prototype = Object.create(Parent.prototype);
    Child.prototype.constructor = Child;
}

Hunting.prototype.eatSomething = function (food) {
    this.foodEaten.push(food);
};

Greet.prototype.greeting = function () {
    console.log('Hello');
}

// ________________________INVOKE________________________

const amanda = new Monkey('golden monkey', 'C. kandti');
const sharekhan = new Panthera('bengal tiger', 'P. tigris', 'red');

const zoo = [];
zoo.push(amanda, sharekhan);

zoo.forEach(animal => {
    animal.greeting();
});

amanda.eatSomething('mango');
sharekhan.eatSomething('amanda');
// console.log(amanda, sharekhan);


function mixins(target, ...resources) {
    Object.assign(target, ...resources)
}


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
const canSwim = {
    swim: () => {
        console.log('swim');
    }
}

function Person() {

}

mixins(Person.prototype, canEat, canWalk);

const mark = new Person();



const person = Object.assign({}, canEat, canWalk);

