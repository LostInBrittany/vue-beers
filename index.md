---
# You don't need to edit this file, it's empty on purpose.
# Edit theme's home layout instead if you wanna make some changes
# See: https://jekyllrb.com/docs/themes/#overriding-theme-defaults
layout: home
title: Vue Beers - A Vue.js tutorial
---


*A work-in-progress tutorial for Polymer based on my [Angular Beers](https://github.com/LostInBrittany/angular-beers) and  [Polymer Beers](https://github.com/LostInBrittany/polymer-beers) tutorial*    

![Logo]({{ "/img" | prepend: site.baseurl }}/logo-500px.png)


I have built this [Vue Beers](https://lostinbrittany.github.com/vue-beers) tutorial as a quick entry point to [Vue.js](https://vuejs.org/). I've based it on a similar tutorial I did for [Angular](https://angular.io/) and [Polymer](https://www.polymer-project.org/), [Angular Beers](https://github.com/LostInBrittany/angular-beers) and  [Polymer Beers](https://github.com/LostInBrittany/polymer-beers).  

For the last several years, I've taught a web-development module in an Engineering School with a rather restrictive network. As I plan to use this tutorial in next year module, in order to explain Vue.js to our students, I needed a tutorial that could be played without network acces, i.e. without npm. So *Vue Beers* needed to be able to be done even behind a very restrictive proxy, and all the dependencies are included inside the git project.


## What are the objectives of this tutorial ##

Follow the tutorial to learn the bases of [Vue.js](https://vuejs.org/), a progressive framework for building web applications. You will:

- See examples of how to use client-side data binding to build dynamic views of data that change immediately in response to user actions.
- See how Vue.js keeps your views in sync with your data without the need for DOM manipulation.
- Learn how to build technical elements to make common web tasks, such as getting data into your app, easier.

When you finish the tutorial you will be able to:

- Create a dynamic application that works in all modern browsers.
- Create custom elements, with its looks and its behaviour encapsulated inside, setting the bases of a true component architecture client-side
- Use data binding to wire up your data model to your views.
- Get data from a server
- Use [vue-router](https://router.vuejs.org/en/), the official routing library, to add multipage capabilities to your application

The tutorial guides you through the entire process of building a simple application. Experiments at the end of each step provide suggestions for you to learn more about Polymer and the application you are building.

You can go through the whole tutorial in a couple of hours or you may want to spend a pleasant day really digging into it. If you're looking for a shorter introduction to Vue.js, check out the official website.

## What do I need to use this tutorial? ##

Besides a web browser and a text-editor (we suggest the excellent [Sublime Text](http://www.sublimetext.com/)), you will only need a web-server to test your code.

If you have Python in your system, the easiest way would be to run the embeded SimpleHTTPServer. Go to the project directory and run

```
# Python 2.x
python -m SimpleHTTPServer
```

or 

```
# Python 3.x
python -m http.server
```

to start the web server. Now, open a browser window for the app and navigate to http://localhost:8000/app/index.html to see the current state of the app.

If you have [NodeJS](http://nodejs.org) in your system, we have put a minimalist JavaScript web-server on `./scripts/web-server.js`. To see the app running in a browser, open a separate terminal/command line tab or window, go to the project directory and then run `node ./scripts/web-server.js` to start the web server. Now, open a browser window for the app and navigate to http://localhost:8000/app/index.html to see the current state of the app.


## How is the tutorial organized ##

As the computers used for the course haven't Git, we have structured the project to allow a Git-less use. The `app` directory is the main directory of the project, the working version of the code. The tutorial is divided in steps, each one in its own directory:

1. [Let's begin with some static HTML](./step-01/)
1. [Creating your first Vue.js app](./step-02/)
1. [A component to iterate the list](./step-03/)
1. [Filtering](./step-04/)
1. [Sorting](./step-05/)
1. [Calling the server](./step-06/)
1. [Routing URLs using vue-router](./step-07/)
1. [Displaying beer details](./step-08/)

In each step directory you have a README file that explain the objective of the step, that you will do in the working directory `app`. If you have problems or if you get lost, you also have the solution of each step in a `solution` folder inside the the step folder. So if you want to see the intended result of the 6th step, you can point your browser to http://localhost:8000/step-06/solution/index.html

## What should I do now?  ##

OK, now you're ready to follow this tutorial. If you're familiar with git, begin by cloning this repository (`git clone https://github.com/LostInBrittany/vue-beers`), else you can simply download the zipped file from [GitHub](https://github.com/LostInBrittany/vue-beers/archive/master.zip).

Now can go to [step-01](./step-01) and begin to follow the README of that step. 

Let's begin!
