---
layout: home
category: steps
before: 'step-01/'
next: 'step-03/'
solution: 'step-02/solution/'
title: Creating your first Vue.js app
---


In this step we are going to create our first Vue.js application, and use the databinding to add some dynamism to our beer list construction.


## Installing Vue.js

> If you don't have `npm` installed in your computer, you can simply skip this section and get your dependencies in the `node_modules` folder at the root of the repository. The solutions for each step do indeed use that folder, and the global `package.json` file.

In this step we are adding one dependency, to the Vue.js bundle. 
First you need to initialize a npm project at your `app` folder: 

```none
$ npm init
This utility will walk you through creating a package.json file.
It only covers the most common items, and tries to guess sensible defaults.

See `npm help json` for definitive documentation on these fields
and exactly what they do.

Use `npm install <pkg>` afterwards to install a package and
save it as a dependency in the package.json file.

Press ^C at any time to quit.
package name: (vue-beers) 
version: (1.0.0) 
description: Vue Beers - A Vue.js tutorial
entry point: (index.js) 
test command: 
git repository: https://github.com/LostInBrittany/vue-beers/
keywords: Vue.js, vue, beers, tutorial, beers tutorial
author: Horacio Gonzalez <horacio.gonzalez@gmail.com>
license: (ISC) Apache-2.0
[...]

```

It will generate a `package.json` configuration file:

```javascript
{
  "name": "vue-beers",
  "version": "1.0.0",
  "description": "Vue Beers - A Vue.js tutorial",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "repository": {
    "type": "git",
    "url": "git+https://github.com/LostInBrittany/vue-beers.git"
  },
  "keywords": [
    "Vue.js",
    "vue",
    "beers",
    "tutorial",
    "beers",
    "tutorial"
  ],
  "author": "Horacio Gonzalez <horacio.gonzalez@gmail.com>",
  "license": "Apache-2.0",
  "bugs": {
    "url": "https://github.com/LostInBrittany/vue-beers/issues"
  },
  "homepage": "https://github.com/LostInBrittany/vue-beers#readme"
}
```

Now you can install Vue.js as a node module for this project:

```none
$ npm install vue --save
npm notice created a lockfile as package-lock.json. You should commit this file.
+ vue@2.5.16
added 1 package from 1 contributor in 0.602s
```

> The `--save` is not necessary in recent versions of `npm`

In order to make your app prettier, install also the `bootstrap` package:

```none
$ npm install bootstrap
```

## Loading Vue.js

Now you need to load the Vue library in your application. You can do it
simply by using a `script` call:

```html
<script src='./node_modules/vue/dist/vue.js'></script>
```

or if you are using the global `node_modules folder, 
```html
<script src='../../node_modules/vue/dist/vue.js'></script>
```

Also add Bootstrap CSS:

```html
<link rel="stylesheet" href="./node_modules/bootstrap/dist/css/bootstrap.min.css">
```


## The Vue application

Now we are adding a vue application to our HTML page, and using it
to display the list of beers.

Every Vue application starts by creating a new Vue instance with the Vue function:

```javascript
let vm = new Vue({
  // options
})
```

When you create a Vue instance, you pass in an options object. A Vue application consists of a root Vue instance created with new Vue, optionally organized into a tree of nested, reusable components. 


## Our first Vue app

At the core of Vue.js is a system that enables us to declaratively render data to the DOM using straightforward template syntax. 

Let's begin by the HTML part of the app, i.e. un HTML avec un `id` that will be the anchor for the Vue app, inside of which you can use the *mustache* syntax (double curly braces) to bind data to the `data` object of the Vue application:

```html
{% raw %}
<div id="app">
  {{ message }}
</div>
{% endraw %}
```

 And then we can create a Vue app, with a `data` object where we declare the properties exposed by the application, and an `el` string defining the `id` of the HTML element that will be used to render the application:

```javascript
var app = new Vue({
  el: '#app',
  data: {
    message: 'Vue Beers'
  }
})
```  

We have already created our very first Vue app! This looks pretty similar to rendering a string template, but Vue has done a lot of work under the hood. The data and the DOM are now linked, and everything is now reactive. How do we know? Open your browser’s JavaScript console (right now, on this page) and set app.message to a different value. You should see the rendered example beneath update accordingly:

{% raw %}
<div class="demo">
    <div id='app-01'>
        {{message}}
    </div>
</div>


<script>
var app = new Vue({
    el: '#app-01',
    data: {
    message: 'Vue Beers',
    }
})
</script>
{% endraw %}  



## Data object

When a Vue instance is created, it adds all the properties found in its `data` object to Vue’s reactivity system. When the values of those properties change, the view will *react*, updating to match the new values.

In our case, the *data* for this step will have a JavaScript version of the current beer list:

```javascript
var app = new Vue({
    el: '#app',
    data: {
        message: 'Vue Beers',
        beers:[
            {
                alcohol: 8.5,
                name: "Affligem Tripel",
                description: "The king of the abbey beers. It is amber-gold and pours with a deep head and original aroma, delivering a complex, full bodied flavour. Pure enjoyment! Secondary fermentation in the bottle."
            },
            {
                alcohol: 9.2,
                name: "Rochefort 8",
                description: "A dry but rich flavoured beer with complex fruity and spicy flavours."
            },
            {
                alcohol: 7,
                name: "Chimay Rouge",
                description: "This Trappist beer possesses a beautiful coppery colour that makes it particularly attractive. Topped with a creamy head, it gives off a slight fruity apricot smell from the fermentation. The aroma felt in the mouth is a balance confirming the fruit nuances revealed to the sense of smell. This traditional Belgian beer is best savoured at cellar temperature "
            }
        ],        
    }
});
```
Let's say, for example, that we want to display the fist beer in the beer list. We can modify the HTML to show it:

```html
{% raw %}
<div class="demo">
    <div id='app'>
        <h1>{{ message }}</h1>
        <div>Beer 0 name: {{ beers[0].name }}</div>
    </div>
</div>
{% endraw %}
```

And you should get:

{% raw %}
<div class="demo">
    <div id='app-02'>
        <h1>{{ message }}</h1>
        <div>Beer 0 name: {{ beers[0].name }}</div>
    </div>
</div>


<script>
var app = new Vue({
    el: '#app-02',
    data: {
        message: 'Vue Beers',
        beers:[
            {
                alcohol: 8.5,
                name: "Affligem Tripel",
                description: "The king of the abbey beers. It is amber-gold and pours with a deep head and original aroma, delivering a complex, full bodied flavour. Pure enjoyment! Secondary fermentation in the bottle."
            },
            {
                alcohol: 9.2,
                name: "Rochefort 8",
                description: "A dry but rich flavoured beer with complex fruity and spicy flavours."
            },
            {
                alcohol: 7,
                name: "Chimay Rouge",
                description: "This Trappist beer possesses a beautiful coppery colour that makes it particularly attractive. Topped with a creamy head, it gives off a slight fruity apricot smell from the fermentation. The aroma felt in the mouth is a balance confirming the fruit nuances revealed to the sense of smell. This traditional Belgian beer is best savoured at cellar temperature "
            }
        ],        
    }
})
</script>
{% endraw %}  

So if we want to recreate the same list than in [previous step](../step-01), you can simply use the same syntax:

```html
{% raw %}
<div class="demo">
    <div id='app'>
        <h1>{{ message }}</h1>
        <ul>
            <li>
                <span>{{ beers[0].name }}</span>
                <p>{{ beers[0].description }}.</p>
            </li>
            <li>
                <span>{{ beers[1].name }}</span>
                <p>{{ beers[1].description }}.</p>
            </li>
            <li>
                <span>{{ beers[2].name }}</span>
                <p>{{ beers[2].description }}.</p>
            </li>
        </ul>
    </div>
</div>
{% endraw %}
```

And you have the same app:

{% raw %}
<div class="container demo">
    <div id='app-03'>
        <h1>{{ message }}</h1>
        <ul>
            <li>
                <span>{{ beers[0].name }}</span>
                <p>{{ beers[0].description }}.</p>
            </li>
            <li>
                <span>{{ beers[1].name }}</span>
                <p>{{ beers[1].description }}.</p>
            </li>
            <li>
                <span>{{ beers[2].name }}</span>
                <p>{{ beers[2].description }}.</p>
            </li>
        </ul>
    </div>
</div>


<script>
var app = new Vue({
    el: '#app-03',
    data: {
        message: 'Vue Beers',
        beers:[
            {
                alcohol: 8.5,
                name: "Affligem Tripel",
                description: "The king of the abbey beers. It is amber-gold and pours with a deep head and original aroma, delivering a complex, full bodied flavour. Pure enjoyment! Secondary fermentation in the bottle."
            },
            {
                alcohol: 9.2,
                name: "Rochefort 8",
                description: "A dry but rich flavoured beer with complex fruity and spicy flavours."
            },
            {
                alcohol: 7,
                name: "Chimay Rouge",
                description: "This Trappist beer possesses a beautiful coppery colour that makes it particularly attractive. Topped with a creamy head, it gives off a slight fruity apricot smell from the fermentation. The aroma felt in the mouth is a balance confirming the fruit nuances revealed to the sense of smell. This traditional Belgian beer is best savoured at cellar temperature "
            }
        ],        
    }
})
</script>
{% endraw %}

Well, it doesn't seem very exciting yet, does it? In the next step, [step-03](../step-03/), you will learn how to iterate on the `beers` property of the data object to automatically generate the beer list. 