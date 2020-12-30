// EXERCISE - StopWatch With constructor

function StopWatch(startFrom) {
    this.count = startFrom;
    this.counters = [];

    this.start = function () {
        this.interval = setInterval(() => {
            this.count = this.count + 1;
            this.counters.push(this.count);
        }, 1000);
    }

    this.pause = function () {
        console.log(this.counters.length);
        clearInterval(this.interval);
    }

    this.reset = function () {
        this.count = 0;
        this.counters = [];
        this.pause();
    }
}

const sw = new StopWatch(0);
