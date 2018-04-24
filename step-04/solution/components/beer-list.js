if (!window.VueBeers) {
    window.VueBeers = {};
}

window.VueBeers.beerList = {
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

