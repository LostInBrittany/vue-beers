---
layout: home
category: steps
before: 'step-06/'
next: 'step-08/'
solution: 'step-07/solution/'
title: Routing URLs using vue-router
---


What if we wanted to show more details about a beer when we click on it? We can imagine opening another panel with the detailed information.

As in Angular or Polymer, with Vue we get this behavior by using a router, and defining the routing conditions in the global application definition. And the official router for Vue is [vue-router](https://router.vuejs.org/en/), so we are going to use it.


## Installing vue-router

> As told in the [step 2](../step-02/) you don't have `npm` installed in your computer, you can simply skip this section and get your dependencies in the `node_modules` folder at the root of the repository. The solutions for each step do indeed use that folder, and the global `package.json` file.

Install vue-router as a node module for this project:

```
$ npm install vue-router --save
npm WARN bootstrap@4.1.0 requires a peer of jquery@1.9.1 - 3 but none is installed. You must install peer dependencies yourself.
npm WARN bootstrap@4.1.0 requires a peer of popper.js@^1.14.0 but none is installed. You must install peer dependencies yourself.

+ vue-router@3.0.1
added 1 package from 1 contributor in 0.709s
```


## Loading vue-router

Now you need to load the vue-router library in your application. You can do it
simply by using a `script` call:

```html
<script src='./node_modules/vue-router/dist/vue-router.js'></script>
```

or if you are using the global `node_modules folder, 
```html
<script src='../../node_modules/vue-router/dist/vue-router.js'></script>
```

## Defining the routes

We declare and initialize our router in our main file, before creating the Vue instance. 

We need:

1. Define route components. These can be imported from other files or defined locally. In our case it would be simply reuse the definitions of previous steps:

    ```javascript
    Vue.component('beer-list', VueBeers.beerList);
    Vue.component('beer-list-item', VueBeers.beerListItem);
    ```

1. Define some routes. Each route should map to a component. The "component" can either be an actual component constructor created via `Vue.component()`, or just a component options object. 

    In our case, we want two routes, one on `/` for the beer list, another on `/beer/:id` to get de details of a given beer.

    ```javascript
    const routes = [
        { path: '/', component: VueBeers.beerList },
        { path: '/beer/:id', component: VueBeers.beerList }
    ]
    ```    

1. Create the router instance and pass the `routes` option. You can pass in additional options here, but let's keep it simple for now.

    ```javascript
    const router = new VueRouter({
        routes // short for `routes: routes`
    })
    ```

1. Create and mount the root instance. Make sure to inject the router with the router option to make the whole app router-aware.    

    ```javascript
    var app = new Vue({
        el: '#app',
        data: {
            message: 'Vue Beers',
        },
        router,
    })
    ```

## Hyperlinking the beers

In order to get more details on a beer on `beer-list-item` when we click on its name, we need to put the name inside a `<router-link >` tag that will send us to the route corresponding to that beer:

```html
template: `
<div v-bind:id="id" class="clearfix">
    <router-link v-bind:to="detailUrl">
        <img class="float-right el-img" v-bind:src="imgUrl">
        <h2 class="el-name">{{name}}</h2>
        <p class="el-description">{{description}}</p>
        <p class="pull-right el-alcohol">Alcohol content: {{alcohol}}%</p>
    </router-link>
</div>
`,
```

Where `detailUrl` is a computed property:

```javascript
    computed: {
        imgUrl: function() {
            if (!this.img) {
                return;
            }
            return `../../data/beers${this.img}`;
        },
        detailUrl: function() {
            if (!this.id) {
                return '/';
            }
            return `/beer/${this.id}`
        }
    },
```

## Showing current choice

To keep the learning curve gentle, in the current step we are only showing messages informing use of what beer (if any) is currently selected.
Later in next step we will see how to show a different page when the beer detail is selected.

In the definition of the route for `/beer/:id` we can simply add an element on the fly:


```javascript
const routes = [
    { path: '/', component: VueBeers.beerList },
    { path: '/beer/:id', component: { 
        template: `
            <div>
                Here Here you will get the details for {{ $route.params.id }}
            </div>`
    }},
]
```

And we have a working router in our app!


{% include step-07/step-07_01.html %}

In [step 8](../step-08/) we will create a component to display the detail of each beer.
    