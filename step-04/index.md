---
layout: home
category: steps
before: 'step-03/'
next: 'step-05/'
solution: 'step-04/solution/'
title: Filtering the list
---

We did a lot of work in laying a foundation for the app in the last step, so now we'll do something simple: we will add full text search (yes, it will be simple!).


## Modifying `beer-list` template

We use [Twitter Bootstrap](http://getbootstrap.com) column model to divide the page in two (fully responsive) columns, the left one for the search box, the right one for the beer list.

We need to add a standard HTML `<input>` tag, give them some magical data-binding properties and adding a filtering function to the `v-for` to show only the searched results.

This lets a user enter search criteria and immediately see the effects of their search on the beer list.  

Let's begin by modifying the template to add the search input.

```html
<div class="container">
    <div class="row">
        <div class="col-md-3">
        <!--Sidebar content-->
        <div>Search:</div> 
        <div><input id="searchInput"></div>
        </div>
        <div class="col-md-9">
            <div class="beers">
                <div class="beer" v-for="beer in beers">
                    <beer-list-item 
                        v-bind:name='beer.name'
                        v-bind:description='beer.description'>
                    </beer-list-item>
                </div>
            </div>
        </div>
    </div>
</div>  
```


## Two-ways data-binding

Now we need to link the search input field value to a property of the object.

First we begin by declaring `filterText` as a internal state variable for the component, i.e. we put it in the `data` object:

```javascript
data: function() {
    return { 
        filterText: '',   
        [...]
    };
}
```

In the template we use value to link the `input` event of the `input` item to the `filterText` data property, and we add a label under it to show the current value of `filterText`:

```html
{% raw %}
<div class="col-md-3">
    <!--Sidebar content-->
    <div>Search:</div> 
    <div>
        <input id="searchInput" v-model="filterText">
    </div>    
    <div>
        <div>Current search:</div>
        <div>{{filterText}}</div>
    </div>
</div>
{% endraw %}
```

when testing that you will learn that Vue.js templates need to have a single main tag, not two, so you will need to rewrite your whole template:

```html
<div class="container">
    <div class="row">
        <div class="col-md-3">
            <div>Search:</div> 
            <div>
                <input id="searchInput" v-model="filterText">
            </div>
            <div>
                <div>Current search:</div>
                <div>{{filterText}}</div>
            </div>
        </div>
        <div class="col-md-9">
            <div class="beers">
                <div class="beer" 
                        v-for="beer in beers">
                    <beer-list-item 
                        v-bind:name='beer.name'
                        v-bind:description='beer.description'>
                    </beer-list-item>
                </div>
            </div>
        </div>
    </div>
</div> 
```

And now we have a two-way data-binding between the input field and the label under it.

{% raw %}


<div class="container demo">
    <div id='app-04_01'>
        <h1>{{ message }}</h1>
        <beer-list></beer-list>
    </div>
</div>
    
<script>
    if (!window.VueBeers) {
    window.VueBeers = {};
}

window.VueBeers.beerList04_01 = {
    data: function() {
        return { 
            filterText: '',   
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
        };
    },
    template: `
    <div class="container">
        <div class="row">
            <div class="sidebar col-md-3">
                <div>Search:</div> 
                <div>
                    <input id="searchInput" v-model="filterText">
                </div>
                <div>
                    <div>Current search:</div>
                    <div>{{filterText}}</div>
                </div>
            </div>
            <div class="col-md-9">
                <div class="beers">
                    <div class="beer" v-for="beer in beers">
                        <beer-list-item 
                            v-bind:name='beer.name'
                            v-bind:description='beer.description'>
                        </beer-list-item>
                    </div>
                </div>
            </div>
        </div>
    </div> 
    `,
};

window.VueBeers.beerListItem04_01 = {
    data: function() {
        return {   
        };
    },
    props: [ 'name', 'description' ],
    template: `
    <div class="beer">
        <span>{{ name }}</span>
        <p>{{ description }}.</p>
    </div>
    `,
};


Vue.component('beer-list', VueBeers.beerList04_01);
Vue.component('beer-list-item', VueBeers.beerListItem04_01);
var app = new Vue({
    el: '#app-04_01',
    data: {
        message: 'Vue Beers',
    }
});

</script>

<style>
    #searchInput {
        max-width: 100%;
        width: 100%;
    }
    .sidebar {
        margin-bottom: 2rem;
    }
    .container {
        max-width: 100%;
    }
</style>
{% endraw %}


## Adding a filter to the list

Now we want to use that `filterText` property to filter the list. 

In order to do it we can use a `filteredText` depending on `filterText`. The methods of a Vue component are called everytime the depending properties change. 

So we add a `filteredText` object to our `beer-list` component options:

```javascript
methods: {
    filteredList: function (beers,filterText) {
        if (!filterText) {
            return  [ ... beers];;
        }
        return beers.filter( (beer) => {
            return beer.name.match(new RegExp(filterText, 'i'));
        })
    }
},
```

And in the `v-for` directive, we iterate on the filtered list:

```html
<div class="beer" v-for="beer in filteredList(beers, filterText)">
    <beer-list-item 
        v-bind:name='beer.name'
        v-bind:description='beer.description'>
    </beer-list-item>
</div>
```

And now we have a working filter for our beers!

{% raw %}


<div class="container demo">
    <div id='app-04_02'>
        <h1>{{ message }}</h1>
        <beer-list></beer-list>
    </div>
</div>
    
<script>
    if (!window.VueBeers) {
    window.VueBeers = {};
}

window.VueBeers.beerList04_02 = {
    data: function() {
        return { 
            filterText: '',   
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
        };
    },  
    methods: {
        filteredList: function (beers, filterText) {
            if (!filterText) {
                return [ ... beers];
            }
            return beers.filter( (beer) => {
                return beer.name.match(new RegExp(filterText, 'i'));
            })
        }
    },
    template: `
    <div class="container">
        <div class="row">
            <div class="sidebar col-md-3">
                <div>Search:</div> 
                <div>
                    <input id="searchInput04_02" v-model="filterText">
                </div>
                <div>
                    <div>Current search:</div>
                    <div>{{filterText}}</div>
                </div>
            </div>
            <div class="col-md-9">
                <div class="beers">
                    <div class="beer" 
                            v-for="beer in filteredList(beers,filterText)">
                        <beer-list-item 
                            v-bind:name='beer.name'
                            v-bind:description='beer.description'>
                        </beer-list-item>
                    </div>
                </div>
            </div>
        </div>
    </div> 
    `,
};

window.VueBeers.beerListItem04_02 = {
    data: function() {
        return {   
        };
    },
    props: [ 'name', 'description' ],
    template: `
    <div class="beer">
        <span>{{ name }}</span>
        <p>{{ description }}.</p>
    </div>
    `,
};


Vue.component('beer-list', VueBeers.beerList04_02);
Vue.component('beer-list-item', VueBeers.beerListItem04_02);
var app = new Vue({
    el: '#app-04_02',
    data: {
        message: 'Vue Beers',
    }
});

</script>

<style>
    #searchInput04_02 {
        max-width: 100%;
        width: 100%;
    }
    .sidebar {
        margin-bottom: 2rem;
    }
    .container {
        max-width: 100%;
    }
</style>
{% endraw %}