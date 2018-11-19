---
layout: home
category: steps
before: 'step-08/'
solution: 'step-09/solution/'
title: Single File Components
---

For the moment we have defined our components using `Vue.component`. This works well for small to medium-sized projects. In more complex projects however, or when your frontend is entirely driven by JavaScript, these disadvantages become apparent:

- Global definitions force unique names for every component
- String templates lack syntax highlighting and require ugly slashes for multiline HTML
- No CSS support means that while HTML and JavaScript are modularized into components, CSS is conspicuously left out
- No build step restricts us to HTML and ES5 JavaScript, rather than preprocessors like Pug (formerly Jade) and Babel

All of these are solved by single-file components with a `.vue` extension, made possible with build tools such as Webpack or Browserify, or in our case http-vue-loader.

Here’s an example of a file we’ll call Hello.vue:

```html
<template>
  <p>{{ greeting }} World!</p>
</template>

<script>
export default  {
  data: function () {
    return {
      greeting: 'Hello'
    }
  }
}
</script>

<style scoped>
p {
  font-size: 2em;
  text-align: center;
}
</style>
```

## Using `http-vue-loader`

Usually using single file `.vue` components implies using a build system, as [Webpack](https://webpack.js.org/),
but in this tutorial we want to keep things simple, so in this step we are compiling the `.vue` files directly in the browser using [`http-vue-loader`](https://github.com/FranckFreiburger/http-vue-loader). Please don't do it in production, people!

### Installing `http-vue-loader`

Install `http-vue-loader` using `npm` on the root folder of the tutorial:

```none
$ npm install http-vue-loader
```

### Loading `http-vue-loader`

In your `index.html`, after loading `vue`, load `http-vue-loader`:

```html
  <script src='../../node_modules/http-vue-loader/src/httpVueLoader.js'></script>
```

### Load `.vue` files

Now you can directly load the `.vue` files using the `httpVueLoader` function:

```js
new Vue({
    components: {
        'my-component': httpVueLoader('my-component.vue')
    },
});
```

## Optional tooling: the Vetur extension for VS Code

If you're using VS Code as IDE, you should now install the [Vetur extension](https://marketplace.visualstudio.com/items?itemName=octref.vetur), that will add useful things like syntax-highlighting or auto-completion to your `.vue` files.

## From `beer-list.js` to `BeerList.vue`

Let's change the `beer-list` component to a single file `BeerList.vue` component:

1. Put the `template` (whithout any style information) in a `<template>` tag:

    ```html
    <template>
      <div class="container">
          <div class="row">
              <div class="sidebar col-md-3">
                  <div>Search:</div> 
                  <div>
                      <input id="searchInput" 
                          class="searchInput" 
                          v-model="filterText">
                  </div>
                  <div>  
                  Sort by: 
                  <select v-model="criterium">
                      <option 
                              v-for="item in criteria"  
                              v-bind:value="item.name">
                          {{item.label}}
                      </option>
                  </select>
                  <div>
                      <input 
                          type="checkbox" 
                          v-model="descendingSort" 
                          name="sortingOrder"> 
                      Descending sort
                  </div>
              </div>
              </div>
              <div class="col-md-9">
                  <div class="beers">
                      <div class="beer" 
                              v-for="beer in filteredAndSorted(beers,filterText,criterium,descendingSort)">
                          <beer-list-item 
                              v-bind:id='beer.id'
                              v-bind:img='beer.img'
                              v-bind:name='beer.name'
                              v-bind:alcohol='beer.alcohol'
                              v-bind:description='beer.description'>
                          </beer-list-item>
                      </div>
                  </div>
              </div>
          </div>
      </div> 
    </template>
    ```

1. Put the style in a `<style>` tag (nothing in our case, as we have no personalized style):

    ```html
    <style>
    </style>
    ```

1. Let's build the `<script>` part our our component, putting the remaining definition of your component in a `module.exports` in the `<script>` tag:

    ```html
    <script>
      module.exports =  {
        data: function() {
          return {
            criteria: [
              { name: "name", label: "Alphabetical" },
              { name: "alcohol", label: "Alcohol content" }
            ],
            criterium: "",
            descendingSort: false,
            filterText: "",
            beers: []
          };
        },
        methods: {
          filteredAndSorted: function(beers, filterText, criterium, descendingSort) {
            let coef = descendingSort ? -1 : 1;
            return this.filteredList(beers, filterText).sort((a, b) => {
              if (a[this.criterium] === b[this.criterium]) return 0;
              if (a[this.criterium] < b[this.criterium]) return -1 * coef;
              if (a[this.criterium] > b[this.criterium]) return 1 * coef;
            });
          },
          filteredList: function(beers, filterText) {
            if (!filterText) {
              return [...beers];
            }
            return beers.filter(beer => {
              return beer.name.match(new RegExp(filterText, "i"));
            });
          }
        },
        created: async function() {
          let fetchResult;
          fetchResult = await fetch("../../data/beers/beers.json");
          if (fetchResult.status == 200) {
            this.beers = await fetchResult.json();
          }
        },
        mounted: function() {
          this.criterium = this.criteria[0].name;
        }
      };
    </script>
    ```

Now in your `index.html` you don't load `beer-list.js` anymore, and you declare the `BeerList` component using `http-vue-loader`:

```js
    // 1. Define route components.
    // These can be imported from other files
    Vue.component('beer-list', httpVueLoader('./components/BeerList.vue'));
    Vue.component('beer-list-item', VueBeers.beerListItem);
    Vue.component('beer-details', VueBeers.beerDetails);

    // 2. Define some routes
    // Each route should map to a component. The "component" can
    // either be an actual component constructor created via
    // `Vue.extend()`, or just a component options object.
    // We'll talk about nested routes later.
    const routes = [
        { path: '/', component: httpVueLoader('./components/BeerList.vue')},
        { path: '/beer/:id', component: VueBeers.beerDetails},
    ]

    // 3. Create the router instance and pass the `routes` option
    // You can pass in additional options here, but let's
    // keep it simple for now.
    const router = new VueRouter({
        routes // short for `routes: routes`
    })
```

Then you can do the same thing with all the other components (`BeerDetails` and `BeerListItem`).
