---
layout: home
category: steps
before: 'step-07/'
solution: 'step-08/solution/'
title: Displaying beer details
---

Now we are going to have two different "pages" (or *views*) in our Vue Beers application, one for the beer list and another for a single beer detail.

## Beer detail component

We are going to create a `beer-detail` component that calls to a *beer details* service (or in these case, a set of *beer details* JSON files) to recover and show more information on the chosen beer.

The template includes more beer properties, found in the detailed JSON file for each beer. We will use the Fetch API to get the file according to the beer id.

```html
template: `
<div v-bind:id="beer.id" class="detail clearfix">
    <a href="#/beers"><img class="pull-right back" src="./img/back.png"></a>
    <h1 class="name">{{beer.name}}</h1>
    <img class="pull-right img" v-bind:src="mainImg">
    <p class="description">{{beer.description}}</p>

    <ul class="beer-thumbs">
    <li>
        <img v-bind:src="beerImg" on-click="setImage">
    </li>
    <li>
        <img v-bind:src="beerLabel" on-click="setImage">
    </li>
    </ul>
    <ul class="specs">
    <li>
        <dl>
        <dt>Alcohol content</dt>
        <dd>{{beer.alcohol}}%</dd>
        </dl>
    </li>
    [...]
    </ul>
</div>
`;
```

We define a `beer` object in the `data`:

```javascript
data: function() {
    return {  
        beer: {}, 
    };
},
```

And in order to get the details on the current beer as soon as possible, 
you can query the server from the `mounted` lifecycle hook:

```javascript
mounted: function() {
    getBeerDetils($route.params.id);
}
```


## Reacting to Params Changes

One thing to note when using routes with params is that when the user navigates from `/beer/AffligemBlond` to `/beer/Rochefort8`, the same component instance will be reused. Since both routes render the same component, this is more efficient than destroying the old instance and then creating a new one. However, this also means that the lifecycle hooks of the component will not be called.

To react to params changes in the same component, you need to `watch` the `$route` object and query again the server to get the details:


```javascript
  watch: {
    '$route' (to, from) {
        getBeerDetils(to.params.id);
    }
  }
```