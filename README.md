# Getting Started


## What's O.O.P.?

*A programming paradigm centered around objects rather than functions*

*Angular* is an example of a framework designed keeping in mind OOP.

## The 4 Pillars of O.O.P.

1. **Encapsulation**

	In OOP we group related variable and `fn` into obj; and this is 	what we call *Encapsulation*
	
	```
	// We refer to this kind of implementation as "procedural"
	const salary = 30;
	const overtime = 10;
	const rate = 20;
	
	function getWage(salary, overtime, rate) {
	    return salary + (overtime * rate);
	}
	
	// OOP implementation
	const employee = {
	    salary: 30,
	    overtime: 10,
	    rate: 20,
	    getWage: function () {
	        return this.salary + (this.overtime * this.rate);
	    }
	};
	
	employee.getWage();
	```
	
	> Why is this better?
	
	As we can see we don't have any arg inside 
	
	```
	 getWage: function () {
	        return this.salary + (this.overtime * this.rate);
	    }
	```

	*The best fn are those with no paramaters* - Uncle Bob.

2. **Abstraction**

	Let's think of a dvd player: outside we have only few `btn` to interact with it while all the complexity is hidden inside the box. This is Abstraction in practice.
	
	We can use the same idea in obj: we can hide some properties and methods to the outside and this gives us some benefits:
	
	1. Simpler Interface
	2. Reduce the impact of change


3. **Inheritance**

	Allow us to remove redundant code. 

4. **Polymorphism**


	Allow us to get rid of long `if/else` statement.
	
	If you want to render our `HTMLElements` in a *procedural* this is how it might looks:
	
	```
	
	switch (...) {
	    case 'select': renderSelect();
	    case 'input': renderinput();
	    case 'checkbox': rendercheckbox();
	}
	
	```
	
	but with OOP we can avoid the ugly code above and use one line code like this `element.render()`
































