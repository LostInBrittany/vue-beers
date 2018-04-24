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
    <p class="description">{{beer.description}}</p>

    <ul class="beer-thumbs">
    <li>
        <img v-bind:src="beerImg">
    </li>
    <li>
        <img v-bind:src="beerLabel">
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
    getBeerDetails($route.params.id);
}
```


## Reacting to Params Changes

One thing to note when using routes with params is that when the user navigates from `/beer/AffligemBlond` to `/beer/Rochefort8`, the same component instance will be reused. Since both routes render the same component, this is more efficient than destroying the old instance and then creating a new one. However, this also means that the lifecycle hooks of the component will not be called.

To react to params changes in the same component, you need to `watch` the `$route` object and query again the server to get the details:


```javascript
  watch: {
    '$route' (to, from) {
        getBeerDetails(to.params.id);
    }
  }
```

## Gettin the beer details

To get the details of a beer whose `id` is `xxx` we need to recover the file `{{site.baseurl}}/data/beers/details/xxx.json`. In the `getBeerDetails` method we are going to use again the Fetch API to recover the data, and initialise the `beer` data object with the details:

```javascript
   methods: {
        getBeerDetails: async function(id) {
            let fetchResult
            fetchResult = await fetch(`../../data/beers/details/${id}.json`);
            if (fetchResult.status == 200) {
                this.beer = await fetchResult.json();
            }
        },
    },
```

## Computed properties

In the details we want to display images for both the bottle and the label of the beer. In the JSON data we have a relative path for these images in `beer.img` and `beer.label`, but we need to adapt them to our application. The simplest way to do it is using two computed properties, `imgUrl` and `labelUrl`:

```javascript
    computed: {
        imgUrl: function() {
            if (!this.beer.img) {
                return;
            }
            return `../../data/${this.beer.img}`;
        },
        labelUrl: function() {
            if (!this.beer.label) {
                return;
            }
            return `../../data/${this.beer.label}`;
        },
    },
```

## Displaying the big picture

The two former images are thumbnails, and we would like to show a big version of them when they are clicked. Let's begin by adding a big picture to our template:


```html
<h1 class="name">{{beer.name}}</h1>

<img class="pull-right img" v-bind:src="mainImg">

<p class="description">{{beer.description}}</p>
```

We declare `mainImg` as a `data` member, with an empty string as initial value. We want the image to show the bottle image by default, so we set `mainImg` jut after recovering the beer details:

```javascript
    data: function() {
        return {  
            beer: {}, 
            mainImg: null,
        };
    },
    [...]
    methods: {
        getBeerDetails: async function(id) {
            let fetchResult
            fetchResult = await fetch(`../../data/beers/details/${id}.json`);
            if (fetchResult.status == 200) {
                this.beer = await fetchResult.json();
            }
            this.mainImg = `../../data/${this.beer.img}`;
        },
    },
```

Then we need to listen for the `click` event on the two thumbnail images. 
In Vue we can do it with the `v-on` directive:

```html
<ul class="beer-thumbs">
    <li>
        <img v-bind:src="imgUrl" 
            v-on:click="setImage(beer.img)">
    </li>
    <li>
        <img 
            v-bind:src="labelUrl" 
            v-on:click="setImage(beer.label)">
    </li>
</ul>
```

```javascript
    methods: {
        setImage: function(img) { 
            this.mainImg = `../../data/${img}`;
        },
    },

```