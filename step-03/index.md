---
layout: home
category: steps
before: 'step-02/'
next: 'step-04/'
solution: 'step-03/solution/'
title: Iterating the list
---


In this step we are going to create our first Vue component, a custom `beer-list`. This component will use a JavaScript array as model and automatically generate a `beer-list-item` component for each beer in the array.


## Creating the component file

We begin by creating a new file for the component, `components/beer-list.js`.  Inside it we are going to declare a new Vue component, a JS object that is almost like an enclosed mini instance of Vue.

For the moment, on our `beer-list` component there is a `data` object with the component properties and a `template` object with the rendering of the component:

```html
{% raw %}
if (!window.VueBeers) {
    window.VueBeers = {};
}

window.VueBeers.beerList = {
    data: function() {
        return {    
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
    `,
};   
{% endraw %}
```

## Using the component in our main app

You begin by loading the component file:

```html
<script src="./components/beer-list.js"></script>
```

And then, there are two ways to use the component in our main app:

1. Define a new component before creating your Vue instance:

  ```javascript
    Vue.component('beer-list', VueBeers.beerList);
    var app = new Vue({
        el: '#app',
        data: {
            message: 'Vue Beers',
        },
    });
  ```

  And then you can use the `<beer-list>` tag in the HTML part of the app:

  ```html
    {% raw %}        
    <div class="container demo">
        <div id='app'>
            <h1>{{ message }}</h1>
            <beer-list></beer-list>
        </div>
    </div>
    {% endraw %}
  ```

Then you should obtain:

{% raw %}
<script>
if (!window.VueBeers) {
    window.VueBeers = {};
}

window.VueBeers.beerList01 = {
    data: function() {
        return {    
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
    `,
};   
</script>

<div class="container demo">
    <div id='app-01'>
        <h1>{{ message }}</h1>
        <beer-list></beer-list>
    </div>
</div>


<script>
Vue.component('beer-list', VueBeers.beerList01);
var app = new Vue({
    el: '#app-01',
    data: {
        message: 'Vue Beers',
    }
})
</script>
{% endraw %}

So now you're able to divide your application in atomic components. Let's add some fun with Vue directives.

## Using directives

Directives are special attributes with the `v-` prefix. Directive attribute values are expected to be a single JavaScript expression (with the exception for `v-for`, which will be discussed later). A directive’s job is to reactively apply side effects to the DOM when the value of its expression changes.

We are going to use the directive `v-for` to iterate the `beers` data property, and make our view easier to use. We can use the `v-for` directive to render a list of items based on an array. The `v-for` directive requires a special syntax in the form of `item in items`, where `items` is the source data array and `item` is an alias for the array element being iterated on.

In our case, we can rewrite the template of `beer-list`:

```html
{% raw %}
    template: `
    <ul>
        <li v-for="beer in beers">
            <span>{{ beer.name }}</span>
            <p>{{ beer.description }}.</p>
        </li>
    </ul>
    `
{% endraw %}    
```

And we still have the same rendering:

{% raw %}

<script>
if (!window.VueBeers) {
    window.VueBeers = {};
}

window.VueBeers.beerList02 = {
    data: function() {
        return {    
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
    <ul>
        <li v-for="beer in beers">
            <span>{{ beer.name }}</span>
            <p>{{ beer.description }}.</p>
        </li>
    </ul>
    `,
};   
</script>

<div class="container demo">
    <div id='app-02'>
        <h1>{{ message }}</h1>
        <beer-list></beer-list>
    </div>
</div>


<script>
Vue.component('beer-list', VueBeers.beerList02);
var app = new Vue({
    el: '#app-02',
    data: {
        message: 'Vue Beers',
    }
})
</script>
{% endraw %}  

But now, if your list changes, if you add or remove elements, the list rendering will change accordingly.


## Adding a `beer-list-item` component

In order to better structurate our app in a component-based architecture, we could create a `beer-list-item` component to make the rendering of each beer. 

As we did with `beer-list`, let's create the component: 

```html
if (!window.VueBeers) {
    window.VueBeers = {};
}

window.VueBeers.beerListItem = {
    data: function() {
        return {   
        };
    },
    template: `
    `,
};
```

Now we need to define the `props` of the component, its properties, what it will need to receive as information from the outside in order to work and render. In our current case, looking at our beers data model, we have two properties for each beer, `name` and `description`:

```html
window.VueBeers.beerListItem = {
    props: [ 'name', 'description' ],
}
```

> #### `data` vs `props`
>  `data` and `props` can seem very similar seem at first sigh, but they are different concepts. Together `data` and `props` define the *state* of the component, the `data` it's in internal state, the `props` are the properties defined by the parent object.

After the `props` we can define the template, i.e. how to render the component:

```html
{% raw %}
window.VueBeers.beerListItem = {
    template:  `
        <div class="beer">
            <span>{{ name }}</span>
            <p>{{ description }}.</p>
        </div>
    `,
}
{% endraw %}
```

So our component is ready, and we can use it from `beer-list`.
You begin by loading the component in the header of your application:

```html
<script src='./components/beer-list-item.js'></script>
```

Then you load the component before creating the Vue instance, as previously:

```html
    <script>
    Vue.component('beer-list', VueBeers.beerList);
    Vue.component('beer-list-item', VueBeers.beerListItem);
    var app = new Vue({
        el: '#app',
        data: {
            message: 'Vue Beers',
        }
    })
    </script>
```

And now, inside `beer-list` you can use the `beer-list-item`. 
In order to pass values to `beer-list-item` properties, we can:

- Directly putting a string or number value as an attribute for  `beer-list-item`: 

  ```html
    <beer-list-item 
        name='Chimay Rouge'
        description='This Trappist beer possesses a beautiful coppery colour...'>
    </beer-list-item>
  ```

- Binding its value to a property or data item from the parent component, using `v-bind:` (or simple `:`):

  ```html
    <li v-for="beer in beers">
        <beer-list-item 
            v-bind:name='beer.name'
            v-bind:description='beer.description'>
        </beer-list-item>
    </li>
  ```

We are going to use this last syntax in `beer-list`, and then we will have our beer list with a full component approach:

{% raw %}
<div class="container demo">
    <div id='app-03'>
        <h1>{{ message }}</h1>
        <beer-list></beer-list>
    </div>
</div>

<script>
if (!window.VueBeers) {
    window.VueBeers = {};
}

window.VueBeers.beerList03 = {
    data: function() {
        return {    
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
    <ul>
        <li v-for="beer in beers">
            <beer-list-item 
                v-bind:name='beer.name'
                v-bind:description='beer.description'>
            </beer-list-item>
        </li>
    </ul>
    `,
};   
window.VueBeers.beerListItem03 = {
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
Vue.component('beer-list', VueBeers.beerList02);
Vue.component('beer-list-item', VueBeers.beerListItem02);
var app = new Vue({
    el: '#app-03',
    data: {
        message: 'Vue Beers',
    }
});
</script>
{% endraw %}

In the [next step](../step-04/) we are going to learn to filter the beer list to add full text search to the app.
