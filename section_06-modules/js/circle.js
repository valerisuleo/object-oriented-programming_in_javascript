const _radius = new WeakMap();

class Circle {
    constructor(radius) {
       _radius.set(this, radius);
    }

    draw() {
        return _radius.get(this);
    }

}

module.exports = Circle;