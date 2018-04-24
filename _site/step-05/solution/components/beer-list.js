if (!window.VueBeers) {
    window.VueBeers = {};
}

window.VueBeers.beerList = {
    data: function() {
        return { 
            criteria: [
                { name: "name", label: "Alphabetical"},
                { name: "alcohol", label: "Alcohol content" }
            ],
            criterium: '',
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
    methods: {
        filteredAndSorted: function(beers, filterText, criterium)  {
            return this.filteredList(beers, filterText)
                .sort( (a,b) =>  {  
                    if ( a[this.criterium] === b[this.criterium] ) return 0;
                    if ( a[this.criterium] < b[this.criterium] ) return -1;
                    if ( a[this.criterium] > b[this.criterium] ) return 1;      
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
    mounted: function() {
        this.criterium = this.criteria[0].name;
    },
    template: `
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
            </div>
            </div>
            <div class="col-md-9">
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
            </div>
        </div>
    </div> 
    `,
};   

