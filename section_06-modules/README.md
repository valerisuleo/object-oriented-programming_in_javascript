# ES6 Modules

In this section...

- Modules
- Tooling


## Modules

In the examples so fr we have written the code in just one file. This is not scalable a really hard to maintain. We should split our code into multiples files and we call those files **Modules**.

>What are the benefifts of using modules?

1. Maintanability
2. Reuse
3. Abstract

### CommonJS Modules 

This is what we use in *node.js*

1. `touch circle.js`

	```
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
	```


2. Back to `/app.js`

	```
	const Circle = require('./circle');
	const myCircle = new Circle(1);
	
	console.log(myCircle.draw());
	```

3. From the terminal: `node app.js`

Brilliant in the console we can see the value for radius!

### ES6 Modules

```
<!--CIRCLE.JS-->
const _radius = new WeakMap();

class Circle {
    constructor(radius) {
       _radius.set(this, radius);
    }

    draw() {
        return _radius.get(this);
    }
}

// module.exports = Circle;
export default Circle;



<!--APP.JS-->
// const Circle = require('./circle');
import Circle  from './circle.js';


const myCircle = new Circle(1);
console.log(myCircle.draw());
```

Now if we look at the console in chrome we'll see: 
<p style="color:red">Uncaught SyntaxError: Cannot use import statement outside a module</p>

>How can we fix this?

Back to `index.html` we need to change `<script src="js/app.js" charset="utf-8"></script>` with 
`<script type="module" src="js/app.js" charset="utf-8"></script>`.

>By adding `type="module"` JS treats `app.js` as module.



## Tooling

When we use JS we need 2 tools:

![](https://www.dropbox.com/s/h7gdcy5f7d3hzof/Screenshot%202020-12-29%20at%2019.54.26%20%282%29.png?raw=1)

![](https://www.dropbox.com/s/6fom6oyxs8syi8m/Screenshot%202020-12-29%20at%2019.55.34%20%282%29.png?raw=1)

Bundler is reponsible for combining all JS into a single file which we call *bundle*. Bundler minify our code, remove white spaces and ugly comments in order to reduce the size of the *bundle* that we serve to the client. The most famous module bundler is **Webpack** 

![](https://www.dropbox.com/s/5s4k2xl5t5piboa/Screenshot%202020-12-29%20at%2019.56.33%20%282%29.png?raw=1)

### Babel

*Note* I lost all my notes. Updates are coming soon!

### Webpack

- `sudo npm i -g webpack webpack-cli @webpack-cli/init`
- `npx webpack-cli init`

```
? Will your application have multiple bundles? No
? Which will be your application entry point? ./src/index
? In which folder do you want to store your generated bundles? dist
? Will you use one of the below JS solutions? ES6
? Will you use one of the below CSS solutions? No
    force .yo-rc.json
   create package.json
identical src/index.js
   create README.md
identical .babelrc
npm WARN my-webpack-project@1.0.0 No repository field.
npm WARN my-webpack-project@1.0.0 No license field.

```

This will generate our new *webpack configuration file*!

Also it automatically installed *Babel* to transpile our code into *es5*. 

```
+ webpack-cli@4.3.0
+ terser-webpack-plugin@5.0.3
+ @babel/preset-env@7.12.11
+ babel-loader@8.2.2
+ webpack@5.11.1
+ babel-plugin-syntax-dynamic-import@6.18.0
+ @babel/core@7.12.10

```

- `npm run buid`: it will create the *dist* folder which is where the bundle file `main.js` will be hosted.

- back to `/index.html` <s>`src="src/index.js"`</s> with `src="dist/main.js"`

- Now if we "go live" we should see in the console the value for radius which is `1`;



#### Tips

Need live reload?

go to `package.json` and add `-w` which stands for *watch*:

```
"scripts": {
    "build": "webpack -w"
  },
```





















