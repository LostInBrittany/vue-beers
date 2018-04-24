---
layout: home
category: steps
before: 'step-05/'
next: 'step-07/'
solution: 'step-06/solution/'
title: Calling the server
---


Enough of building an app with five beers in a hard-coded dataset! Let's fetch a larger dataset from our server using one the power of [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API).

## Data ##

Our new dataset is now a list of 11 beers stored in JSON format in the `data/beers/beers.json`, available to your browser at the URL `http://127.0.0.1:8000/data/beers/beers.json` or simply <a href="{{ site.baseurl }}/data/beers/beers.json" target="_blank">here</a>.

`app/beers/beers.json`:

```javascript
[
  ...
  {
    "alcohol": 6.8,
    "description": "A reddish-brown abbey ale brewed with dark malts. The secondary fermentation gives a fruity aroma and a unique spicy character with a distinctive aftertaste. Secondary fermentation in the bottle.",
    "id": "AffligemDubbel",
    "img": "beers/img/AffligemDubbel.jpg",
    "name": "Affligem Dubbel"
  },
  ...
]
```

## The Fetch API


We will use the  Fetch API to make an HTTP request to your web server to fetch the data in the `app/beers/beers.json` file. The Fetch API is an interface for fetching resources (including across the network). It will seem familiar to anyone who has used XMLHttpRequest, but the new API provides a more powerful and flexible feature set.

We want to load the list of beers at the loading of `beer-list` component. We can use the `created` lifecycle hook to do the fetch. As the fetch operation is asynchrone, we use the `async / await` syntax on the `created` hook:

```javascript
created: async function() {
    let fetchResult
    fetchResult = await fetch('../../data/beers/beers.json');
    if (fetchResult.status == 200) {
        this.beers = await fetchResult.json();
    }
},
```

And now we get the full list of beers:

{% include step-06/step-06_01.html %}


## Showing more information

As now we recover more information for each beer (an id and an image URL), we are going to modify `beer-list-item` element to show it.

We begin by adding the missing properties to `props`:

```javascript
props: [ 'name', 'description', 'alcohol', 'id', 'img' ],
```

Then we modify the template:

```html
<div v-bind:id="id" class="clearfix">
    <img class="float-right el-img" v-bind:src="imgUrl">
    <h2 class="el-name">{{name}}</h2>
    <p class="el-description">{{description}}</p>
    <p class="pull-right el-alcohol">Alcohol content: {{alcohol}}%</p>
</div>
```

And add the missing information in `beer-list`:

```html
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
```

Now we can add some CSS styles to make it look well, and see the result:


{% include step-06/step-06_02.html %}


Now that you have loaded beer data from a server-side JSON file, go to [step 7](../step-07/) to learn how to add the details of each beer.