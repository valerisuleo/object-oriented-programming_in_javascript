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