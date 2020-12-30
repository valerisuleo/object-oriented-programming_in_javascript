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
cheeky.eatSomething('coconut');
console.log(spider, cheeky);


console.log(Object.keys(spider));

for (key in spider) {
    console.log(key);
}