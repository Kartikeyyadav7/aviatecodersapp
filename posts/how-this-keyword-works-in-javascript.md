---
title: THIS Keyword In JavaScript
description: Learn about one of the most notorious topics in Javascript  THIS
seoTitle: Understanding the "this" keyword in Javascript is important and most developers struggle with it, learn why it is useful and awesome
isPublished: true
publishedOn: "2021-04-08"
coverImage: "/blog/how-this-keyword-works-in-javascript/cover.png"
author: Kartikey Yadav
category: javascript
layout: blog
---

<!--StartFragment-->

Hey guys,

The 'this' keyword is one of the important concepts in JS and is used everywhere and so it becomes very important for us to understand "_this_"

But I know there is a lot of confusion regarding the "_this_" keyword and I did too when I was learning about it so don't worry it's ok if you don't understand it in the first go but I will try to hopefully make you understand what it is.

Let's start simple

I am assuming that you guys know what the "window" object because the "_this_" keyword is all revolving around objects and things like that so if you don't please learn about it here or anywhere else and come back

Now when you type in your console

```javascript
this === window; // true
```

This statement will be true,

So does that mean that the "_this_" keyword is just the window object and nothing else?

Well, you see the _"this"_ keyword depends on where it is written i.e in which object it is defined.

In whichever object it is defined it will refer to that particular object

Let's understand this a little better by an example

```javascript
function hello() {
	console.log(this);
}
hello(); // the output will be the window object
window.hello();
```

In the above example as you can see

We have made a function hello() and inside the function, we have console.log(this), what would be the result of it-

The output will be the window object, but how?

See the _"this"_ keyword always refers to the object in which it is defined so the

_"this"_ keyword is the object the function is property of"

Here as you can see the function hello is the property of the window object and if _"this"_ is used inside the function it will refer to the window object

As a tip always remember that whatever is to the right of the function of the method is the object the _"this"_ keyword is referring here as you can see window.hello() so to the left of hello, there is the window object and so the _"this"_ keyword is referring to the window object

Let's see another example

```javascript
const singer = {
	name: "Joy",
	sing() {
		return "ullaa " + this.name;
	},
};
singer.sing(); // ullaa Joy
```

By seeing this example I hope you might have understood it a little better for the explanation

First of all, here there we have made an object name "singer"

The object singer has two properties name and sing, we have used the _"this"_ keyword in the sing method

Now if you remember from the previous example the function was defined in the window object but here the function or method sing is defined inside the singer object so it's obvious that the _"this"_ keyword is referring to the singer object and if that's the case we can refer to the name as we would have like [singer.name](http://singer.name) similarly its [this.name](http://this.name) but inside the method

Here too you can apply our tip of seeing the left side of the method which is the singer object and it's what the _"this"_ keyword is referring to.

But here you might ask, hey it's all good and fine but what we could have just written the name directly, there was no use of using the _"this"_ keyword?

Well you see, the example I am taking here is very small but in the real world, there are tons of lines of code and we don't want to repeat each one because that will be very bad as you might know the DRY principle

Here is another example for you to understand better

```javascript
const singer = {
	name: "Joy",
	sing() {
		return "ullaa " + this.name;
	},
	singAgain() {
		return this.sing() + "hahaha";
	},
};
singer.sing(); // ullaa Joy
singer.singAgain(); // ulla Joy hahaha
```

Here as you can see it is the extension of the previous example

Now here I have used _"this"_ keyword to refer directly to the method sing now imagine if we had tons of lines of code in the sing function so it's correct to write all the code again the singAgain function, it's bad practice so that's why we use the _"this"_ keyword

So the two main important benefits of using the _"this"_ keyword are

1. Giving methods access to their objects
2. Executing the same code for the multiple objects

We have understood the first part in the above examples

Let's see the second part

```javascript
function helper() {
	console.log(this.name);
}

const name = "Jasprit";
const worker = {
	name: "Jessica",
	helper: helper,
};

const worker1 = {
	name: "Jason",
	helper: helper,
};

helper(); //Jasprit
worker.helper(); //Jessica
worker1.helper(); //Jason
```

So in the above example, first of all, we have defined the helper function once and when we made the object worker we wanted to use that helper function but instead of writing the function again we used the already defined just as it is because we knew that the _"this"_ keyword will refer to the object it is defined ( if you want to run the code do it the browser's console)

In the object worker, the _"this"_ keyword defined in the helper function is referring to the name Jessica and in worker1 it's referring to Jason and in the global object its referring to the global variable name - Jasprit

These things help us in saving time and many lines of codes and helps in writing DRY code

There are some extra concepts that we need to understand let's see them regarding the _"this"_ keyword. (might get a little advanced)

For the first concept, we need to understand what is the lexical scope and dynamic scope if you don't know let's see

> _In JS our lexical scope ( available data + variables where the function is defined) determines our available variables not where the function is called which is called dynamic scope_

What I mean here is in JS we have lexical scope the available data and variable are defined where the function is defined and it doesn't matter where the function is called which is dynamic scope

If you want to know more about the lexical scope check out this blog [](https://developersdomain.netlify.app/execution-context-lexical-environmenet-scope-chain)[here](https://www.aviatecoders.com/execution-context-lexical-environmenet-scope-chain)

But there is an exception to this rule which is that the _"this"_ keyword doesn't follow it

Let's see how

```javascript
const singer = {
	name: "Joy",
	sing() {
		console.log("1", this);
		var singAgain = function () {
			console.log("2", this);
		};
		singAgain();
	},
};

singer.sing();
```

Now what do you think will be the outcome of the first console.log( ) and the second one

Well, let's see if you want you can try and copy-paste the code in your console and see the results, if you know the result you might have been kind of amazed by the results,

OK let's check it out

The output of the first console.log( ) is object "singer" but the output of the second console.log( ) is the "window" object which is weird

But why see the function singAgain( ) is called inside the sing( ) function it is not called inside the object "singer" it is called inside the sing() function, and by default, the _"this"_ keyword is the window object

Now if you remember I wrote a statement above and said that the _"this"_ keyword is an exception to this rule which means that the " this" keyword is dynamically scoped and it doesn't matter where it is written but where the function is called.

But there are ways to tackle this problem

1. Using arrow function
2. Declaring _"this"_ keyword at the start and using the substitute in place of _"this"_
3. Using bind

Let's see each one by one

1.You might have heard that arrow function are lexically bound (please read about arrow functions if you don't know) and what that means is in ES6 we can use the arrow function to bind the _"this"_ keyword to that specific object

Using the previous example

```javascript
const singer = {
	name: "Joy",
	sing() {
		console.log("1", this);
		var singAgain = () => {
			console.log("2", this);
		};
		singAgain();
	},
};

singer.sing();
```

Here the first and the second console.log( ) will have the same value which is equal to the object "singer"

2.Redefining it let's see what I mean

```javascript
const singer = {
	name: "Joy",
	sing() {
		console.log("1", this);
		var self = this;
		var singAgain = function () {
			console.log("2", self);
		};
		singAgain();
	},
};

singer.sing();
```

As you can see from the above example we have stored the value of the _"this"_ keyword inside the variable self when it was still referring to the singer object and used the declared variable self instead of the _"this"_ keyword inside the singAgain function and it solves the issue kind of like Juggad

3.Using the Bind method

```javascript
const singer = {
	name: "Joy",
	sing() {
		console.log("1", this);
		var singAgain = function () {
			console.log("2", this);
		};
		return singAgain.bind(this);
	},
};

singer.sing()();
```

You might get a little confused if you don't know about the bind method, you read about it here but here we are just binding the _"this"_ keyword to the object "singer" and returning the function, but also notice that we have to call singer.sing( ) ( ) twice because then only it will return the second function

So these were a few things related to the _"this"_ keyword I know the last part might have got a little hard to understand as it uses other concepts too but doesn't worry if you don't understand when you learn about the arrow functions and bind method you will understand it eventually

I hope you understood the main concept of the _"this"_ keyword and what it is, always remember the line _"this"_ keyword is the object that the function is the property of" and it will remind you of the _"this"_ keyword, that's all for me

Was the article helpful? Do you have any doubts? Any topic you would like us to cover?

Reach out to us on [](https://twitter.com/kartikey_yadav7)[Twitter](https://twitter.com/aviatecoders) and [Instagram](https://instagram.com/aviatecoders) where we try to provide more value in threads and carousal formats

Thank You for your time

Keep learning, Keep coding :)

<!--EndFragment-->
