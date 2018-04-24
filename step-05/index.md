---
layout: home
category: steps
before: 'step-04/'
next: 'step-06/'
solution: 'step-05/solution/'
title: Sorting the list
---


In this step, you will add a feature to let your users control the order of the items in the beer list. The dynamic ordering is implemented by creating a new methid, wiring it together with the `v-for` repeater, and letting the data binding magic do the rest of the work.

In addition to the search box, the app displays a drop down menu that allows users to control the order in which the beers are listed.

## Adding some more beers

To better see the filtering and sorting capabilities, let's add some more beers to our model:

```javascript
    data: function() {
        return { 
            filterText: '',   
            beers:[
                {
                    "alcohol": 6.8,
                    "name": "Affligem Blond",
                    "description": "Affligem Blonde, the classic clear blonde abbey ale, with a gentle roundness and 6.8% alcohol. Low on bitterness, it is eminently drinkable."
                },
                {
                    "alcohol": 8.5,
                    "name": "Affligem Tripel",
                    "description": "The king of the abbey beers. It is amber-gold and pours with a deep head and original aroma, delivering a complex, full bodied flavour. Pure enjoyment! Secondary fermentation in the bottle."
                },
                {
                    "alcohol": 9.2,
                    "name": "Rochefort 8",
                    "description": "A dry but rich flavoured beer with complex fruity and spicy flavours."
                },
                {
                    "alcohol": 11.3,
                    "name": "Rochefort 10",
                    "description": "The top product from the Rochefort Trappist brewery. Dark colour, full and very impressive taste. Strong plum, raisin, and black currant palate, with ascending notes of vinousness and other complexities."
                },
                {
                    "alcohol": 7,
                    "name": "Chimay Rouge",
                    "description": "This Trappist beer possesses a beautiful coppery colour that makes it particularly attractive. Topped with a creamy head, it gives off a slight fruity apricot smell from the fermentation. The aroma felt in the mouth is a balance confirming the fruit nuances revealed to the sense of smell. This traditional Belgian beer is best savoured at cellar temperature "
                }
            ],
        };
    },                
```  


## Sorting beers by alcohol content

Instead of the `filteredList` method, we are going to use a `filteredAndSorted` method that will do both the filtering and sorting of the list:

```javascript
 
    methods: {
        filteredAndSorted: function(beers, filterText)  {
            return this.filteredList(beers, filterText)
                .sort( (a,b) => {
                    if (a.alcohol === b.alcohol) return 0;
                    return b.alcohol - a.alcohol;
                });
        },
        filteredList: function (beers, filterText) {
            if (!filterText) {
                return [ ... beers];
            }
            return beers.filter( (beer) => {
                return beer.name.match(new RegExp(filterText, 'i'));
            })
        }
    },
```

Now we only need to modify the `v-for` directive to use the new method:

```html
<div class="beers">
    <div class="beer" v-for="beer in filteredAndSorted(beers,filterText)">
        <beer-list-item 
            v-bind:name='beer.name'
            v-bind:description='beer.description'>
        </beer-list-item>
    </div>
</div>
```

In order to verify it works, we also need to modify `beer-list-item` to display the alcohol content of the beers:

```html
{% raw %}
props: [ 'name', 'description', 'alcohol' ],
template: `
<div class="beer">
    <div class="alcohol">{{ alcohol }}°</div>
    <div class="name">{{ name }}</div>
    <div class="description">{{ description }}</div>
</div>
`,
{% endraw %}
```    

And set the `alcohol` property of each beer in `beer-list`:

```html
{% raw %}
<beer-list-item 
    v-bind:name='beer.name'
    v-bind:alcohol='beer.alcohol'
    v-bind:description='beer.description'>
</beer-list-item>
{% endraw %}
```    

So here we have the beer list sorted by alcohol order:

{% include step-05/step-05_01.html %}


## Selecting order criteria


First, we add a `<select>` html element and a `criteria` data property to `beer-list`, so that our users can pick from the two provided sorting options:

```html
{% raw %}
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
</div>
{% endraw %}
```

```html    
data: function() {
    return { 
        criteria: [
            { name: "name", label: "Alphabetical"},
            { name: "alcohol", label: "Alcohol content" }
        ],
        criterium: '',
        [...]
    };
},    
```

To set the default sorting to the first criterium, we need to use one of the [lifecycle hooks](https://vuejs.org/v2/guide/instance.html#Instance-Lifecycle-Hooks),
`mounted`, that is called when the component has been set in the DOM:

```html
mounted: function() {
    this.criterium = this.criteria[0].name;
}
```


Then we modify the sort function to sort according to the chosen property:

```javascript
filteredAndSorted: function(beers, filterText, criterium)  {
    return this.filteredList(beers, filterText)
        .sort( (a,b) =>  {  
            if ( a[this.criterium] === b[this.criterium] ) return 0;
            if ( a[this.criterium] < b[this.criterium] ) return -1;
            if ( a[this.criterium] > b[this.criterium] ) return 1;      
            });
},
```

And the calling in the template:

```html
<div class="beers">
    <div class="beer" 
            v-for="beer in filteredAndSorted(beers,filterText,criterium)">
        <beer-list-item 
            v-bind:name='beer.name'
            v-bind:alcohol='beer.alcohol'
            v-bind:description='beer.description'>
        </beer-list-item>
    </div>
</div>
```

And now we have the application with filtering and multi-criteria sorting:

{% include step-05/step-05_02.html %}


## Ascending or descending

By default our sorter sorts in ascending order. Let's add a checkbox to give us descending sort capabilities.

```html
{% raw %}
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
{% endraw %}
```                

And add `descendingSort` to the `data` object:

```
data: function() {
    return { 
        criteria: [
            { name: "name", label: "Alphabetical"},
            { name: "alcohol", label: "Alcohol content" }
        ],
        criterium: '',
        descendingSort: false,
        filterText: '',   
        [...]
    };
},
```

Now we can add `descendingSort` to the parameter list of the `filteredAndSorted` method:

```
filteredAndSorted: function(beers, filterText, criterium, descendingSort)  {
    let coef = descendingSort ? -1 : 1;
    return this.filteredList(beers, filterText)
        .sort( (a,b) =>  {  
            if ( a[this.criterium] === b[this.criterium] ) return 0;
            if ( a[this.criterium] < b[this.criterium] ) return -1 * coef;
            if ( a[this.criterium] > b[this.criterium] ) return 1 * coef;      
            });
},
```

```html
<div class="beer" 
        v-for="beer in filteredAndSorted(beers,filterText,criterium,descendingSort)">
    <beer-list-item 
        v-bind:name='beer.name'
        v-bind:alcohol='beer.alcohol'
        v-bind:description='beer.description'>
    </beer-list-item>
</div>
```       

And we have the sorting working as intended:


{% include step-05/step-05_03.html %}

Now that you have added list sorting, go to [step 6](../step-06/) to learn how to dynamically load our beer data from a server-side JSON file.             